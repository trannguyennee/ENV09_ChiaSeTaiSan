package com.env09.quanlytaisan.repository;

import com.env09.quanlytaisan.entity.PhongBan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PhongBanRepository extends JpaRepository<PhongBan, String> {
    Optional<PhongBan> findByTenPB(String tenPB);
}
