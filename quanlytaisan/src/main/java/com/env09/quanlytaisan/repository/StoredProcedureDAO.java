package com.env09.quanlytaisan.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.SqlOutParameter;
import org.springframework.jdbc.core.SqlParameter;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.sql.Types;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Repository
public class StoredProcedureDAO {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    // SP 1: sp_KhaiBaoTaiSan_BR01
    public String goiKhaiBaoTaiSan(
            String tenTS, String soSeri, String maLoaiTS, String maPBSoHuu,
            int namMua, BigDecimal nguyenGia, int hienTrang, String viTriLuuTru,
            String hinhAnh, String moTa, String doChinhXac, Integer chuKyKiemDinh,
            String cauHinhCPU, String dungLuongRAM, String congSuat, String phuKienDiKem,
            String maNDThucHien
    ) {
        SimpleJdbcCall call = new SimpleJdbcCall(jdbcTemplate)
                .withProcedureName("sp_KhaiBaoTaiSan_BR01")
                .declareParameters(
                        new SqlParameter("TenTS", Types.NVARCHAR),
                        new SqlParameter("SoSeri", Types.VARCHAR),
                        new SqlParameter("MaLoaiTS", Types.VARCHAR),
                        new SqlParameter("MaPBSoHuu", Types.VARCHAR),
                        new SqlParameter("NamMua", Types.INTEGER),
                        new SqlParameter("NguyenGia", Types.DECIMAL),
                        new SqlParameter("HienTrang", Types.INTEGER),
                        new SqlParameter("ViTriLuuTru", Types.NVARCHAR),
                        new SqlParameter("HinhAnh", Types.VARCHAR),
                        new SqlParameter("MoTa", Types.NVARCHAR),
                        new SqlParameter("DoChinhXac", Types.NVARCHAR),
                        new SqlParameter("ChuKyKiemDinh", Types.INTEGER),
                        new SqlParameter("CauHinhCPU", Types.NVARCHAR),
                        new SqlParameter("DungLuongRAM", Types.NVARCHAR),
                        new SqlParameter("CongSuat", Types.NVARCHAR),
                        new SqlParameter("PhuKienDiKem", Types.NVARCHAR),
                        new SqlParameter("MaNDThucHien", Types.VARCHAR),
                        new SqlOutParameter("MaTS_Output", Types.VARCHAR)
                );

        MapSqlParameterSource in = new MapSqlParameterSource()
                .addValue("TenTS", tenTS)
                .addValue("SoSeri", soSeri)
                .addValue("MaLoaiTS", maLoaiTS)
                .addValue("MaPBSoHuu", maPBSoHuu)
                .addValue("NamMua", namMua)
                .addValue("NguyenGia", nguyenGia)
                .addValue("HienTrang", hienTrang)
                .addValue("ViTriLuuTru", viTriLuuTru)
                .addValue("HinhAnh", hinhAnh)
                .addValue("MoTa", moTa)
                .addValue("DoChinhXac", doChinhXac)
                .addValue("ChuKyKiemDinh", chuKyKiemDinh)
                .addValue("CauHinhCPU", cauHinhCPU)
                .addValue("DungLuongRAM", dungLuongRAM)
                .addValue("CongSuat", congSuat)
                .addValue("PhuKienDiKem", phuKienDiKem)
                .addValue("MaNDThucHien", maNDThucHien);

        Map<String, Object> out = call.execute(in);
        return (String) out.get("MaTS_Output");
    }

    // SP 2: sp_LapYeuCauMuon_BR02_BR13
    public String goiKiemNhanTaiSan(String maTS, String maNguoiKiemNhan, BigDecimal nguyenGia, Integer hienTrang, String ghiChu) {
        SimpleJdbcCall call = new SimpleJdbcCall(jdbcTemplate)
                .withProcedureName("sp_KiemNhanTaiSan_BR21");
        MapSqlParameterSource in = new MapSqlParameterSource()
                .addValue("MaTS", maTS)
                .addValue("MaNguoiKiemNhan", maNguoiKiemNhan)
                .addValue("NguyenGia", nguyenGia)
                .addValue("HienTrang", hienTrang)
                .addValue("GhiChu", ghiChu);
        Map<String, Object> out = call.execute(in);
        Object rs = out.get("#result-set-1");
        if (rs instanceof List<?> list && !list.isEmpty() && list.get(0) instanceof Map<?, ?> row) {
            return String.valueOf(row.get("TrangThaiMoi"));
        }
        return null;
    }

