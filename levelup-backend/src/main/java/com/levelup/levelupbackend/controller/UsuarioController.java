package com.levelup.levelupbackend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.levelup.levelupbackend.model.Usuario;
import com.levelup.levelupbackend.repository.UsuarioRepository;
import com.levelup.levelupbackend.service.UsuarioService;
import org.springframework.security.crypto.password.PasswordEncoder;
import java.util.Map;


@RestController
@RequestMapping("/usuarios")
@CrossOrigin("*")
public class UsuarioController {

    private final UsuarioService usuarioService;
    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public UsuarioController(
            UsuarioService usuarioService,
            UsuarioRepository usuarioRepository,
            PasswordEncoder passwordEncoder) {

        this.usuarioService = usuarioService;
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // ====================================================
    // 1) ACTUALIZAR PERFIL (nombre, apellido, sexo, domicilio, foto)
    // ====================================================
    @PutMapping("/actualizar")
    public ResponseEntity<?> actualizarPerfil(Authentication auth, @RequestBody Usuario datos) {

        String email = auth.getName();
        Usuario u = usuarioService.obtenerPorEmail(email);

        u.setNombre(datos.getNombre());
        u.setApellido(datos.getApellido());
        u.setSexo(datos.getSexo());
        u.setDomicilio(datos.getDomicilio());
        u.setFotoPerfil(datos.getFotoPerfil());

        usuarioRepository.save(u);
        return ResponseEntity.ok("Perfil actualizado con éxito");
    }

    // ====================================================
    // 2) CAMBIAR CONTRASEÑA
    // ====================================================
    @PutMapping("/cambiar-password")
    public ResponseEntity<?> cambiarPassword(Authentication auth, @RequestBody Map<String, String> request) {

        String email = auth.getName();
        Usuario u = usuarioService.obtenerPorEmail(email);

        String nueva = request.get("password");

        if (nueva == null || nueva.isBlank()) {
            return ResponseEntity.badRequest().body("Contraseña inválida");
        }

        u.setPassword(passwordEncoder.encode(nueva));
        usuarioRepository.save(u);

        return ResponseEntity.ok("Contraseña cambiada correctamente");
    }

    // ====================================================
    // 3) ELIMINAR CUENTA
    // ====================================================
    @DeleteMapping("/eliminar")
    public ResponseEntity<?> eliminarCuenta(Authentication auth) {

        String email = auth.getName();
        Usuario u = usuarioService.obtenerPorEmail(email);

        usuarioRepository.delete(u);

        return ResponseEntity.ok("Cuenta eliminada");
    }
}