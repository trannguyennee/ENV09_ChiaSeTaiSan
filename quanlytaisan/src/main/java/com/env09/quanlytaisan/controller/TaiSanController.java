package com.env09.quanlytaisan.controller;

import com.env09.quanlytaisan.config.PhienDangNhapService.NguoiDungPhien;
import com.env09.quanlytaisan.config.XacThucInterceptor;
import com.env09.quanlytaisan.dto.ApiResponse;
import com.env09.quanlytaisan.dto.KhaiBaoTaiSanRequest;
import com.env09.quanlytaisan.dto.KiemNhanTaiSanRequest;
import com.env09.quanlytaisan.entity.TaiSan;
import com.env09.quanlytaisan.service.TaiSanService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tai-san")
@CrossOrigin("*")
@Tag(name = "1. Quản lý Tài sản", description = "Các API phục vụ UC05, UC06, UC12, UC14 và Quy tắc BR01, BR03, BR10, BR15")
public class TaiSanController {

    @Autowired
    private TaiSanService taiSanService;

    @GetMapping("/san-sang-chia-se")
    @Operation(summary = "Xem danh sách thiết bị khả dụng (Hiện trạng >= 50% theo BR01, BR03, BR10)")
    public ApiResponse<List<TaiSan>> getDanhSachSanSangChiaSe() {
        return ApiResponse.thanhCong("Lấy danh sách thiết bị sẵn sàng chia sẻ thành công!", taiSanService.getDanhSachSanSangChiaSe());
    }

    @GetMapping
    @Operation(summary = "Xem toàn bộ tài sản trong kho hệ thống")
    public ApiResponse<List<TaiSan>> getAllTaiSan() {
        return ApiResponse.thanhCong("Lấy toàn bộ danh sách tài sản thành công!", taiSanService.getAllTaiSan());
    }

    @PostMapping("/khai-bao")
    @Operation(summary = "Tiếp nhận đăng ký tài sản mới (UC05 & BR01: Hiện trạng >= 50%, Seri duy nhất)")
    public ApiResponse<String> khaiBaoTaiSan(@RequestBody KhaiBaoTaiSanRequest request,
                                             @RequestAttribute(XacThucInterceptor.THUOC_TINH_NGUOI_DUNG) NguoiDungPhien nguoiDung) {
        request.setMaNDThucHien(nguoiDung.maND());
        // UC05 bước 2: Nhân viên chỉ khai báo tài sản của chính phòng ban mình
        if ("NhanVien".equals(nguoiDung.vaiTro()) || request.getMaPBSoHuu() == null || request.getMaPBSoHuu().isBlank()) {
            request.setMaPBSoHuu(nguoiDung.maPB());
        }
        return taiSanService.khaiBaoTaiSan(request);
    }

    @PostMapping("/kiem-nhan")
    @Operation(summary = "Thủ kho kiểm nhận tài sản Mới: xác nhận nguyên giá, hiện trạng; >= 50% vào kho, dưới ngưỡng chuyển Cần bảo dưỡng (UC12 & BR21)")
    public ApiResponse<String> kiemNhanTaiSan(@RequestBody KiemNhanTaiSanRequest request,
                                              @RequestAttribute(XacThucInterceptor.THUOC_TINH_NGUOI_DUNG) NguoiDungPhien nguoiDung) {
        return taiSanService.kiemNhanTaiSan(request, nguoiDung.maND());
    }

    @PostMapping("/de-xuat-thanh-ly")
    @Operation(summary = "Lập hồ sơ đề xuất thanh lý (UC14 & BR15) - tương đương POST /api/thanh-ly/de-xuat")
    public ApiResponse<String> deXuatThanhLy(
            @RequestParam String maTS,
            @RequestParam String lyDoDeXuat,
            @RequestAttribute(XacThucInterceptor.THUOC_TINH_NGUOI_DUNG) NguoiDungPhien nguoiDung
    ) {
        return taiSanService.deXuatThanhLy(maTS, nguoiDung.maND(), lyDoDeXuat);
    }
}
