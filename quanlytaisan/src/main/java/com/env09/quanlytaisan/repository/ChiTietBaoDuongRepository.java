package com.env09.quanlytaisan.repository;

import com.env09.quanlytaisan.entity.ChiTietBaoDuong;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChiTietBaoDuongRepository extends JpaRepository<ChiTietBaoDuong, Integer> {
    List<ChiTietBaoDuong> findByMaPBD(String maPBD);
}
