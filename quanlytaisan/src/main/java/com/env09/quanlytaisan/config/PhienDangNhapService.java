package com.env09.quanlytaisan.config;

import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.HexFormat;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Quản lý phiên đăng nhập (UC01): cấp token ngẫu nhiên sau khi xác thực thành công,
 * lưu thông tin người dùng gắn với token trong bộ nhớ máy chủ.
 */
@Service
public class PhienDangNhapService {

    // Thông tin tối thiểu của người dùng đang đăng nhập, dùng để phân quyền và ghi vết người thực hiện
    public record NguoiDungPhien(String maND, String hoTen, String vaiTro, String maPB, String tenPB) {}

    private static final long THOI_HAN_PHIEN_MS = 8 * 60 * 60 * 1000L; // 8 giờ làm việc

    private record Phien(NguoiDungPhien nguoiDung, long hetHanLuc) {}

    private final Map<String, Phien> danhSachPhien = new ConcurrentHashMap<>();
    private final SecureRandom random = new SecureRandom();

    public String taoPhien(NguoiDungPhien nguoiDung) {
        byte[] bytes = new byte[32];
        random.nextBytes(bytes);
        String token = HexFormat.of().formatHex(bytes);
        danhSachPhien.put(token, new Phien(nguoiDung, System.currentTimeMillis() + THOI_HAN_PHIEN_MS));
        return token;
    }

    public NguoiDungPhien layNguoiDung(String token) {
        if (token == null) return null;
        Phien phien = danhSachPhien.get(token);
        if (phien == null) return null;
        if (phien.hetHanLuc() < System.currentTimeMillis()) {
            danhSachPhien.remove(token);
            return null;
        }
        return phien.nguoiDung();
    }

    public void huyPhien(String token) {
        if (token != null) danhSachPhien.remove(token);
    }

    // Khi Quản trị viên khóa tài khoản, đăng xuất ngay mọi phiên của tài khoản đó
    public void huyPhienCuaNguoiDung(String maND) {
        danhSachPhien.entrySet().removeIf(e -> e.getValue().nguoiDung().maND().equals(maND));
    }
}
