package com.levelup.levelupbackend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.levelup.levelupbackend.model.Producto;
import com.levelup.levelupbackend.repository.ProductoRepository;

@RestController
@RequestMapping("/api/productos")
@CrossOrigin(origins = "*")
public class ProductoController {

    @Autowired
    private ProductoRepository productoRepository;

    // Listar todos los productos
    @GetMapping
    public List<Producto> listarProductos() {
        return productoRepository.findAll();
    }

    // Agregar un producto nuevo
    @PostMapping
    public Producto agregarProducto(@RequestBody Producto producto) {
        return productoRepository.save(producto);
    }

    // Eliminar un producto por ID
    @DeleteMapping("/{id}")
    public void eliminarProducto(@PathVariable Long id) {
        productoRepository.deleteById(id);
    }

    @GetMapping("/test")
    public String testConexion() {
    return "✅ Backend funcionando correctamente en /api/productos";
}

}