package com.levelup.levelupbackend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.levelup.levelupbackend.model.Banner;

public interface BannerRepository extends JpaRepository<Banner, Long> {

    List<Banner> findAllByOrderByOrdenAsc();
}
