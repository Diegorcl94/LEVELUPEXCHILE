package com.levelup.levelupbackend.service;

import java.util.List;

import com.levelup.levelupbackend.model.Blog;

public interface BlogService {
    List<Blog> listar();
    Blog crear(Blog b);
    Blog actualizar(Long id, Blog b);
    void eliminar(Long id);
}
