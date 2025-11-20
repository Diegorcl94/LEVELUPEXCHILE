package com.levelup.levelupbackend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.levelup.levelupbackend.model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    Optional<Usuario> findByEmail(String email);

    boolean existsByEmail(String email);

    void deleteByEmail(String email);

    // NECESARIO PARA RESET PASSWORD
    Optional<Usuario> findByResetToken(String resetToken);
}