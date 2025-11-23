package com.levelup.levelupbackend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.levelup.levelupbackend.model.Destacado;
import com.levelup.levelupbackend.repository.DestacadoRepository;

@Service
public class DestacadoServiceImpl implements DestacadoService {

    private final DestacadoRepository repo;

    public DestacadoServiceImpl(DestacadoRepository repo) {
        this.repo = repo;
    }

    @Override
    public List<Destacado> listar() {
        return repo.findAll();
    }

    @Override
    public Destacado crear(Destacado d) {
        return repo.save(d);
    }

    @Override
    public Destacado actualizar(Long id, Destacado d) {

        Destacado original = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Destacado no encontrado"));

        original.setTitulo(d.getTitulo());
        original.setDescripcion(d.getDescripcion());
        original.setImagen(d.getImagen());

        return repo.save(original);
    }

    @Override
    public void eliminar(Long id) {
        repo.deleteById(id);
    }
}
