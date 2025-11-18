package com.levelup.levelupbackend.service;

import com.levelup.levelupbackend.model.Producto;
import java.util.List;

public interface ProductoService {
    List<Producto> listar();
    Producto crear(Producto p);
    Producto actualizar(Long id, Producto p);
    void eliminar(Long id);
}
