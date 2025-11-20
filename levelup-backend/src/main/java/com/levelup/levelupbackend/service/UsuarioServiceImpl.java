package com.levelup.levelupbackend.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.levelup.levelupbackend.model.Usuario;
import com.levelup.levelupbackend.repository.UsuarioRepository;

@Service
public class UsuarioServiceImpl implements UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public UsuarioServiceImpl(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public Usuario registrar(Usuario usuario) {
        usuario.setEmail(usuario.getEmail().trim().toLowerCase());

        if (usuarioRepository.existsByEmail(usuario.getEmail())) {
            throw new IllegalArgumentException("El email ya existe");
        }

        if (usuario.getRol() == null || usuario.getRol().isEmpty()) {
            usuario.setRol("USER");
        }

        usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));

        return usuarioRepository.save(usuario);
    }

    @Override
    public Usuario login(String email, String password) {
        email = email.trim().toLowerCase();

        Usuario u = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        if (!passwordEncoder.matches(password, u.getPassword())) {
            throw new RuntimeException("Contraseña incorrecta");
        }

        return u;
    }

    @Override
    public Usuario obtenerPorEmail(String email) {
        return usuarioRepository.findByEmail(email.toLowerCase())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
    }

    @Override
    public Usuario actualizarDatos(String email, Usuario datos) {

        Usuario u = obtenerPorEmail(email);

        u.setNombre(datos.getNombre());
        u.setApellido(datos.getApellido());
        u.setSexo(datos.getSexo());
        u.setDomicilio(datos.getDomicilio());
        u.setFotoPerfil(datos.getFotoPerfil());

        return usuarioRepository.save(u);
    }

    @Override
    public void cambiarPassword(String email, String actual, String nueva) {

        Usuario u = obtenerPorEmail(email);

        if (!passwordEncoder.matches(actual, u.getPassword())) {
            throw new RuntimeException("La contraseña actual no es correcta");
        }

        u.setPassword(passwordEncoder.encode(nueva));
        usuarioRepository.save(u);
    }

    @Override
    public void resetPassword(String email, String nuevaPassword) {
        Usuario u = obtenerPorEmail(email);

        u.setPassword(passwordEncoder.encode(nuevaPassword));
        usuarioRepository.save(u);
    }

    @Override
    public void eliminar(String email) {
        usuarioRepository.deleteByEmail(email.toLowerCase());
    }
}