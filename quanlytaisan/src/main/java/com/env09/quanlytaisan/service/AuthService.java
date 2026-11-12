package com.env09.quanlytaisan.service;

import com.env09.quanlytaisan.config.PhienDangNhapService;
import com.env09.quanlytaisan.dto.ApiResponse;
import com.env09.quanlytaisan.dto.LoginRequest;
import com.env09.quanlytaisan.entity.NguoiDung;
import com.env09.quanlytaisan.entity.PhongBan;
import com.env09.quanlytaisan.repository.NguoiDungRepository;
import com.env09.quanlytaisan.repository.PhongBanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private NguoiDungRepository nguoiDungRepository;

    @Autowired
    private PhongBanRepository phongBanRepository;

    @Autowired
    private PhienDangNhapService phienDangNhapService;

    // Băm mật khẩu SHA-256 (chuỗi hex chữ thường), luôn băm ở máy chủ, không nhận hash từ client
    public static String bamSHA256(String matKhau) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            byte[] hash = md.digest(matKhau.getBytes(StandardCharsets.UTF_8));
            StringBuilder hexString = new StringBuilder();
            for (byte b : hash) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1) hexString.append('0');
                hexString.append(hex);
            }
            return hexString.toString();
        } catch (Exception ex) {
            throw new IllegalStateException("Không thể băm mật khẩu", ex);
        }
    }

    public ApiResponse<Map<String, Object>> dangNhap(LoginRequest request) {
        try {
            if (request.getTenDangNhap() == null || request.getMatKhau() == null || request.getMatKhau().isEmpty()) {
                return ApiResponse.thatBai("Vui lòng nhập Tên đăng nhập và Mật khẩu!");
            }
            String hashHex = bamSHA256(request.getMatKhau());

            Optional<NguoiDung> optUser = nguoiDungRepository.findByTenDangNhap(request.getTenDangNhap());
            if (optUser.isEmpty() || !optUser.get().getMatKhau().equalsIgnoreCase(hashHex)) {
                return ApiResponse.thatBai("Tên đăng nhập hoặc mật khẩu không chính xác!");
            }

            NguoiDung user = optUser.get();
            if ("Khoa".equalsIgnoreCase(user.getTrangThaiTK())) {
                return ApiResponse.thatBai("Tài khoản của bạn hiện đang bị khóa!");
            }

            String tenPB = "";
            Optional<PhongBan> optPB = phongBanRepository.findById(user.getMaPB());
            if (optPB.isPresent()) {
                tenPB = optPB.get().getTenPB();
            }

            Map<String, Object> data = new HashMap<>();
            data.put("MaND", user.getMaND());
            data.put("HoTen", user.getHoTen());
            data.put("Email", user.getEmail());
            data.put("VaiTro", user.getVaiTro());
            data.put("TrangThaiTK", user.getTrangThaiTK());
            data.put("MaPB", user.getMaPB());
            data.put("TenPB", tenPB);
            data.put("Token", phienDangNhapService.taoPhien(new PhienDangNhapService.NguoiDungPhien(
                    user.getMaND(), user.getHoTen(), user.getVaiTro(), user.getMaPB(), tenPB)));

            return ApiResponse.thanhCong("Đăng nhập thành công!", data);
        } catch (Exception ex) {
            return ApiResponse.thatBai("Lỗi xác thực: " + ex.getMessage());
        }
    }
}
