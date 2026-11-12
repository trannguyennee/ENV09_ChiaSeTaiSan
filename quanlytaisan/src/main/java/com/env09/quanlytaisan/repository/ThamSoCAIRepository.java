package com.env09.quanlytaisan.repository;

import com.env09.quanlytaisan.entity.ThamSoCAI;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ThamSoCAIRepository extends JpaRepository<ThamSoCAI, String> {
}
