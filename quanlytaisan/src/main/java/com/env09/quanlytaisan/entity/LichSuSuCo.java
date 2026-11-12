package com.env09.quanlytaisan.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "LichSuSuCo")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LichSuSuCo {

    @Id
    @Column(name = "MaSuCo", length = 20, nullable = false)
    private String maSuCo;

    @Column(name = "MaTS", length = 20, nullable = false)
    private String maTS;

    @Column(name = "MaBBBG", length = 20)
    private String maBBBG;

    @Column(name = "MaBBTH", length = 20)
    private String maBBTH;

    @Column(name = "MaPBChiuTrachNhiem", length = 20)
    private String maPBChiuTrachNhiem;

    @Column(name = "NgayPhatSinh", nullable = false)
    private LocalDateTime ngayPhatSinh;

    @Column(name = "MoTaHuHong", length = 255, nullable = false)
    private String moTaHuHong;

    @Column(name = "MucDoThietHai", nullable = false)
    private Integer mucDoThietHai; // % thiet hai (0 - 100)

    @Column(name = "ChiPhiBoiThuong", precision = 18, scale = 2, nullable = false)
    private BigDecimal chiPhiBoiThuong;
}
