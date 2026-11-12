package com.env09.quanlytaisan.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "ThamSoCAI")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ThamSoCAI {

    @Id
    @Column(name = "MaThamSo", length = 20, nullable = false)
    private String maThamSo;

    @Column(name = "TenThamSo", length = 150, nullable = false)
    private String tenThamSo;

    @Column(name = "GiaTri", precision = 18, scale = 4, nullable = false)
    private BigDecimal giaTri;

    @Column(name = "DonViTinh", length = 30, nullable = false)
    private String donViTinh;

    @Column(name = "NgayCapNhat", nullable = false)
    private LocalDateTime ngayCapNhat;
}
