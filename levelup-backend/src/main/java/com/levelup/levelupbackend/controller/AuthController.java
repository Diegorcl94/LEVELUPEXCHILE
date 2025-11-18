package com.levelup.levelupbackend.controller;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.levelup.levelupbackend.model.Usuario;
import com.levelup.levelupbackend.security.JwtUtil;
import com.levelup.levelupbackend.service.UsuarioService;

@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
public class AuthController {

    private final UsuarioService usuarioService;
    private final JwtUtil jwtUtil;
    private final Logger logger = LoggerFactory.getLogger(AuthController.class);

    public AuthController(UsuarioService usuarioService, JwtUtil jwtUtil) {
        this.usuarioService = usuarioService;
        this.jwtUtil = jwtUtil;
    }

    // ====================================
    //  REGISTRO
    // ====================================
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Usuario usuario) {

        try {
            usuario.setRol("USER");  // ← IMPORTANTE, guardar rol siempre
            Usuario nuevo = usuarioService.registrar(usuario);

            UserDetails userDetails = User.builder()
                    .username(nuevo.getEmail())
                    .password(nuevo.getPassword())
                    .roles("USER")
                    .build();

            String token = jwtUtil.generateToken(userDetails);

            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("email", nuevo.getEmail());
            response.put("rol", "USER");

            return ResponseEntity.ok(response);

        } catch (Exception ex) {
            logger.error("Error en registro: {}", ex.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error al registrar el usuario");
        }
    }

    // ====================================
    //  LOGIN
    // ====================================
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Usuario usuario) {

        try {
            Usuario u = usuarioService.login(usuario.getEmail(), usuario.getPassword());

            UserDetails userDetails = User.builder()
                    .username(u.getEmail())
                    .password(u.getPassword())
                    .roles(u.getRol())
                    .build();

            String token = jwtUtil.generateToken(userDetails);

            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("email", u.getEmail());
            response.put("rol", u.getRol());

            return ResponseEntity.ok(response);

        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales inválidas");
        }
    }

    // ====================================
    //  PERFIL
    // ====================================
    @GetMapping("/perfil")
    public ResponseEntity<?> perfil(Authentication auth) {

        String email = auth.getName();
        Usuario u = usuarioService.obtenerPorEmail(email);

        Map<String, Object> response = new HashMap<>();
        response.put("email", u.getEmail());
        response.put("nombre", u.getNombre());
        response.put("rol", u.getRol());

        return ResponseEntity.ok(response);
    }
}