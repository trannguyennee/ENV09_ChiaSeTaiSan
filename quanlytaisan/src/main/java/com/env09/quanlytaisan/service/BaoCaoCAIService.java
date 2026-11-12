package com.env09.quanlytaisan.service;

import com.env09.quanlytaisan.dto.ApiResponse;
import com.env09.quanlytaisan.repository.StoredProcedureDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Service
public class BaoCaoCAIService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private StoredProcedureDAO storedProcedureDAO;

    public ApiResponse<List<Map<String, Object>>> getChiSoCAI() {
        String sql = "SELECT * FROM v_ChiSoCAI_HieuQuaKhaiThac";
        List<Map<String, Object>> list = jdbcTemplate.queryForList(sql);
        return ApiResponse.thanhCong("Lấy báo cáo chỉ số CAI từng tài sản thành công!", list);
    }

    public ApiResponse<Map<String, Object>> getTongHopKPI() {
        String sql = "SELECT * FROM v_TongHopKPI_CAI_NCAV";
        List<Map<String, Object>> list = jdbcTemplate.queryForList(sql);
        if (!list.isEmpty()) {
            return ApiResponse.thanhCong("Lấy tổng hợp KPI & NCAV thành công!", list.get(0));
        }
        return ApiResponse.thatBai("Chưa có dữ liệu tổng hợp KPI!");
    }

    public ApiResponse<List<Map<String, Object>>> getChiPhiBaoDuong() {
        String sql = "SELECT * FROM v_TongHopChiPhiBaoDuong";
        List<Map<String, Object>> list = jdbcTemplate.queryForList(sql);
        return ApiResponse.thanhCong("Lấy tổng hợp chi phí bảo dưỡng thành công!", list);
    }

    public ApiResponse<com.env09.quanlytaisan.dto.BaoCaoCAITheoKyResponse> getBaoCaoCAITheoKy(LocalDate tuNgay, LocalDate denNgay) {
        com.env09.quanlytaisan.dto.BaoCaoCAITheoKyResponse res = storedProcedureDAO.goiBaoCaoCAITheoKy(tuNgay, denNgay);
        return ApiResponse.thanhCong("Lấy báo cáo CAI và tổng hợp kỳ (NCAV, ROI) thành công!", res);
    }
}
