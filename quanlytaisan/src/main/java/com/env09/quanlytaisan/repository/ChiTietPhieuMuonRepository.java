package com.env09.quanlytaisan.repository;

import com.env09.quanlytaisan.entity.ChiTietPhieuMuon;
import com.env09.quanlytaisan.entity.ChiTietPhieuMuonId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChiTietPhieuMuonRepository extends JpaRepository<ChiTietPhieuMuon, ChiTietPhieuMuonId> {
    List<ChiTietPhieuMuon> findByMaPM(String maPM);
    List<ChiTietPhieuMuon> findByMaTS(String maTS);
}
