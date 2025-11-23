package com.levelup.levelupbackend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.levelup.levelupbackend.model.Evento;
import com.levelup.levelupbackend.repository.EventoRepository;

@Service
public class EventoServiceImpl implements EventoService {

    private final EventoRepository repo;

    public EventoServiceImpl(EventoRepository repo) {
        this.repo = repo;
    }

    @Override
    public List<Evento> listar() {
        return repo.findAll();
    }

    @Override
    public Evento crear(Evento e) {
        return repo.save(e);
    }

    @Override
    public Evento actualizar(Long id, Evento e) {
        Evento original = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Evento no encontrado"));

        original.setTitulo(e.getTitulo());
        original.setDescripcion(e.getDescripcion());
        original.setImagen(e.getImagen());
        original.setFechaEvento(e.getFechaEvento());
        original.setLugar(e.getLugar());

        return repo.save(original);
    }

    @Override
    public void eliminar(Long id) {
        repo.deleteById(id);
    }
}
