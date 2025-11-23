package com.levelup.levelupbackend.service;

import java.util.List;

import com.levelup.levelupbackend.model.Evento;

public interface EventoService {
    List<Evento> listar();
    Evento crear(Evento e);
    Evento actualizar(Long id, Evento e);
    void eliminar(Long id);
}
