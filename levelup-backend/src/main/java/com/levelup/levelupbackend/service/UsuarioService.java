package com.levelup.levelupbackend.service;

import com.levelup.levelupbackend.model.Usuario;

public interface UsuarioService {
    Usuario registrar(Usuario u);
    Usuario login(String email, String password);
    Usuario obtenerPorEmail(String email);
}