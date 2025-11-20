package com.levelup.levelupbackend.service;

import com.levelup.levelupbackend.model.Usuario;

public interface UsuarioService {

    Usuario registrar(Usuario u);

    Usuario login(String email, String password);

    Usuario obtenerPorEmail(String email);

    Usuario actualizarDatos(String email, Usuario datosActualizados);

    void cambiarPassword(String email, String actual, String nueva);

    void resetPassword(String email, String nuevaPassword);

    void eliminar(String email);
}
