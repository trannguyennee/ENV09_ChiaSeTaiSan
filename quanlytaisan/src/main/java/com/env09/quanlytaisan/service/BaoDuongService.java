package com.env09.quanlytaisan.service;

import com.env09.quanlytaisan.dto.ApiResponse;
import com.env09.quanlytaisan.dto.LapPhieuBaoDuongRequest;
import com.env09.quanlytaisan.dto.NghiemThuBaoDuongRequest;
import com.env09.quanlytaisan.entity.ChiTietBaoDuong;
import com.env09.quanlytaisan.entity.PhieuBaoDuong;
import com.env09.quanlytaisan.repository.ChiTietBaoDuongRepository;
import com.env09.quanlytaisan.repository.PhieuBaoDuongRepository;
import com.env09.quanlytaisan.repository.StoredProcedureDAO;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BaoDuongService {

    @Autowired
    private PhieuBaoDuongRepository phieuBaoDuongRepository;

    @Autowired
    private ChiTietBaoDuongRepository chiTietBaoDuongRepository;

    @Autowired
    private StoredProcedureDAO storedProcedureDAO;

    @Autowired
    private ObjectMapper objectMapper;

    public ApiResponse<String> lapPhieuBaoDuong(LapPhieuBaoDuongRequest req) {
        try {
            if (req.getDanhSachHangMuc() == null || req.getDanhSachHangMuc().isEmpty()) {
                return ApiResponse.thatBai("Phiếu bảo dưỡng phải có ít nhất một hạng mục sửa chữa!");
            }

            String chiTietJSON = objectMapper.writeValueAsString(req.getDanhSachHangMuc());

            String maPBD = storedProcedureDAO.goiLapPhieuBaoDuong(
                    req.getMaTS(),
                    req.getMaNguoiLap(),
                    req.getDonViSuaChua(),
                    req.getNoiDungSuaChua(),
                    chiTietJSON
            );

            return ApiResponse.thanhCong("Lập phiếu bảo dưỡng thành công! Mã phiếu: " + maPBD, maPBD);
        } catch (Exception ex) {
            return ApiResponse.thatBai(ex.getMessage());
        }
    }

    public ApiResponse<String> nghiemThuBaoDuong(NghiemThuBaoDuongRequest req, String maNguoiNghiemThu) {
        try {
            // Chuẩn hóa kết luận về đúng giá trị stored procedure chấp nhận: 'Dat' hoặc 'KhongTheSua'
            String ketLuan = req.getKetLuan() == null ? "" : req.getKetLuan().replace("_", "");
            if ("Dat".equalsIgnoreCase(ketLuan)) {
                ketLuan = "Dat";
            } else if ("KhongTheSua".equalsIgnoreCase(ketLuan)) {
                ketLuan = "KhongTheSua";
            } else {
                return ApiResponse.thatBai("Kết luận nghiệm thu không hợp lệ. Chỉ chấp nhận Dat hoặc KhongTheSua.");
            }
            req.setKetLuan(ketLuan);
            storedProcedureDAO.goiNghiemThuBaoDuong(
                    req.getMaPBD(),
                    maNguoiNghiemThu,
                    req.getKetLuan(),
                    req.getHienTrangSauSuaChua(),
                    req.getDonViSuaChua(),
                    req.getNoiDungSuaChua()
            );

            String msg = "Dat".equalsIgnoreCase(req.getKetLuan())
                    ? "Nghiệm thu bảo dưỡng thành công! Thiết bị đã phục hồi và đưa về trạng thái Sẵn sàng chia sẻ."
                    : "Nghiệm thu xác nhận không thể sửa chữa. Thiết bị đã được chuyển sang trạng thái Đề xuất thanh lý (BR12).";

            return ApiResponse.thanhCong(msg, req.getMaPBD());
        } catch (Exception ex) {
            return ApiResponse.thatBai(ex.getMessage());
        }
    }

    public List<PhieuBaoDuong> getAllPhieuBaoDuong() {
        return phieuBaoDuongRepository.findAll();
    }

    public List<ChiTietBaoDuong> getChiTietByMaPBD(String maPBD) {
        return chiTietBaoDuongRepository.findByMaPBD(maPBD);
    }
}
