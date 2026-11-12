package com.env09.quanlytaisan.service;

import com.env09.quanlytaisan.config.PhienDangNhapService;
import com.env09.quanlytaisan.entity.*;
import com.env09.quanlytaisan.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Service
public class DanhMucService {

    @Autowired
    private PhongBanRepository phongBanRepository;

    @Autowired
    private LoaiTaiSanRepository loaiTaiSanRepository;

    @Autowired
    private NguoiDungRepository nguoiDungRepository;

    @Autowired
    private ThamSoCAIRepository thamSoCAIRepository;

    @Autowired
    private LichSuTrangThaiTaiSanRepository lichSuTrangThaiTaiSanRepository;

    @Autowired
    private PhienDangNhapService phienDangNhapService;

    private static final Set<String> VAI_TRO = Set.of("NhanVien", "ThuKho", "QuanTri", "LanhDao");
    private static final Set<String> NHOM_TAI_SAN = Set.of("DoDac", "CNTT", "ThietBiChung");
    private static final String MAT_KHAU_MAC_DINH = "123456";

    public List<PhongBan> getAllPhongBan() {
        return phongBanRepository.findAll();
    }

    // UC02 luồng 4.1: mã phòng ban đã tồn tại thì báo lỗi, không ghi đè bản ghi cũ
    public PhongBan themPhongBan(PhongBan phongBan) {
        if (laRong(phongBan.getMaPB()) || laRong(phongBan.getTenPB())) {
            throw new IllegalArgumentException("Mã phòng ban và Tên phòng ban không được để trống.");
        }
        if (phongBanRepository.existsById(phongBan.getMaPB())) {
            throw new IllegalArgumentException("Mã phòng ban đã tồn tại, vui lòng nhập mã khác.");
        }
        if (phongBanRepository.findByTenPB(phongBan.getTenPB()).isPresent()) {
            throw new IllegalArgumentException("Tên phòng ban đã tồn tại.");
        }
        return phongBanRepository.save(phongBan);
    }

    public List<LoaiTaiSan> getAllLoaiTaiSan() {
        return loaiTaiSanRepository.findAll();
    }

    // UC03 luồng 4.1: chặn trùng mã loại; NhomTaiSan và NienHanNam theo ràng buộc CHECK của CSDL
    public LoaiTaiSan themLoaiTaiSan(LoaiTaiSan loaiTaiSan) {
        if (laRong(loaiTaiSan.getMaLoaiTS()) || laRong(loaiTaiSan.getTenLoaiTS())) {
            throw new IllegalArgumentException("Mã loại và Tên loại tài sản không được để trống.");
        }
        if (loaiTaiSanRepository.existsById(loaiTaiSan.getMaLoaiTS())) {
            throw new IllegalArgumentException("Mã loại tài sản đã tồn tại, vui lòng nhập mã khác.");
        }
        if (!NHOM_TAI_SAN.contains(loaiTaiSan.getNhomTaiSan())) {
            throw new IllegalArgumentException("Nhóm tài sản chỉ nhận DoDac, CNTT hoặc ThietBiChung.");
        }
        if (loaiTaiSan.getNienHanNam() == null || loaiTaiSan.getNienHanNam() <= 0) {
            throw new IllegalArgumentException("Niên hạn sử dụng (năm) phải lớn hơn 0.");
        }
        return loaiTaiSanRepository.save(loaiTaiSan);
    }

    public List<NguoiDung> getAllNguoiDung() {
        return nguoiDungRepository.findAll();
    }

