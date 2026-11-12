package com.env09.quanlytaisan.controller;

import com.env09.quanlytaisan.config.PhienDangNhapService;
import com.env09.quanlytaisan.config.XacThucInterceptor;
import com.env09.quanlytaisan.dto.ApiResponse;
import com.env09.quanlytaisan.dto.LoginRequest;
import com.env09.quanlytaisan.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
@Tag(name = "0. Xác thực & Đăng nhập", description = "API phục vụ UC01 (Đăng nhập hệ thống)")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private PhienDangNhapService phienDangNhapService;

    @PostMapping("/login")
    @Operation(summary = "Đăng nhập hệ thống bằng tên đăng nhập và mật khẩu (máy chủ băm SHA-256), trả về Token phiên làm việc")
    public ApiResponse<Map<String, Object>> login(@RequestBody LoginRequest request) {
        return authService.dangNhap(request);
    }

    @GetMapping("/me")
    @Operation(summary = "Lấy thông tin người dùng của phiên đăng nhập hiện tại")
    public ApiResponse<PhienDangNhapService.NguoiDungPhien> me(
            @RequestAttribute(XacThucInterceptor.THUOC_TINH_NGUOI_DUNG) PhienDangNhapService.NguoiDungPhien nguoiDung) {
        return ApiResponse.thanhCong("Phiên đăng nhập hợp lệ!", nguoiDung);
    }

    @PostMapping("/logout")
    @Operation(summary = "Đăng xuất, hủy Token phiên làm việc")
    public ApiResponse<String> logout(@RequestHeader(value = "Authorization", required = false) String header) {
        if (header != null && header.startsWith("Bearer ")) {
            phienDangNhapService.huyPhien(header.substring(7).trim());
        }
        return ApiResponse.thanhCong("Đăng xuất thành công!", null);
    }
}
