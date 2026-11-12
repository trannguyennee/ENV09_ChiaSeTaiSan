package com.env09.quanlytaisan.repository;

import com.env09.quanlytaisan.entity.PhieuBaoDuong;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PhieuBaoDuongRepository extends JpaRepository<PhieuBaoDuong, String> {
    List<PhieuBaoDuong> findByMaTS(String maTS);
    List<PhieuBaoDuong> findByTrangThaiBaoDuong(String trangThaiBaoDuong);
}
