package com.levelup.levelupbackend.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.levelup.levelupbackend.model.Usuario;
import com.levelup.levelupbackend.repository.UsuarioRepository;
import com.levelup.levelupbackend.security.JwtUtil;
import com.levelup.levelupbackend.service.UsuarioService;

@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
public class AuthController {

    private final UsuarioService usuarioService;
    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthController(UsuarioService usuarioService, UsuarioRepository usuarioRepository,
                          PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.usuarioService = usuarioService;
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Usuario usuario) {
        try {
            usuario.setRol("USER");
            Usuario nuevo = usuarioService.registrar(usuario);

            String roleFormatted = "ROLE_USER";

            UserDetails userDetails = User.builder()
                    .username(nuevo.getEmail())
                    .password(nuevo.getPassword())
                    .authorities(roleFormatted)
                    .build();

            String token = jwtUtil.generateToken(userDetails);

            Map<String, Object> res = new HashMap<>();
            res.put("token", token);
            res.put("email", nuevo.getEmail());
            res.put("rol", roleFormatted);

            return ResponseEntity.ok(res);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error al registrar usuario");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {

        String email = body.get("email");
        String password = body.get("password");

        try {
            Usuario usuario = usuarioService.obtenerPorEmail(email);

            if (!passwordEncoder.matches(password, usuario.getPassword())) {
                return ResponseEntity.status(401).body(Map.of("error", "Credenciales inválidas"));
            }

            // AQUI SE ARREGLA: AGREGAR ROLE_
            String roleFormatted = "ROLE_" + usuario.getRol().toUpperCase();

            UserDetails userDetails = User.builder()
                    .username(usuario.getEmail())
                    .password(usuario.getPassword())
                    .authorities(roleFormatted)
                    .build();

            String token = jwtUtil.generateToken(userDetails);

            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("email", usuario.getEmail());
            response.put("rol", roleFormatted);

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.status(401).body(Map.of("error", "Credenciales inválidas"));
        }
    }

    @GetMapping("/perfil")
    public ResponseEntity<?> perfil(org.springframework.security.core.Authentication auth) {
        Usuario u = usuarioService.obtenerPorEmail(auth.getName());
        return ResponseEntity.ok(u);
    }
}
