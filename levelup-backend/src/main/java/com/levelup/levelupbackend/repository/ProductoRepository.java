package com.levelup.levelupbackend.repository;

import com.levelup.levelupbackend.model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductoRepository extends JpaRepository<Producto, Long> {
}