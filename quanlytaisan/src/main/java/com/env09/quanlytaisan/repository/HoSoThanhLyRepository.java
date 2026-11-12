package com.env09.quanlytaisan.repository;

import com.env09.quanlytaisan.entity.HoSoThanhLy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HoSoThanhLyRepository extends JpaRepository<HoSoThanhLy, String> {
    List<HoSoThanhLy> findByMaTS(String maTS);
    List<HoSoThanhLy> findByTrangThai(String trangThai);
}
