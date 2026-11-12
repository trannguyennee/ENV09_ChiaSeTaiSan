package com.env09.quanlytaisan.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "ChiTietPhieuMuon")
@IdClass(ChiTietPhieuMuonId.class)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChiTietPhieuMuon {

    @Id
    @Column(name = "MaPM", length = 20, nullable = false)
    private String maPM;

    @Id
    @Column(name = "MaTS", length = 20, nullable = false)
    private String maTS;

    @Column(name = "GhiChuMucDich", length = 255)
    private String ghiChuMucDich;

    @Column(name = "TinhTrangTruoc", length = 255)
    private String tinhTrangTruoc;

    @Column(name = "TinhTrangSau", length = 20)
    private String tinhTrangSau; // Tot, CanBaoTri, HuHong

    @Column(name = "TyLeHaoMon")
    private Integer tyLeHaoMon;

    @Column(name = "GhiChuSau", length = 255)
    private String ghiChuSau;
}
