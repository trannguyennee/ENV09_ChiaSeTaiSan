package com.env09.quanlytaisan.repository;

import com.env09.quanlytaisan.entity.BienBanThuHoi;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BienBanThuHoiRepository extends JpaRepository<BienBanThuHoi, String> {
    Optional<BienBanThuHoi> findByMaPM(String maPM);
}
