package com.levelup.levelupbackend.service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.levelup.levelupbackend.model.Producto;
import com.levelup.levelupbackend.repository.ProductoRepository;

@Service
public class ProductoService {

    @Autowired
    private ProductoRepository productoRepository;

    // GET ALL
    public List<Producto> getAll() {
        return productoRepository.findAll();
    }

    // GET BY ID
    public Optional<Producto> getById(Long id) {
        return productoRepository.findById(id);
    }

    // POST
    public Producto create(Producto producto) {
        return productoRepository.save(producto);
    }

    // PUT
    public Optional<Producto> update(Long id, Producto nuevo) {
        return productoRepository.findById(id).map(producto -> {
            producto.setNombre(nuevo.getNombre());
            producto.setDescripcion(nuevo.getDescripcion());
            producto.setPrecio(nuevo.getPrecio());
            producto.setImagen(nuevo.getImagen());
            producto.setCategoria(nuevo.getCategoria());

            return productoRepository.save(producto);
        });
    }

    // PATCH
    public Optional<Producto> patch(Long id, Map<String, Object> cambios) {
        return productoRepository.findById(id).map(producto -> {

            cambios.forEach((key, value) -> {
                switch (key) {
                    case "nombre":
                        producto.setNombre((String) value);
                        break;
                    case "descripcion":
                        producto.setDescripcion((String) value);
                        break;
                    case "precio":
                        producto.setPrecio((Integer) value);
                        break;
                    case "imagen":
                        producto.setImagen((String) value);
                        break;
                    case "categoria":
                        producto.setCategoria((String) value);
                        break;
                }
            });

            return productoRepository.save(producto);
        });
    }

    // DELETE
    public boolean delete(Long id) {
        if (!productoRepository.existsById(id)) return false;
        productoRepository.deleteById(id);
        return true;
    }
}
