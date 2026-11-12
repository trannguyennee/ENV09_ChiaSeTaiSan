package com.env09.quanlytaisan.service;

import com.env09.quanlytaisan.dto.ApiResponse;
import com.env09.quanlytaisan.dto.DeXuatThanhLyRequest;
import com.env09.quanlytaisan.dto.PheDuyetThanhLyRequest;
import com.env09.quanlytaisan.entity.HoSoThanhLy;
import com.env09.quanlytaisan.repository.HoSoThanhLyRepository;
import com.env09.quanlytaisan.repository.StoredProcedureDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ThanhLyService {

    @Autowired
    private HoSoThanhLyRepository hoSoThanhLyRepository;

    @Autowired
    private StoredProcedureDAO storedProcedureDAO;

    public ApiResponse<String> deXuatThanhLy(DeXuatThanhLyRequest req) {
        try {
            String maHSTL = storedProcedureDAO.goiDeXuatThanhLy(
                    req.getMaTS(),
                    req.getMaNguoiDeXuat(),
                    req.getLyDoDeXuat()
            );
            return ApiResponse.thanhCong("Lập hồ sơ đề xuất thanh lý thành công (BR15)! Mã hồ sơ: " + maHSTL, maHSTL);
        } catch (Exception ex) {
            return ApiResponse.thatBai(ex.getMessage());
        }
    }

    public ApiResponse<String> pheDuyetThanhLy(PheDuyetThanhLyRequest req) {
        try {
            storedProcedureDAO.goiPheDuyetThanhLy(
                    req.getMaHSTL(),
                    req.getMaNguoiDuyet(),
                    req.getHanhDong(),
                    req.getSoQuyetDinh(),
                    req.getGhiChuDuyet()
            );

            String msg = "Duyet".equalsIgnoreCase(req.getHanhDong())
                    ? "Đã phê duyệt thanh lý! Thiết bị chuyển sang trạng thái Đã thanh lý (Hình 10)."
                    : "Đã bác bỏ thanh lý! Thiết bị đã được phân luồng về Cần bảo dưỡng hoặc Sẵn sàng chia sẻ căn cứ hiện trạng.";

            return ApiResponse.thanhCong(msg, req.getMaHSTL());
        } catch (Exception ex) {
            return ApiResponse.thatBai(ex.getMessage());
        }
    }

    public List<HoSoThanhLy> getAllHoSoThanhLy() {
        return hoSoThanhLyRepository.findAll();
    }
}
