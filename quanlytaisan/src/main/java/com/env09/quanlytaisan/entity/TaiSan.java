package com.env09.quanlytaisan.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;

@Entity
@Table(name = "TaiSan")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TaiSan {

    @Id
    @Column(name = "MaTS", length = 20, nullable = false)
    private String maTS;

    @Column(name = "TenTS", length = 150, nullable = false)
    private String tenTS;

    @Column(name = "SoSeri", length = 50, nullable = false, unique = true)
    private String soSeri;

    @Column(name = "MaLoaiTS", length = 20, nullable = false)
    private String maLoaiTS;

    @Column(name = "MaPBSoHuu", length = 20, nullable = false)
    private String maPBSoHuu;

    @Column(name = "NamMua", nullable = false)
    private Integer namMua;

    @Column(name = "NguyenGia", nullable = false, precision = 18, scale = 2)
    private BigDecimal nguyenGia;

    @Column(name = "HienTrang", nullable = false)
    private Integer hienTrang;

    @Column(name = "TrangThai", length = 30, nullable = false)
    private String trangThai;

    @Column(name = "ViTriLuuTru", length = 200)
    private String viTriLuuTru;

    @Column(name = "HinhAnh", length = 500)
    private String hinhAnh;

    @Column(name = "MoTa", length = 500)
    private String moTa;

    // 6 Cột kế thừa từ 3 lớp con theo Sơ đồ Lớp (Hình 9) & ERD (Hình 36)
    @Column(name = "DoChinhXac", length = 100)
    private String doChinhXac;

    @Column(name = "ChuKyKiemDinh")
    private Integer chuKyKiemDinh;

    @Column(name = "CauHinhCPU", length = 100)
    private String cauHinhCPU;

    @Column(name = "DungLuongRAM", length = 50)
    private String dungLuongRAM;

    @Column(name = "CongSuat", length = 50)
    private String congSuat;

    @Column(name = "PhuKienDiKem", length = 255)
    private String phuKienDiKem;
}
