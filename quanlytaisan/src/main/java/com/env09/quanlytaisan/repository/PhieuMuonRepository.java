package com.env09.quanlytaisan.repository;

import com.env09.quanlytaisan.entity.PhieuMuon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PhieuMuonRepository extends JpaRepository<PhieuMuon, String> {

    List<PhieuMuon> findByMaPBMuon(String maPBMuon);

    List<PhieuMuon> findByTrangThai(String trangThai);

    @Query("SELECT COUNT(p) FROM PhieuMuon p WHERE p.maPBMuon = :maPB AND p.trangThai IN ('ChoDuyet', 'DaDuyet', 'DangThucHien')")
    long countPhieuDangMoCuaPhongBan(@Param("maPB") String maPB);

    @Query("SELECT COUNT(p) FROM PhieuMuon p WHERE p.maPBMuon = :maPB AND p.trangThai = 'DangThucHien' AND p.coQuaHan = true")
    long countPhieuQuaHanCuaPhongBan(@Param("maPB") String maPB);
}