    public String goiLapYeuCauMuon(
            String maNDMuon, String maPBMuon, LocalDate ngayMuon,
            LocalDate ngayHenTra, String mucDichSuDung, String danhSachTS_JSON
    ) {
        SimpleJdbcCall call = new SimpleJdbcCall(jdbcTemplate)
                .withProcedureName("sp_LapYeuCauMuon_BR02_BR13")
                .declareParameters(
                        new SqlParameter("MaNDMuon", Types.VARCHAR),
                        new SqlParameter("NgayMuon", Types.DATE),
                        new SqlParameter("NgayHenTra", Types.DATE),
                        new SqlParameter("MucDichSuDung", Types.NVARCHAR),
                        new SqlParameter("DanhSachTS_JSON", Types.NVARCHAR),
                        new SqlOutParameter("MaPM_Output", Types.VARCHAR)
                );

        MapSqlParameterSource in = new MapSqlParameterSource()
                .addValue("MaNDMuon", maNDMuon)
                .addValue("NgayMuon", ngayMuon)
                .addValue("NgayHenTra", ngayHenTra)
                .addValue("MucDichSuDung", mucDichSuDung)
                .addValue("DanhSachTS_JSON", danhSachTS_JSON);

        Map<String, Object> out = call.execute(in);
        return (String) out.get("MaPM_Output");
    }

    // SP 3: sp_DuyetPhieuMuon_KhoaLich_BR04
    public void goiDuyetPhieuMuon(String maPM, String maNguoiDuyet, String hanhDong, String lyDoTuChoi) {
        SimpleJdbcCall call = new SimpleJdbcCall(jdbcTemplate)
                .withProcedureName("sp_DuyetPhieuMuon_KhoaLich_BR04");

        MapSqlParameterSource in = new MapSqlParameterSource()
                .addValue("MaPM", maPM)
                .addValue("MaNguoiDuyet", maNguoiDuyet)
                .addValue("HanhDong", hanhDong) // 'Duyet' hoặc 'TuChoi'
                .addValue("LyDoTuChoi", lyDoTuChoi);

        call.execute(in);
    }

    // SP 4: sp_HuyPhieuMuon_ChoDuyet_BR17
    public void goiHuyPhieuMuonChoDuyet(String maPM, String maNDYeuCau, String lyDoHuy) {
        SimpleJdbcCall call = new SimpleJdbcCall(jdbcTemplate)
                .withProcedureName("sp_HuyPhieuMuon_ChoDuyet_BR17");

        MapSqlParameterSource in = new MapSqlParameterSource()
                .addValue("MaPM", maPM)
                .addValue("MaNDYeuCau", maNDYeuCau)
                .addValue("LyDoHuy", lyDoHuy);

        call.execute(in);
    }

    // SP 5: sp_LapBienBanBanGiao_BR06_BR07 (Có truyền thêm lý do hủy nếu hủy bàn giao)
    public String goiLapBienBanBanGiao(
            String maPM, String maNguoiGiao, String maNguoiNhan,
            String phuKienKemTheo, String trangThaiGiao, String chiTietGiao_JSON, String lyDoHuy
    ) {
        SimpleJdbcCall call = new SimpleJdbcCall(jdbcTemplate)
                .withProcedureName("sp_LapBienBanBanGiao_BR06_BR07")
                .declareParameters(
                        new SqlParameter("MaPM", Types.VARCHAR),
                        new SqlParameter("MaNguoiGiao", Types.VARCHAR),
                        new SqlParameter("MaNguoiNhan", Types.VARCHAR),
                        new SqlParameter("PhuKienKemTheo", Types.NVARCHAR),
                        new SqlParameter("TrangThaiGiao", Types.NVARCHAR),
                        new SqlParameter("ChiTietGiao_JSON", Types.NVARCHAR),
                        new SqlParameter("LyDoHuy", Types.NVARCHAR),
                        new SqlOutParameter("MaBBBG_Output", Types.VARCHAR)
                );

        MapSqlParameterSource in = new MapSqlParameterSource()
                .addValue("MaPM", maPM)
                .addValue("MaNguoiGiao", maNguoiGiao)
                .addValue("MaNguoiNhan", maNguoiNhan)
                .addValue("PhuKienKemTheo", phuKienKemTheo)
                .addValue("TrangThaiGiao", trangThaiGiao)
                .addValue("ChiTietGiao_JSON", chiTietGiao_JSON)
                .addValue("LyDoHuy", lyDoHuy);

        Map<String, Object> out = call.execute(in);
        return (String) out.get("MaBBBG_Output");
    }

