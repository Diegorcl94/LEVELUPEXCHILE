package com.levelup.levelupbackend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.levelup.levelupbackend.model.Compra;

public interface CompraRepository extends JpaRepository<Compra, Long> {

    List<Compra> findByUsuarioEmail(String usuarioEmail); // ✔ correcto
}
