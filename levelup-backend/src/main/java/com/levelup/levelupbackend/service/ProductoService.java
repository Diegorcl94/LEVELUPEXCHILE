package com.levelup.levelupbackend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.levelup.levelupbackend.model.Producto;
import com.levelup.levelupbackend.repository.ProductoRepository;

@Service
public class ProductoService {

    private final ProductoRepository repo;

    public ProductoService(ProductoRepository repo) {
        this.repo = repo;
    }

    public List<Producto> listar() {
        return repo.findAll();
    }

    public Producto guardar(Producto p) {
        return repo.save(p);
    }

    public void eliminar(Long id) {
        repo.deleteById(id);
    }
}
