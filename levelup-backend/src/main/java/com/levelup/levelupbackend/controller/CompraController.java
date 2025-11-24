package com.levelup.levelupbackend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.levelup.levelupbackend.model.Compra;
import com.levelup.levelupbackend.service.CompraService;

@RestController
@RequestMapping("/compras")
@CrossOrigin(origins = "*")
public class CompraController {

    private final CompraService service;

    public CompraController(CompraService service) {
        this.service = service;
    }

    @PostMapping("/guardar")
    public ResponseEntity<?> guardar(@RequestBody Compra compra) {
        return ResponseEntity.ok(service.guardar(compra));
    }

    @GetMapping("/usuario/{email}")
    public ResponseEntity<?> historial(@PathVariable String email) {
        return ResponseEntity.ok(service.obtenerPorUsuario(email));
    }
}
