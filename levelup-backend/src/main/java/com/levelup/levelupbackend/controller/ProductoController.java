package com.levelup.levelupbackend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.levelup.levelupbackend.model.Producto;
import com.levelup.levelupbackend.service.ProductoService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/productos")
@CrossOrigin(origins = "*")
@Tag(name = "Productos", description = "CRUD de productos")
public class ProductoController {

    private final ProductoService service;

    public ProductoController(ProductoService service) {
        this.service = service;
    }

    // ====================================
    // LISTAR (PÚBLICO)
    // ====================================
    @Operation(summary = "Listar productos", description = "Obtiene la lista completa de productos")
    @GetMapping("/listar")
    public ResponseEntity<List<Producto>> listar() {
        return ResponseEntity.ok(service.listar());
    }

    // ====================================
    // CREAR (ADMIN)
    // ====================================
    @Operation(summary = "Crear producto", description = "Solo ADMIN puede crear productos")
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/crear")
    public ResponseEntity<?> crear(@RequestBody Producto p) {
        try {
            return ResponseEntity.ok(service.crear(p));
        } catch (Exception ex) {
            return ResponseEntity.badRequest().body("Error al crear el producto");
        }
    }

    // ====================================
    // EDITAR (ADMIN)
    // ====================================
    @Operation(summary = "Editar producto", description = "Solo ADMIN puede editar productos")
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/editar/{id}")
    public ResponseEntity<?> editar(@PathVariable Long id, @RequestBody Producto p) {
        try {
            return ResponseEntity.ok(service.actualizar(id, p));
        } catch (Exception ex) {
            return ResponseEntity.status(404).body("Producto no encontrado");
        }
    }

    // ====================================
    // ELIMINAR (ADMIN)
    // ====================================
    @Operation(summary = "Eliminar producto", description = "Solo ADMIN puede eliminar productos")
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<?> eliminar(@PathVariable Long id) {
        try {
            service.eliminar(id);
            return ResponseEntity.ok("Producto eliminado con éxito");
        } catch (Exception ex) {
            return ResponseEntity.status(404).body("Producto no encontrado");
        }
    }
}