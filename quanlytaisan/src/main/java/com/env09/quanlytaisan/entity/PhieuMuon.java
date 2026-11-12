package com.env09.quanlytaisan.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "PhieuMuon")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PhieuMuon {

    @Id
    @Column(name = "MaPM", length = 20, nullable = false)
    private String maPM;

    @Column(name = "MaNguoiMuon", length = 20, nullable = false)
    private String maNguoiMuon;

    @Column(name = "MaPBMuon", length = 20, nullable = false)
    private String maPBMuon;

    @Column(name = "MaNguoiDuyet", length = 20)
    private String maNguoiDuyet;

    @Column(name = "NgayLap", nullable = false)
    private LocalDateTime ngayLap;

    @Column(name = "NgayMuon", nullable = false)
    private LocalDate ngayMuon;

    @Column(name = "NgayHenTra", nullable = false)
    private LocalDate ngayHenTra;

    @Column(name = "MucDichSuDung", length = 255, nullable = false)
    private String mucDichSuDung;

    @Column(name = "TrangThai", length = 20, nullable = false)
    private String trangThai; // ChoDuyet, DaDuyet, DangThucHien, HoanTat, TuChoi, DaHuy

    @Column(name = "CoQuaHan", nullable = false)
    private Boolean coQuaHan;

    @Column(name = "NgayDuyet")
    private LocalDateTime ngayDuyet;

    @Column(name = "LyDoTuChoi", length = 255)
    private String lyDoTuChoi;

    @Column(name = "LyDoHuy", length = 255)
    private String lyDoHuy;
}
