package com.levelup.levelupbackend.service;

import java.util.List;

import com.levelup.levelupbackend.model.Destacado;

public interface DestacadoService {

    List<Destacado> listar();

    Destacado crear(Destacado d);

    Destacado actualizar(Long id, Destacado d);

    void eliminar(Long id);
}
