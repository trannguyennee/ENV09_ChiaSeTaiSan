package com.env09.quanlytaisan.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "PhongBan")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PhongBan {

    @Id
    @Column(name = "MaPB", length = 20, nullable = false)
    private String maPB;

    @Column(name = "TenPB", length = 100, nullable = false, unique = true)
    private String tenPB;

    @Column(name = "DiaDiem", length = 150)
    private String diaDiem;

    @Column(name = "SoDienThoai", length = 20)
    private String soDienThoai;

    @Column(name = "TruongDonVi", length = 100)
    private String truongDonVi;
}
