package com.levelup.levelupbackend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.levelup.levelupbackend.model.Compra;
import com.levelup.levelupbackend.repository.CompraRepository;

@Service
public class CompraServiceImpl implements CompraService {

    private final CompraRepository repo;

    public CompraServiceImpl(CompraRepository repo) {
        this.repo = repo;
    }

    @Override
    public Compra guardar(Compra compra) {
        return repo.save(compra);
    }

    @Override
    public List<Compra> obtenerPorUsuario(String email) {
        return repo.findByUsuarioEmail(email);
    }
}