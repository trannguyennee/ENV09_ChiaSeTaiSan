package com.env09.quanlytaisan.repository;

import com.env09.quanlytaisan.entity.LichSuSuCo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LichSuSuCoRepository extends JpaRepository<LichSuSuCo, String> {
    List<LichSuSuCo> findByMaTS(String maTS);
    List<LichSuSuCo> findByMaPBChiuTrachNhiem(String maPBChiuTrachNhiem);
}
