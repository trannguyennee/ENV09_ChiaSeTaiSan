package com.env09.quanlytaisan.service;

import com.env09.quanlytaisan.dto.ApiResponse;
import com.env09.quanlytaisan.dto.BanGiaoRequest;
import com.env09.quanlytaisan.dto.ThuHoiRequest;
import com.env09.quanlytaisan.repository.StoredProcedureDAO;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GiaoNhanService {

    @Autowired
    private StoredProcedureDAO storedProcedureDAO;

    @Autowired
    private ObjectMapper objectMapper;

    public ApiResponse<String> lapBienBanBanGiao(BanGiaoRequest request) {
        try {
            String chiTietJSON = objectMapper.writeValueAsString(request.getDanhSachGiao());

            String maBBBG = storedProcedureDAO.goiLapBienBanBanGiao(
                    request.getMaPM(),
                    request.getMaNguoiGiao(),
                    request.getMaNguoiNhan(),
                    request.getPhuKienKemTheo(),
                    request.getTrangThaiGiao(),
                    chiTietJSON,
                    request.getLyDoHuy()
            );

            if ("Huy".equalsIgnoreCase(request.getTrangThaiGiao())) {
                boolean coMayLoi = request.getDanhSachGiao() != null && request.getDanhSachGiao().stream()
                        .anyMatch(i -> Boolean.TRUE.equals(i.getCoLoiNgoaiQuan()));
                return ApiResponse.thanhCong(coMayLoi
                        ? "Đã hủy bàn giao: phiếu mượn chuyển sang Đã hủy, máy lỗi được ghi sự cố và chuyển sang Cần bảo dưỡng (BR06)."
                        : "Đã hủy bàn giao: phiếu mượn chuyển sang Đã hủy (BR17).", maBBBG);
            }

            return ApiResponse.thanhCong("Xuất kho bàn giao thành công! Mã biên bản: " + maBBBG, maBBBG);
        } catch (Exception ex) {
            return ApiResponse.thatBai(ex.getMessage());
        }
    }

    public ApiResponse<String> lapBienBanThuHoi(ThuHoiRequest request) {
        try {
            if (request.getDanhSachThuHoi() == null || request.getDanhSachThuHoi().isEmpty()) {
                return ApiResponse.thatBai("Phải có danh sách đánh giá tài sản thu hồi!");
            }

            String chiTietJSON = objectMapper.writeValueAsString(request.getDanhSachThuHoi());

            String maBBTH = storedProcedureDAO.goiLapBienBanThuHoi(
                    request.getMaPM(),
                    request.getMaNguoiThuHoi(),
                    request.getMaNguoiTra(),
                    request.getDanhGiaChung(),
                    chiTietJSON
            );

            return ApiResponse.thanhCong("Hoàn tất thu hồi và đóng phiếu mượn thành công! Mã biên bản: " + maBBTH, maBBTH);
        } catch (Exception ex) {
            return ApiResponse.thatBai(ex.getMessage());
        }
    }
}
