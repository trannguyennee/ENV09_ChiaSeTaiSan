package com.env09.quanlytaisan.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "HoSoThanhLy")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HoSoThanhLy {

    @Id
    @Column(name = "MaHSTL", length = 20, nullable = false)
    private String maHSTL;

    @Column(name = "MaTS", length = 20, nullable = false)
    private String maTS;

    @Column(name = "MaNguoiDeXuat", length = 20, nullable = false)
    private String maNguoiDeXuat;

    @Column(name = "NgayDeXuat", nullable = false)
    private LocalDateTime ngayDeXuat;

    @Column(name = "LyDoDeXuat", length = 255, nullable = false)
    private String lyDoDeXuat;

    @Column(name = "TrangThai", length = 20, nullable = false)
    private String trangThai; // ChoDuyet, DaDuyet, BacBo

    @Column(name = "MaNguoiDuyet", length = 20)
    private String maNguoiDuyet;

    @Column(name = "NgayDuyet")
    private LocalDateTime ngayDuyet;

    @Column(name = "SoQuyetDinh", length = 50)
    private String soQuyetDinh;

    @Column(name = "GhiChuDuyet", length = 255)
    private String ghiChuDuyet;
}
