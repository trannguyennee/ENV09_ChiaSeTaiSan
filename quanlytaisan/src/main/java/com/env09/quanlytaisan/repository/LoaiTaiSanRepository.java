package com.env09.quanlytaisan.repository;

import com.env09.quanlytaisan.entity.LoaiTaiSan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LoaiTaiSanRepository extends JpaRepository<LoaiTaiSan, String> {
    List<LoaiTaiSan> findByNhomTaiSan(String nhomTaiSan);
}
