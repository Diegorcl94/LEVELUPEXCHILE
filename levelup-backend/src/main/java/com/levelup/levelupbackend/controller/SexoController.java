package com.levelup.levelupbackend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.levelup.levelupbackend.model.Sexo;
import com.levelup.levelupbackend.repository.SexoRepository;

@RestController
@RequestMapping("/sexos")
@CrossOrigin("*")
public class SexoController {

    private final SexoRepository sexoRepository;

    public SexoController(SexoRepository sexoRepository) {
        this.sexoRepository = sexoRepository;
    }

    @GetMapping
    public List<Sexo> listar() {
        return sexoRepository.findAll();
    }
}