    public String goiLapBienBanBanGiao(
            String maPM, String maNguoiGiao, String maNguoiNhan,
            String phuKienKemTheo, String trangThaiGiao, String chiTietGiao_JSON
    ) {
        return goiLapBienBanBanGiao(maPM, maNguoiGiao, maNguoiNhan, phuKienKemTheo, trangThaiGiao, chiTietGiao_JSON, null);
    }

    // SP 6: sp_LapBienBanThuHoi_BR08_BR09
    public String goiLapBienBanThuHoi(
            String maPM, String maNguoiThuHoi, String maNguoiTra,
            String ghiChu, String chiTietThuHoi_JSON
    ) {
        SimpleJdbcCall call = new SimpleJdbcCall(jdbcTemplate)
                .withProcedureName("sp_LapBienBanThuHoi_BR08_BR09")
                .declareParameters(
                        new SqlParameter("MaPM", Types.VARCHAR),
                        new SqlParameter("MaNguoiThuHoi", Types.VARCHAR),
                        new SqlParameter("MaNguoiTra", Types.VARCHAR),
                        new SqlParameter("GhiChu", Types.NVARCHAR),
                        new SqlParameter("ChiTietThuHoi_JSON", Types.NVARCHAR),
                        new SqlOutParameter("MaBBTH_Output", Types.VARCHAR)
                );

        MapSqlParameterSource in = new MapSqlParameterSource()
                .addValue("MaPM", maPM)
                .addValue("MaNguoiThuHoi", maNguoiThuHoi)
                .addValue("MaNguoiTra", maNguoiTra)
                .addValue("GhiChu", ghiChu)
                .addValue("ChiTietThuHoi_JSON", chiTietThuHoi_JSON);

        Map<String, Object> out = call.execute(in);
        return (String) out.get("MaBBTH_Output");
    }

    // SP 7: sp_LapPhieuBaoDuong
    public String goiLapPhieuBaoDuong(
            String maTS, String maNguoiLap, String donViSuaChua,
            String noiDungSuaChua, String chiTietHangMuc_JSON
    ) {
        SimpleJdbcCall call = new SimpleJdbcCall(jdbcTemplate)
                .withProcedureName("sp_LapPhieuBaoDuong")
                .declareParameters(
                        new SqlParameter("MaTS", Types.VARCHAR),
                        new SqlParameter("MaNguoiLap", Types.VARCHAR),
                        new SqlParameter("DonViSuaChua", Types.NVARCHAR),
                        new SqlParameter("NoiDungSuaChua", Types.NVARCHAR),
                        new SqlParameter("ChiTietHangMuc_JSON", Types.NVARCHAR),
                        new SqlOutParameter("MaPBD_Output", Types.VARCHAR)
                );

        MapSqlParameterSource in = new MapSqlParameterSource()
                .addValue("MaTS", maTS)
                .addValue("MaNguoiLap", maNguoiLap)
                .addValue("DonViSuaChua", donViSuaChua)
                .addValue("NoiDungSuaChua", noiDungSuaChua)
                .addValue("ChiTietHangMuc_JSON", chiTietHangMuc_JSON);

        Map<String, Object> out = call.execute(in);
        return (String) out.get("MaPBD_Output");
    }

    // SP 8: sp_NghiemThuBaoDuong_BR11_BR12
    public void goiNghiemThuBaoDuong(
            String maPBD, String maNguoiNghiemThu, String ketLuan,
            Integer hienTrangSauSuaChua, String donViSuaChuaCapNhat, String noiDungSuaChuaCapNhat
    ) {
        SimpleJdbcCall call = new SimpleJdbcCall(jdbcTemplate)
                .withProcedureName("sp_NghiemThuBaoDuong_BR11_BR12");

        MapSqlParameterSource in = new MapSqlParameterSource()
                .addValue("MaPBD", maPBD)
                .addValue("MaNguoiNghiemThu", maNguoiNghiemThu)
                .addValue("KetLuan", ketLuan) // 'Dat' hoặc 'KhongTheSua'
                .addValue("HienTrangSauSuaChua", hienTrangSauSuaChua)
                .addValue("DonViSuaChuaCapNhat", donViSuaChuaCapNhat)
                .addValue("NoiDungSuaChuaCapNhat", noiDungSuaChuaCapNhat);

        call.execute(in);
    }

