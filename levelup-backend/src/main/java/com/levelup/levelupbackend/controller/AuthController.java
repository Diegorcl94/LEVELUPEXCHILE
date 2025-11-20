package com.levelup.levelupbackend.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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

    // ============================================================
    // REGISTER
    // ============================================================
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Usuario usuario) {
        try {
            usuario.setRol("USER");
            Usuario nuevo = usuarioService.registrar(usuario);

            UserDetails userDetails = User.builder()
                    .username(nuevo.getEmail())
                    .password(nuevo.getPassword())
                    .roles("USER")
                    .build();

            String token = jwtUtil.generateToken(userDetails);

            Map<String, Object> res = new HashMap<>();
            res.put("token", token);
            res.put("email", nuevo.getEmail());
            res.put("rol", "USER");

            return ResponseEntity.ok(res);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error al registrar usuario");
        }
    }

    // ============================================================
    // LOGIN
    // ============================================================
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

            Map<String, Object> map = new HashMap<>();
            map.put("token", token);
            map.put("email", u.getEmail());
            map.put("rol", u.getRol());

            return ResponseEntity.ok(map);

        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales inválidas");
        }
    }

    // ============================================================
    // PERFIL
    // ============================================================
    @GetMapping("/perfil")
    public ResponseEntity<?> perfil(Authentication auth) {
        Usuario u = usuarioService.obtenerPorEmail(auth.getName());
        return ResponseEntity.ok(u);
    }

    // ============================================================
    // FORGOT PASSWORD (envío de token)
    // ============================================================
    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> body) {

        String email = body.get("email");

        try {
            Usuario u = usuarioService.obtenerPorEmail(email);

            String token = java.util.UUID.randomUUID().toString();

            u.setResetToken(token);
            u.setResetTokenExpira(System.currentTimeMillis() + (1000 * 60 * 15)); // 15 min
            usuarioRepository.save(u);

            System.out.println("LINK RECUPERACIÓN:");
            System.out.println("http://localhost:5173/reset-password?token=" + token);

        } catch (Exception ex) {
            // Nunca revelar si el correo existe o no.
        }

        return ResponseEntity.ok("Si el correo existe, enviaremos instrucciones");
    }

    // ============================================================
    // RESET PASSWORD (con token)
    // ============================================================
    @PutMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> body) {

        String token = body.get("token");
        String nueva = body.get("password");

        Usuario u = usuarioRepository.findByResetToken(token)
                .orElseThrow(() -> new RuntimeException("Token inválido"));

        if (u.getResetTokenExpira() < System.currentTimeMillis()) {
            return ResponseEntity.status(400).body("El token ha expirado");
        }

        u.setPassword(passwordEncoder.encode(nueva));
        u.setResetToken(null);
        u.setResetTokenExpira(null);
        usuarioRepository.save(u);

        return ResponseEntity.ok("Contraseña cambiada con éxito");
    }
}