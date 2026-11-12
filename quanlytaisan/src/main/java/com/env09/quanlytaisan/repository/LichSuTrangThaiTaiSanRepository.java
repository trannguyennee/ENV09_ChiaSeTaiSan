package com.env09.quanlytaisan.repository;

import com.env09.quanlytaisan.entity.LichSuTrangThaiTaiSan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LichSuTrangThaiTaiSanRepository extends JpaRepository<LichSuTrangThaiTaiSan, Integer> {
    List<LichSuTrangThaiTaiSan> findByMaTSOrderByNgayThayDoiDesc(String maTS);
    List<LichSuTrangThaiTaiSan> findByMaPM(String maPM);
}
