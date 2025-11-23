package com.levelup.levelupbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.levelup.levelupbackend.model.Evento;

public interface EventoRepository extends JpaRepository<Evento, Long> {
}
