package com.levelup.levelupbackend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.levelup.levelupbackend.model.Compra;
import com.levelup.levelupbackend.repository.CompraRepository;

@Service
public class CompraServiceImpl implements CompraService {

    private final CompraRepository compraRepository;

    public CompraServiceImpl(CompraRepository compraRepository) {
        this.compraRepository = compraRepository;
    }

    @Override
    public Compra guardar(Compra compra) {
        return compraRepository.save(compra);
    }

    @Override
    public List<Compra> obtenerPorUsuario(String email) {
        return compraRepository.findByEmail(email);
    }

    @Override
    public void eliminarComprasDeUsuario(String email) {
        compraRepository.deleteByEmail(email);
    }
}