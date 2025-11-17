package com.levelup.levelupbackend.service;

import com.levelup.levelupbackend.model.Usuario;
import com.levelup.levelupbackend.repository.UsuarioRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UsuarioServiceImpl implements UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public UsuarioServiceImpl(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    public Usuario registrar(Usuario user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRol("USER");
        return usuarioRepository.save(user);
    }

    @Override
    public Usuario obtenerPorEmail(String email) {
        return usuarioRepository.findByEmail(email).orElse(null);
    }
}