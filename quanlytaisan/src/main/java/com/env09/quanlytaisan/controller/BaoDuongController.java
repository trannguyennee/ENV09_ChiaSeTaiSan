package com.env09.quanlytaisan.controller;

import com.env09.quanlytaisan.config.PhienDangNhapService.NguoiDungPhien;
import com.env09.quanlytaisan.config.XacThucInterceptor;
import com.env09.quanlytaisan.dto.ApiResponse;
import com.env09.quanlytaisan.dto.LapPhieuBaoDuongRequest;
import com.env09.quanlytaisan.dto.NghiemThuBaoDuongRequest;
import com.env09.quanlytaisan.entity.ChiTietBaoDuong;
import com.env09.quanlytaisan.entity.PhieuBaoDuong;
import com.env09.quanlytaisan.service.BaoDuongService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bao-duong")
@CrossOrigin("*")
@Tag(name = "3. Quản lý Bảo dưỡng & Sửa chữa", description = "Các API phục vụ UC13 và Quy tắc BR11, BR12")
public class BaoDuongController {

    @Autowired
    private BaoDuongService baoDuongService;

    @PostMapping("/lap-phieu")
    @Operation(summary = "Lập phiếu bảo dưỡng và đưa thiết bị vào sửa chữa (sp_LapPhieuBaoDuong)")
    public ApiResponse<String> lapPhieuBaoDuong(@RequestBody LapPhieuBaoDuongRequest req,
                                                @RequestAttribute(XacThucInterceptor.THUOC_TINH_NGUOI_DUNG) NguoiDungPhien nguoiDung) {
        req.setMaNguoiLap(nguoiDung.maND());
        return baoDuongService.lapPhieuBaoDuong(req);
    }

    @PostMapping("/nghiem-thu")
    @Operation(summary = "Nghiệm thu bảo dưỡng: Dat -> Sẵn sàng chia sẻ, KhongTheSua -> Đề xuất thanh lý (BR11, BR12)")
    public ApiResponse<String> nghiemThuBaoDuong(@RequestBody NghiemThuBaoDuongRequest req,
                                                 @RequestAttribute(XacThucInterceptor.THUOC_TINH_NGUOI_DUNG) NguoiDungPhien nguoiDung) {
        return baoDuongService.nghiemThuBaoDuong(req, nguoiDung.maND());
    }

    @GetMapping("/danh-sach")
    @Operation(summary = "Lấy danh sách tất cả các phiếu bảo dưỡng trong hệ thống")
    public ApiResponse<List<PhieuBaoDuong>> getAllPhieuBaoDuong() {
        return ApiResponse.thanhCong("Lấy danh sách phiếu bảo dưỡng thành công!", baoDuongService.getAllPhieuBaoDuong());
    }

    @GetMapping("/chi-tiet/{maPBD}")
    @Operation(summary = "Lấy danh sách hạng mục và linh kiện thay thế của phiếu bảo dưỡng")
    public ApiResponse<List<ChiTietBaoDuong>> getChiTietByMaPBD(@PathVariable String maPBD) {
        return ApiResponse.thanhCong("Lấy chi tiết hạng mục thành công!", baoDuongService.getChiTietByMaPBD(maPBD));
    }
}
