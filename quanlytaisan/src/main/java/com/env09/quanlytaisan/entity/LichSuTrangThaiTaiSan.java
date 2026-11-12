package com.env09.quanlytaisan.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "LichSuTrangThaiTaiSan")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LichSuTrangThaiTaiSan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MaLichSu", nullable = false)
    private Integer maLichSu;

    @Column(name = "MaTS", length = 20, nullable = false)
    private String maTS;

    @Column(name = "TrangThaiCu", length = 30)
    private String trangThaiCu;

    @Column(name = "TrangThaiMoi", length = 30, nullable = false)
    private String trangThaiMoi;

    @Column(name = "NgayThayDoi", nullable = false)
    private LocalDateTime ngayThayDoi;

    @Column(name = "MaNguoiThucHien", length = 20)
    private String maNguoiThucHien;

    @Column(name = "MaPM", length = 30)
    private String maPM;

    @Column(name = "LyDo", length = 500)
    private String lyDo;
}
