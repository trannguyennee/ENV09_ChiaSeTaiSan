package com.env09.quanlytaisan.entity;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "NguoiDung")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NguoiDung {

    @Id
    @Column(name = "MaND", length = 20, nullable = false)
    private String maND;

    @Column(name = "MaPB", length = 20, nullable = false)
    private String maPB;

    @Column(name = "TenDangNhap", length = 50, nullable = false, unique = true)
    private String tenDangNhap;

    // Chỉ nhận khi tạo tài khoản, không bao giờ trả chuỗi hash mật khẩu về client
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Column(name = "MatKhau", length = 256, nullable = false)
    private String matKhau;

    @Column(name = "HoTen", length = 120, nullable = false)
    private String hoTen;

    @Column(name = "Email", length = 100, nullable = false)
    private String email;

    @Column(name = "VaiTro", length = 50, nullable = false)
    private String vaiTro; // 'NhanVien', 'ThuKho', 'QuanTri', 'LanhDao'

    @Column(name = "TrangThaiTK", length = 30, nullable = false)
    private String trangThaiTK; // 'HoatDong', 'Khoa'

    @JsonIgnore
    @Column(name = "MaXacNhanReset", length = 20)
    private String maXacNhanReset;

    @JsonIgnore
    @Column(name = "HanReset")
    private LocalDateTime hanReset;
}
