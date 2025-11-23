package com.levelup.levelupbackend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.levelup.levelupbackend.model.Blog;
import com.levelup.levelupbackend.repository.BlogRepository;

@Service
public class BlogServiceImpl implements BlogService {

    private final BlogRepository repo;

    public BlogServiceImpl(BlogRepository repo) {
        this.repo = repo;
    }

    @Override
    public List<Blog> listar() {
        return repo.findAll();
    }

    @Override
    public Blog crear(Blog b) {
        return repo.save(b);
    }

    @Override
    public Blog actualizar(Long id, Blog b) {
        Blog original = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Blog no encontrado"));

        original.setTitulo(b.getTitulo());
        original.setDescripcion(b.getDescripcion());
        original.setImagen(b.getImagen());

        return repo.save(original);
    }

    @Override
    public void eliminar(Long id) {
        repo.deleteById(id);
    }
}
