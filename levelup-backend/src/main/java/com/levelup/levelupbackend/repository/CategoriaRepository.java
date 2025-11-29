package com.levelup.levelupbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.levelup.levelupbackend.model.Categoria;

public interface CategoriaRepository extends JpaRepository<Categoria, Long> {}
