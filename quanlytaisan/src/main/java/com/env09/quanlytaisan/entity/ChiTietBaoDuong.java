package com.env09.quanlytaisan.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;

@Entity
@Table(name = "ChiTietBaoDuong")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChiTietBaoDuong {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MaChiTietBD", nullable = false)
    private Integer maChiTietBD;

    @Column(name = "MaPBD", length = 20, nullable = false)
    private String maPBD;

    @Column(name = "HangMucSuaChua", length = 150, nullable = false)
    private String hangMucSuaChua;

    @Column(name = "LinhKienThayThe", length = 150)
    private String linhKienThayThe;

    @Column(name = "DonGia", precision = 18, scale = 2, nullable = false)
    private BigDecimal donGia;

    @Column(name = "SoLuong", nullable = false)
    private Integer soLuong;

    @Column(name = "ThanhTien", insertable = false, updatable = false)
    private BigDecimal thanhTien;
}
