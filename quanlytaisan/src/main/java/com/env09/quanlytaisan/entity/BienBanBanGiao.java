package com.env09.quanlytaisan.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "BienBanBanGiao")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BienBanBanGiao {

    @Id
    @Column(name = "MaBBBG", length = 30, nullable = false)
    private String maBBBG;

    @Column(name = "MaPM", length = 30, nullable = false, unique = true)
    private String maPM;

    @Column(name = "MaNguoiGiao", length = 20, nullable = false)
    private String maNguoiGiao;

    @Column(name = "MaNguoiNhan", length = 20, nullable = false)
    private String maNguoiNhan;

    @Column(name = "NgayGiao", nullable = false)
    private LocalDateTime ngayGiao;

    @Column(name = "PhuKienKemTheo", length = 500)
    private String phuKienKemTheo;

    @Column(name = "TrangThaiGiao", length = 30, nullable = false)
    private String trangThaiGiao; // DaGiao, Huy
}
