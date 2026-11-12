package com.env09.quanlytaisan.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "LoaiTaiSan")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoaiTaiSan {

    @Id
    @Column(name = "MaLoaiTS", length = 20, nullable = false)
    private String maLoaiTS;

    @Column(name = "TenLoaiTS", length = 100, nullable = false)
    private String tenLoaiTS;

    @Column(name = "NhomTaiSan", length = 50, nullable = false)
    private String nhomTaiSan; // 'DoDac', 'CNTT', 'ThietBiChung'

    @Column(name = "NienHanNam", nullable = false)
    private Integer nienHanNam;
}
