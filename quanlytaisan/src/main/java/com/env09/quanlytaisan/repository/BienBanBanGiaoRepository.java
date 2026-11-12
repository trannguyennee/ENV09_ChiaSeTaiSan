package com.env09.quanlytaisan.repository;

import com.env09.quanlytaisan.entity.BienBanBanGiao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BienBanBanGiaoRepository extends JpaRepository<BienBanBanGiao, String> {
    Optional<BienBanBanGiao> findByMaPM(String maPM);
}
