package com.env09.quanlytaisan.repository;

import com.env09.quanlytaisan.entity.TaiSan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface TaiSanRepository extends JpaRepository<TaiSan, String> {

    Optional<TaiSan> findBySoSeri(String soSeri);

    @Query("SELECT t FROM TaiSan t WHERE t.trangThai = 'SanSangChiaSe' AND t.hienTrang >= 50")
    List<TaiSan> findDanhSachSanSangChiaSe();

    List<TaiSan> findByMaPBSoHuu(String maPBSoHuu);

    List<TaiSan> findByTrangThai(String trangThai);
}
