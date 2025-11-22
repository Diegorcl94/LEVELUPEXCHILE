package com.levelup.levelupbackend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.levelup.levelupbackend.model.Compra;

public interface CompraRepository extends JpaRepository<Compra, Long> {

    // Todas las compras de un usuario
    List<Compra> findByEmail(String email);

    // Eliminar compras de un usuario
    void deleteByEmail(String email);
}