    // UC04: cấp tài khoản mới - chặn trùng mã / tên đăng nhập / email, luôn băm SHA-256 mật khẩu ở máy chủ
    public NguoiDung themNguoiDung(NguoiDung nguoiDung) {
        if (laRong(nguoiDung.getMaND()) || laRong(nguoiDung.getTenDangNhap()) || laRong(nguoiDung.getHoTen()) || laRong(nguoiDung.getMaPB())) {
            throw new IllegalArgumentException("Vui lòng nhập đủ Mã cán bộ, Tên đăng nhập, Họ tên và Phòng ban.");
        }
        if (nguoiDungRepository.existsById(nguoiDung.getMaND())) {
            throw new IllegalArgumentException("Mã cán bộ đã tồn tại, vui lòng nhập mã khác.");
        }
        if (nguoiDungRepository.findByTenDangNhap(nguoiDung.getTenDangNhap()).isPresent()) {
            throw new IllegalArgumentException("Tên đăng nhập đã được sử dụng, vui lòng chọn tên khác.");
        }
        if (laRong(nguoiDung.getEmail()) || !nguoiDung.getEmail().matches("^[\\w.+-]+@[\\w-]+(\\.[\\w-]+)+$")) {
            throw new IllegalArgumentException("Email không đúng định dạng.");
        }
        if (nguoiDungRepository.findByEmail(nguoiDung.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email đã được sử dụng cho tài khoản khác.");
        }
        if (!phongBanRepository.existsById(nguoiDung.getMaPB())) {
            throw new IllegalArgumentException("Phòng ban không tồn tại.");
        }
        if (!VAI_TRO.contains(nguoiDung.getVaiTro())) {
            throw new IllegalArgumentException("Vai trò chỉ nhận NhanVien, ThuKho, QuanTri hoặc LanhDao.");
        }
        String matKhauGoc = laRong(nguoiDung.getMatKhau()) ? MAT_KHAU_MAC_DINH : nguoiDung.getMatKhau();
        nguoiDung.setMatKhau(AuthService.bamSHA256(matKhauGoc));
        nguoiDung.setTrangThaiTK("HoatDong");
        return nguoiDungRepository.save(nguoiDung);
    }

    public NguoiDung toggleTrangThaiNguoiDung(String maND) {
        NguoiDung nd = nguoiDungRepository.findById(maND).orElse(null);
        if (nd != null) {
            String newStatus = "HoatDong".equalsIgnoreCase(nd.getTrangThaiTK()) ? "Khoa" : "HoatDong";
            nd.setTrangThaiTK(newStatus);
            if ("Khoa".equals(newStatus)) {
                // Tài khoản bị khóa phải bị đăng xuất ngay
                phienDangNhapService.huyPhienCuaNguoiDung(maND);
            }
            return nguoiDungRepository.save(nd);
        }
        return null;
    }

    private static boolean laRong(String s) {
        return s == null || s.isBlank();
    }

    public List<ThamSoCAI> getAllThamSoCAI() {
        return thamSoCAIRepository.findAll();
    }

    public ThamSoCAI capNhatThamSoCAI(String maThamSo, BigDecimal giaTriMoi) {
        ThamSoCAI ts = thamSoCAIRepository.findById(maThamSo).orElse(null);
        if (ts != null) {
            kiemTraGiaTriThamSo(maThamSo, giaTriMoi);
            ts.setGiaTri(giaTriMoi);
            ts.setNgayCapNhat(LocalDateTime.now());
            return thamSoCAIRepository.save(ts);
        }
        return null;
    }

    // Miền giá trị hợp lệ của 7 tham số mềm (BR-EXTRA-02); TS03 không vượt ràng buộc CHECK 30 ngày của bảng PhieuMuon
    private void kiemTraGiaTriThamSo(String maThamSo, BigDecimal giaTri) {
        if (giaTri == null) {
            throw new IllegalArgumentException("Giá trị tham số không được để trống.");
        }
        double v = giaTri.doubleValue();
        boolean hopLe = switch (maThamSo) {
            case "TS01" -> v > 0 && v <= 1;                       // tỷ lệ thuê/ngày
            case "TS02" -> v >= 1 && v <= 30 && v == Math.floor(v); // ngưỡng ngày ngắn hạn
            case "TS03" -> v >= 1 && v <= 30 && v == Math.floor(v); // hạn mức ngày mượn
            case "TS04" -> v >= 0 && v <= 100 && v == Math.floor(v); // % hiện trạng tối thiểu
            case "TS05" -> v > 0 && v <= 1;                       // tỷ lệ chi phí sửa / nguyên giá
            case "TS06" -> v >= 1 && v == Math.floor(v);          // hạn ngạch số phiếu
            case "TS07" -> v >= 0 && v <= 30 && v == Math.floor(v); // số ngày chờ nhận máy
            default -> true;
        };
        if (!hopLe) {
            throw new IllegalArgumentException("Giá trị " + giaTri.toPlainString() + " không hợp lệ cho tham số " + maThamSo
                    + " (TS01, TS05: 0 - 1; TS02, TS03: 1 - 30 ngày; TS04: 0 - 100%; TS06: số nguyên >= 1; TS07: 0 - 30 ngày).");
        }
        // Ngưỡng ngắn hạn (TS02) không được vượt hạn mức mượn tối đa (TS03)
        if ("TS02".equals(maThamSo) && v > giaTriThamSo("TS03", 30)) {
            throw new IllegalArgumentException("TS02 (ngưỡng ngày ngắn hạn) không được lớn hơn TS03 (hạn mức ngày mượn tối đa).");
        }
        if ("TS03".equals(maThamSo) && v < giaTriThamSo("TS02", 7)) {
            throw new IllegalArgumentException("TS03 (hạn mức ngày mượn tối đa) không được nhỏ hơn TS02 (ngưỡng ngày ngắn hạn).");
        }
    }

    private double giaTriThamSo(String maThamSo, double macDinh) {
        return thamSoCAIRepository.findById(maThamSo).map(t -> t.getGiaTri().doubleValue()).orElse(macDinh);
    }

    public List<LichSuTrangThaiTaiSan> getLichSuByMaTS(String maTS) {
        return lichSuTrangThaiTaiSanRepository.findByMaTSOrderByNgayThayDoiDesc(maTS);
    }
}
