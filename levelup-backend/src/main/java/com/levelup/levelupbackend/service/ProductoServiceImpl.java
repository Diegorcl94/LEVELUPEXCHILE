package com.levelup.levelupbackend.service;

import java.util.List;

import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import com.levelup.levelupbackend.model.Producto;
import com.levelup.levelupbackend.repository.ProductoRepository;

@Service
public class ProductoServiceImpl implements ProductoService {

    private final ProductoRepository repo;

    public ProductoServiceImpl(ProductoRepository repo) {
        this.repo = repo;
    }

    // ======================================================
    // LISTAR
    // ======================================================
    @Override
    public List<Producto> listar() {
        return repo.findAll();
    }

    // ======================================================
    // CREAR
    // ======================================================
    @Override
    public Producto crear(Producto p) {

        validarProducto(p);

        // Normalizar
        p.setNombre(p.getNombre().trim());
        p.setDescripcion(p.getDescripcion().trim());
        p.setCategoria(p.getCategoria().trim());

        return repo.save(p);
    }

    // ======================================================
    // EDITAR
    // ======================================================
    @Override
    public Producto actualizar(Long id, Producto p) {

        Producto original = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        validarProducto(p);

        original.setNombre(p.getNombre().trim());
        original.setDescripcion(p.getDescripcion().trim());
        original.setImagen(p.getImagen());
        original.setPrecio(p.getPrecio());
        original.setCategoria(p.getCategoria().trim());

        return repo.save(original);
    }

    // ======================================================
    // ELIMINAR
    // ======================================================
    @Override
    public void eliminar(Long id) {
        try {
            repo.deleteById(id);
        } catch (EmptyResultDataAccessException ex) {
            throw new RuntimeException("Producto no encontrado");
        }
    }

    // ======================================================
    // VALIDACIONES
    // ======================================================
    private void validarProducto(Producto p) {

        if (p.getNombre() == null || p.getNombre().trim().isEmpty()) {
            throw new IllegalArgumentException("El nombre es obligatorio");
        }

        if (p.getDescripcion() == null || p.getDescripcion().trim().isEmpty()) {
            throw new IllegalArgumentException("La descripción es obligatoria");
        }

        if (p.getPrecio() == null || p.getPrecio() <= 0) {
            throw new IllegalArgumentException("El precio debe ser mayor a 0");
        }

        if (p.getCategoria() == null || p.getCategoria().trim().isEmpty()) {
            throw new IllegalArgumentException("La categoría es obligatoria");
        }
    }
}