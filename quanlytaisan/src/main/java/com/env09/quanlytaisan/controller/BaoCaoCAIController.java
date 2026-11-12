package com.env09.quanlytaisan.controller;

import com.env09.quanlytaisan.dto.ApiResponse;
import com.env09.quanlytaisan.service.BaoCaoCAIService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/bao-cao-cai")
@CrossOrigin("*")
@Tag(name = "4. Báo cáo CAI & Hiệu quả kinh tế", description = "Các API phục vụ UC16 và Giả định toán học A1-A4, BR18, BR19, BR20")
public class BaoCaoCAIController {

    @Autowired
    private BaoCaoCAIService baoCaoCAIService;

    @GetMapping("/chi-so-tung-tai-san")
    @Operation(summary = "Xem chỉ số tránh mua mới (CAI) của từng tài sản (Giả định A3: 1.5%/ngày, Giả định A4: 100%)")
    public ApiResponse<List<Map<String, Object>>> getChiSoCAI() {
        return baoCaoCAIService.getChiSoCAI();
    }

    @GetMapping("/tong-hop-kpi-ncav")
    @Operation(summary = "Xem tổng hợp KPI toàn trường: Tổng tránh mua, Chi phí bảo dưỡng, và Giá trị tránh mua ròng (NCAV)")
    public ApiResponse<Map<String, Object>> getTongHopKPI() {
        return baoCaoCAIService.getTongHopKPI();
    }

    @GetMapping("/chi-phi-bao-duong")
    @Operation(summary = "Xem tổng hợp chi phí bảo dưỡng từng tài sản (BR12, BR15)")
    public ApiResponse<List<Map<String, Object>>> getChiPhiBaoDuong() {
        return baoCaoCAIService.getChiPhiBaoDuong();
    }

    @GetMapping("/theo-ky")
    @Operation(summary = "Báo cáo chỉ số tránh mua mới CAI và tổng hợp NCAV theo kỳ (BR20 - Hình 53)")
    public ApiResponse<com.env09.quanlytaisan.dto.BaoCaoCAITheoKyResponse> getBaoCaoCAITheoKy(
            @RequestParam(name = "tuNgay") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate tuNgay,
            @RequestParam(name = "denNgay") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate denNgay
    ) {
        return baoCaoCAIService.getBaoCaoCAITheoKy(tuNgay, denNgay);
    }
}
