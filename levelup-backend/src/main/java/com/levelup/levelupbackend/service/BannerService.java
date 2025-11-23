package com.levelup.levelupbackend.service;

import java.util.List;

import com.levelup.levelupbackend.model.Banner;

public interface BannerService {

    List<Banner> listar();
    Banner crear(Banner b);
    Banner actualizar(Long id, Banner b);
    void eliminar(Long id);
}
