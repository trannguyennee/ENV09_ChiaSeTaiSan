package com.env09.quanlytaisan.service;

import com.env09.quanlytaisan.dto.ApiResponse;
import com.env09.quanlytaisan.repository.StoredProcedureDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class HeThongService {

    @Autowired
    private StoredProcedureDAO storedProcedureDAO;

    public ApiResponse<Map<String, Object>> quetQuaHanVaTuDongHuy() {
        try {
            Map<String, Object> res = storedProcedureDAO.goiQuetQuaHanVaTuDongHuy();
            return ApiResponse.thanhCong("Quét quá hạn và tự động hủy hoàn tất (BR14)!", res);
        } catch (Exception ex) {
            return ApiResponse.thatBai("Lỗi quét quá hạn: " + ex.getMessage());
        }
    }

    // Tác vụ nền tự động kích hoạt lúc 00:05 hằng ngày theo quy tắc BR14 và đặc tả Word
    @Scheduled(cron = "0 5 0 * * ?")
    public void tuDongQuetQuaHanMoiDem() {
        System.out.println("[TÁC VỤ HỆ THỐNG 00:05] Bắt đầu tự động quét quá hạn và hủy phiếu mượn vi phạm theo BR14...");
        try {
            Map<String, Object> ketQua = storedProcedureDAO.goiQuetQuaHanVaTuDongHuy();
            System.out.println("[TÁC VỤ HỆ THỐNG 00:05] Hoàn tất: " + ketQua);
        } catch (Exception ex) {
            System.err.println("[TÁC VỤ HỆ THỐNG 00:05] Lỗi thực thi tác vụ nền: " + ex.getMessage());
        }
    }
}
