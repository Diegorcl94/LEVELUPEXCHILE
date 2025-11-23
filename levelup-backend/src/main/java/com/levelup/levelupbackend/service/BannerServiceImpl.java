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
        return repo.findAllByOrderByOrdenAsc();
    }

    @Override
    public Banner crear(Banner b) {
        return repo.save(b);
    }

    @Override
    public Banner actualizar(Long id, Banner b) {
        Banner original = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Banner no encontrado"));

        original.setTitulo(b.getTitulo());
        original.setDescripcion(b.getDescripcion());
        original.setImagen(b.getImagen());
        original.setActivo(b.getActivo());
        original.setOrden(b.getOrden());

        return repo.save(original);
    }

    @Override
    public void eliminar(Long id) {
        repo.deleteById(id);
    }
}
