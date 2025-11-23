package com.levelup.levelupbackend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.levelup.levelupbackend.model.Destacado;
import com.levelup.levelupbackend.service.DestacadoService;

import java.util.List;

@RestController
@RequestMapping("/destacados")
@CrossOrigin("*")
public class DestacadoController {

    private final DestacadoService service;

    public DestacadoController(DestacadoService service) {
        this.service = service;
    }

    @GetMapping("/listar")
    public ResponseEntity<List<Destacado>> listar() {
        return ResponseEntity.ok(service.listar());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/crear")
    public ResponseEntity<?> crear(@RequestBody Destacado d) {
        return ResponseEntity.ok(service.crear(d));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/editar/{id}")
    public ResponseEntity<?> editar(@PathVariable Long id, @RequestBody Destacado d) {
        return ResponseEntity.ok(service.actualizar(id, d));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<?> eliminar(@PathVariable Long id) {
        service.eliminar(id);
        return ResponseEntity.ok("Destacado eliminado");
    }
}
