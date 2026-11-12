package com.env09.quanlytaisan.service;

import com.env09.quanlytaisan.dto.ApiResponse;
import com.env09.quanlytaisan.dto.KhaiBaoTaiSanRequest;
import com.env09.quanlytaisan.dto.KiemNhanTaiSanRequest;
import com.env09.quanlytaisan.entity.TaiSan;
import com.env09.quanlytaisan.repository.StoredProcedureDAO;
import com.env09.quanlytaisan.repository.TaiSanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaiSanService {

    @Autowired
    private TaiSanRepository taiSanRepository;

    @Autowired
    private StoredProcedureDAO storedProcedureDAO;

    public List<TaiSan> getDanhSachSanSangChiaSe() {
        return taiSanRepository.findDanhSachSanSangChiaSe();
    }

    public List<TaiSan> getAllTaiSan() {
        return taiSanRepository.findAll();
    }

    public ApiResponse<String> khaiBaoTaiSan(KhaiBaoTaiSanRequest req) {
        try {
            String maTSMoi = storedProcedureDAO.goiKhaiBaoTaiSan(
                    req.getTenTS(),
                    req.getSoSeri(),
                    req.getMaLoaiTS(),
                    req.getMaPBSoHuu(),
                    req.getNamMua(),
                    req.getNguyenGia(),
                    req.getHienTrang(),
                    req.getViTriLuuTru(),
                    req.getHinhAnh(),
                    req.getMoTa(),
                    req.getDoChinhXac(),
                    req.getChuKyKiemDinh(),
                    req.getCauHinhCPU(),
                    req.getDungLuongRAM(),
                    req.getCongSuat(),
                    req.getPhuKienDiKem(),
                    req.getMaNDThucHien()
            );
            return ApiResponse.thanhCong("Khai báo tài sản thành công! Mã tài sản mới: " + maTSMoi + " (trạng thái Mới, chờ Thủ kho kiểm nhận)", maTSMoi);
        } catch (Exception ex) {
            return ApiResponse.thatBai(ex.getMessage());
        }
    }

    // UC12 - BR21: Thủ kho kiểm nhận tài sản Mới vào kho dùng chung
    public ApiResponse<String> kiemNhanTaiSan(KiemNhanTaiSanRequest req, String maNguoiKiemNhan) {
        try {
            String trangThaiMoi = storedProcedureDAO.goiKiemNhanTaiSan(
                    req.getMaTS(), maNguoiKiemNhan, req.getNguyenGia(), req.getHienTrang(), req.getGhiChu());
            String msg = "SanSangChiaSe".equals(trangThaiMoi)
                    ? "Kiểm nhận thành công! Tài sản đã đưa vào kho dùng chung (Sẵn sàng chia sẻ)."
                    : "Đã kiểm nhận: hiện trạng dưới ngưỡng tối thiểu, tài sản chuyển sang Cần bảo dưỡng.";
            return ApiResponse.thanhCong(msg, trangThaiMoi);
        } catch (Exception ex) {
            return ApiResponse.thatBai(ex.getMessage());
        }
    }

    public ApiResponse<String> deXuatThanhLy(String maTS, String maNguoiDeXuat, String lyDoDeXuat) {
        try {
            String maHSTL = storedProcedureDAO.goiDeXuatThanhLy(maTS, maNguoiDeXuat, lyDoDeXuat);
            return ApiResponse.thanhCong("Lập hồ sơ đề xuất thanh lý thành công! Mã hồ sơ: " + maHSTL, maHSTL);
        } catch (Exception ex) {
            return ApiResponse.thatBai(ex.getMessage());
        }
    }
}
