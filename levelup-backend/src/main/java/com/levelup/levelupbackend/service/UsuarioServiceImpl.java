package com.levelup.levelupbackend.service;

import java.util.Optional;

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

    // ============================================
    // REGISTRAR
    // ============================================
    @Override
    public Usuario registrar(Usuario u) {
        u.setPassword(passwordEncoder.encode(u.getPassword()));
        return usuarioRepository.save(u);
    }

    // ============================================
    // LOGIN
    // ============================================
    @Override
    public Usuario login(String email, String password) {
        Usuario u = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        if (!passwordEncoder.matches(password, u.getPassword())) {
            throw new RuntimeException("Contraseña incorrecta");
        }

        return u;
    }

    // ============================================
    // OBTENER POR EMAIL
    // ============================================
    @Override
    public Usuario obtenerPorEmail(String email) {
        return usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
    }

    // ============================================
    // ACTUALIZAR DATOS PERFIL
    // ============================================
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

    // ============================================
    // CAMBIAR PASSWORD (CON VALIDACIÓN)
    // ============================================
    @Override
    public void cambiarPassword(String email, String actual, String nueva) {
        Usuario u = obtenerPorEmail(email);

        if (!passwordEncoder.matches(actual, u.getPassword())) {
            throw new RuntimeException("Contraseña actual incorrecta");
        }

        u.setPassword(passwordEncoder.encode(nueva));
        usuarioRepository.save(u);
    }

    // ============================================
    // RESET PASSWORD (SIN VALIDAR CONTRASEÑA ACTUAL)
    // ============================================
    @Override
    public void resetPassword(String email, String nuevaPassword) {
        Usuario u = obtenerPorEmail(email);
        u.setPassword(passwordEncoder.encode(nuevaPassword));
        usuarioRepository.save(u);
    }

    // ============================================
    // ELIMINAR (NUNCA LA USAMOS)
    // ============================================
    @Override
    public void eliminar(String email) {
        usuarioRepository.deleteByEmail(email);
    }

    // ============================================
    // ELIMINAR POR EMAIL (LA QUE USA EL PERFIL)
    // ============================================
    @Override
    public void eliminarPorEmail(String email) {
        Optional<Usuario> u = usuarioRepository.findByEmail(email);

        if (u.isPresent()) {
            usuarioRepository.delete(u.get());
        } else {
            throw new RuntimeException("Usuario no encontrado");
        }
    }
}
