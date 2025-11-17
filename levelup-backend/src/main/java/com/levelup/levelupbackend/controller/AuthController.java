package com.levelup.levelupbackend.controller;

import com.levelup.levelupbackend.model.Usuario;
import com.levelup.levelupbackend.security.JwtUtil;
import com.levelup.levelupbackend.service.UsuarioServiceImpl;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin
public class AuthController {

    private final UsuarioServiceImpl usuarioService;
    private final JwtUtil jwtUtil;

    public AuthController(UsuarioServiceImpl usuarioService, JwtUtil jwtUtil) {
        this.usuarioService = usuarioService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/register")
    public Usuario register(@RequestBody Usuario user) {
        return usuarioService.registrar(user);
    }

    @PostMapping("/login")
    public String login(@RequestBody Usuario user) {
        Usuario u = usuarioService.obtenerPorEmail(user.getEmail());

        if (u == null) return "Usuario no encontrado";

        return jwtUtil.generarToken(u.getEmail());
    }
}