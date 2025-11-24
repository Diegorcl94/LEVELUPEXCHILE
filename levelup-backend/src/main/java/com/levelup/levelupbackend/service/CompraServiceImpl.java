package com.levelup.levelupbackend.service;

import java.time.LocalDate;
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
    public Compra guardar(Compra c) {
        c.setFecha(LocalDate.now().toString());
        return repo.save(c);
    }

    @Override
    public List<Compra> obtenerPorUsuario(String email) {
        return repo.findByUsuarioEmail(email);  // ✔ FIX
    }

    @Override
    public void eliminarComprasDeUsuario(String email) {
        List<Compra> compras = repo.findByUsuarioEmail(email);
        repo.deleteAll(compras);
    }
}
