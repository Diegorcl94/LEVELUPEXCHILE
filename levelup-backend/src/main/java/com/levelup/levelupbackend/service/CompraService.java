package com.levelup.levelupbackend.service;

import java.util.List;

import com.levelup.levelupbackend.model.Compra;

public interface CompraService {

    Compra guardar(Compra compra);

    List<Compra> obtenerPorUsuario(String email);

    void eliminarComprasDeUsuario(String email);
}