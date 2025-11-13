package com.levelup.levelupbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.levelup.levelupbackend.model.Producto;

public interface ProductoRepository extends JpaRepository<Producto, Long> {
}