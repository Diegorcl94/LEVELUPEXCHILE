package com.levelup.levelupbackend.service;

import com.levelup.levelupbackend.model.Usuario;

public interface UsuarioService {
    Usuario registrar(Usuario user);
    Usuario obtenerPorEmail(String email);
}