package com.env09.quanlytaisan.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "BienBanThuHoi")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BienBanThuHoi {

    @Id
    @Column(name = "MaBBTH", length = 20, nullable = false)
    private String maBBTH;

    @Column(name = "MaPM", length = 20, nullable = false, unique = true)
    private String maPM;

    @Column(name = "MaNguoiThuHoi", length = 20, nullable = false)
    private String maNguoiThuHoi;

    @Column(name = "MaNguoiTra", length = 20, nullable = false)
    private String maNguoiTra;

    @Column(name = "NgayThuHoi", nullable = false)
    private LocalDateTime ngayThuHoi;

    @Column(name = "SoNgayMuonThucTe", nullable = false)
    private Integer soNgayMuonThucTe;

    @Column(name = "GhiChu", length = 255)
    private String ghiChu;
}