    // SP 9: sp_DeXuatThanhLy_BR15
    public String goiDeXuatThanhLy(String maTS, String maNguoiDeXuat, String lyDoDeXuat) {
        SimpleJdbcCall call = new SimpleJdbcCall(jdbcTemplate)
                .withProcedureName("sp_DeXuatThanhLy_BR15")
                .declareParameters(
                        new SqlParameter("MaTS", Types.VARCHAR),
                        new SqlParameter("MaNguoiDeXuat", Types.VARCHAR),
                        new SqlParameter("LyDoDeXuat", Types.NVARCHAR),
                        new SqlOutParameter("MaHSTL_Output", Types.VARCHAR)
                );

        MapSqlParameterSource in = new MapSqlParameterSource()
                .addValue("MaTS", maTS)
                .addValue("MaNguoiDeXuat", maNguoiDeXuat)
                .addValue("LyDoDeXuat", lyDoDeXuat);

        Map<String, Object> out = call.execute(in);
        return (String) out.get("MaHSTL_Output");
    }

    // SP 10: sp_PheDuyetThanhLy
    public void goiPheDuyetThanhLy(
            String maHSTL, String maNguoiDuyet, String hanhDong,
            String soQuyetDinh, String ghiChuDuyet
    ) {
        SimpleJdbcCall call = new SimpleJdbcCall(jdbcTemplate)
                .withProcedureName("sp_PheDuyetThanhLy");

        MapSqlParameterSource in = new MapSqlParameterSource()
                .addValue("MaHSTL", maHSTL)
                .addValue("MaNguoiDuyet", maNguoiDuyet)
                .addValue("HanhDong", hanhDong) // 'Duyet' hoặc 'BacBo'
                .addValue("SoQuyetDinh", soQuyetDinh)
                .addValue("GhiChuDuyet", ghiChuDuyet);

        call.execute(in);
    }

    // SP 11: sp_QuetQuaHan_Va_TuDongHuy_BR14
    public Map<String, Object> goiQuetQuaHanVaTuDongHuy() {
        SimpleJdbcCall call = new SimpleJdbcCall(jdbcTemplate)
                .withProcedureName("sp_QuetQuaHan_Va_TuDongHuy_BR14")
                .declareParameters(
                        new SqlOutParameter("SoLuongPhieuQuaHan", Types.INTEGER),
                        new SqlOutParameter("SoLuongPhieuTuDongHuy", Types.INTEGER)
                );

        return call.execute();
    }

    // SP 12: sp_BaoCaoCAI_TheoKy (BR20) - Trả trọn vẹn cả 2 bảng: Chi tiết lượt mượn & Tổng hợp kỳ (NCAV, ROI)
    public com.env09.quanlytaisan.dto.BaoCaoCAITheoKyResponse goiBaoCaoCAITheoKy(LocalDate tuNgay, LocalDate denNgay) {
        SimpleJdbcCall call = new SimpleJdbcCall(jdbcTemplate)
                .withProcedureName("sp_BaoCaoCAI_TheoKy");

        MapSqlParameterSource in = new MapSqlParameterSource()
                .addValue("TuNgay", tuNgay)
                .addValue("DenNgay", denNgay);

        Map<String, Object> result = call.execute(in);
        List<Map<String, Object>> chiTiet = new java.util.ArrayList<>();
        Map<String, Object> tongHop = new java.util.LinkedHashMap<>();

        if (result.containsKey("#result-set-1") && result.get("#result-set-1") instanceof List) {
            chiTiet = (List<Map<String, Object>>) result.get("#result-set-1");
        }
        if (result.containsKey("#result-set-2") && result.get("#result-set-2") instanceof List) {
            List<Map<String, Object>> list2 = (List<Map<String, Object>>) result.get("#result-set-2");
            if (!list2.isEmpty()) {
                tongHop = list2.get(0);
            }
        }

        return com.env09.quanlytaisan.dto.BaoCaoCAITheoKyResponse.builder()
                .danhSachChiTiet(chiTiet)
                .tongHopKy(tongHop)
                .build();
    }

    // SP 13: sp_DangNhap_XacThuc
    public Map<String, Object> goiDangNhap(String tenDangNhap, String matKhauSHA256) {
        SimpleJdbcCall call = new SimpleJdbcCall(jdbcTemplate)
                .withProcedureName("sp_DangNhap_XacThuc");

        MapSqlParameterSource in = new MapSqlParameterSource()
                .addValue("TenDangNhap", tenDangNhap)
                .addValue("MatKhauSHA256", matKhauSHA256);

        return call.execute(in);
    }
}
