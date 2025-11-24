package com.levelup.levelupbackend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.levelup.levelupbackend.model.Banner;
import com.levelup.levelupbackend.repository.BannerRepository;

@Service
public class BannerServiceImpl implements BannerService {

    private final BannerRepository repo;

    public BannerServiceImpl(BannerRepository repo) {
        this.repo = repo;
    }

    @Override
    public List<Banner> listar() {
        return repo.findAll();
    }

    @Override
    public Banner guardar(Banner b) {
        return repo.save(b);
    }

    @Override
    public Banner editar(Long id, Banner up) {

        Banner b = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Banner no encontrado"));

        b.setImagen(up.getImagen());
        b.setTitulo(up.getTitulo());
        b.setDescripcion(up.getDescripcion());
        b.setEnlace(up.getEnlace());
        b.setOrden(up.getOrden());
        b.setActivo(up.getActivo());

        return repo.save(b);
    }

    @Override
    public void eliminar(Long id) {
        repo.deleteById(id);
    }
}
