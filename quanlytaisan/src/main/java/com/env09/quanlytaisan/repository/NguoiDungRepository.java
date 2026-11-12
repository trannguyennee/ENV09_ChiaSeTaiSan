package com.env09.quanlytaisan.repository;

import com.env09.quanlytaisan.entity.NguoiDung;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface NguoiDungRepository extends JpaRepository<NguoiDung, String> {
    Optional<NguoiDung> findByTenDangNhap(String tenDangNhap);
    Optional<NguoiDung> findByEmail(String email);
    List<NguoiDung> findByMaPB(String maPB);
    List<NguoiDung> findByVaiTro(String vaiTro);
}
