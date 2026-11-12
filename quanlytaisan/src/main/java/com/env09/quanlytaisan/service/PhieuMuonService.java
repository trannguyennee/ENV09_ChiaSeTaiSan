package com.env09.quanlytaisan.service;

import com.env09.quanlytaisan.dto.ApiResponse;
import com.env09.quanlytaisan.dto.DuyetPhieuRequest;
import com.env09.quanlytaisan.dto.LapPhieuMuonRequest;
import com.env09.quanlytaisan.entity.ChiTietPhieuMuon;
import com.env09.quanlytaisan.entity.PhieuMuon;
import com.env09.quanlytaisan.repository.ChiTietPhieuMuonRepository;
import com.env09.quanlytaisan.repository.PhieuMuonRepository;
import com.env09.quanlytaisan.repository.StoredProcedureDAO;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PhieuMuonService {

    @Autowired
    private PhieuMuonRepository phieuMuonRepository;

    @Autowired
    private ChiTietPhieuMuonRepository chiTietPhieuMuonRepository;

    @Autowired
    private StoredProcedureDAO storedProcedureDAO;

    @Autowired
    private ObjectMapper objectMapper;

    public ApiResponse<String> lapYeuCauMuon(LapPhieuMuonRequest request) {
        try {
            if (request.getDanhSachTaiSan() == null || request.getDanhSachTaiSan().isEmpty()) {
                return ApiResponse.thatBai("Phiếu mượn phải chọn ít nhất một tài sản!");
            }

            String danhSachJSON = objectMapper.writeValueAsString(request.getDanhSachTaiSan());

            String maPMMoi = storedProcedureDAO.goiLapYeuCauMuon(
                    request.getMaNDMuon(),
                    request.getMaPBMuon(),
                    request.getNgayMuon(),
                    request.getNgayHenTra(),
                    request.getMucDichSuDung(),
                    danhSachJSON
            );

            return ApiResponse.thanhCong("Lập phiếu mượn thành công! Mã phiếu của bạn: " + maPMMoi, maPMMoi);
        } catch (Exception ex) {
            return ApiResponse.thatBai(ex.getMessage());
        }
    }

    public ApiResponse<String> duyetPhieuMuon(DuyetPhieuRequest request) {
        try {
            storedProcedureDAO.goiDuyetPhieuMuon(
                    request.getMaPM(),
                    request.getMaNguoiDuyet(),
                    request.getHanhDong(),
                    request.getGhiChuDuyet()
            );

            String msg = "Duyet".equalsIgnoreCase(request.getHanhDong())
                    ? "Đã phê duyệt phiếu mượn thành công!"
                    : "Đã từ chối phiếu mượn!";
            return ApiResponse.thanhCong(msg, request.getMaPM());
        } catch (Exception ex) {
            return ApiResponse.thatBai(ex.getMessage());
        }
    }

    public ApiResponse<String> huyPhieuMuonChoDuyet(String maPM, String maNDYeuCau, String lyDoHuy) {
        try {
            storedProcedureDAO.goiHuyPhieuMuonChoDuyet(maPM, maNDYeuCau, lyDoHuy);
            return ApiResponse.thanhCong("Hủy phiếu mượn thành công!", maPM);
        } catch (Exception ex) {
            return ApiResponse.thatBai(ex.getMessage());
        }
    }

    public List<PhieuMuon> getAllPhieuMuon() {
        return phieuMuonRepository.findAll();
    }

    public List<PhieuMuon> getPhieuMuonByPhongBan(String maPB) {
        return phieuMuonRepository.findByMaPBMuon(maPB);
    }

    public List<ChiTietPhieuMuon> getAllChiTiet() {
        return chiTietPhieuMuonRepository.findAll();
    }

    public List<ChiTietPhieuMuon> getChiTietByMaPM(String maPM) {
        return chiTietPhieuMuonRepository.findByMaPM(maPM);
    }
}
