package com.env09.quanlytaisan.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "PhieuBaoDuong")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PhieuBaoDuong {

    @Id
    @Column(name = "MaPBD", length = 20, nullable = false)
    private String maPBD;

    @Column(name = "MaTS", length = 20, nullable = false)
    private String maTS;

    @Column(name = "MaNguoiLap", length = 20, nullable = false)
    private String maNguoiLap;

    @Column(name = "NgayLapPhieu", nullable = false)
    private LocalDateTime ngayLapPhieu;

    @Column(name = "DonViSuaChua", length = 150)
    private String donViSuaChua;

    @Column(name = "NoiDungSuaChua", length = 255)
    private String noiDungSuaChua;

    @Column(name = "TrangThaiBaoDuong", length = 20, nullable = false)
    private String trangThaiBaoDuong; // DangBaoDuong, DaNghiemThu, KhongTheSua

    @Column(name = "NgayKetThuc")
    private LocalDateTime ngayKetThuc;

    @Column(name = "HienTrangSauSuaChua")
    private Integer hienTrangSauSuaChua;
}
