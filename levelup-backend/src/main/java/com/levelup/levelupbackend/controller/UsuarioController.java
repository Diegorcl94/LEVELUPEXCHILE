package com.levelup.levelupbackend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.levelup.levelupbackend.model.Usuario;
import com.levelup.levelupbackend.service.UsuarioService;

@RestController
@RequestMapping("/api/usuario")
@CrossOrigin("*")
public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    // ===========================
    // ACTUALIZAR PERFIL
    // ===========================
    @PutMapping("/{email}")
    public ResponseEntity<?> actualizarPerfil(
            @PathVariable String email,
            @RequestBody Usuario datos) {

        Usuario u = usuarioService.actualizarDatos(email, datos);
        return ResponseEntity.ok(u);
    }

    // ===========================
    // CAMBIAR PASSWORD
    // ===========================
    @PutMapping("/{email}/password")
    public ResponseEntity<?> cambiarPassword(
            @PathVariable String email,
            @RequestBody(required = true) PasswordDTO body) {

        usuarioService.resetPassword(email, body.getNueva());
        return ResponseEntity.ok("Contraseña actualizada correctamente");
    }

    // DTO usado para recibir { nueva: "" }
    public static class PasswordDTO {
        private String nueva;
        public String getNueva() { return nueva; }
        public void setNueva(String nueva) { this.nueva = nueva; }
    }

    // ===========================
    // ELIMINAR USUARIO
    // ===========================
    @DeleteMapping("/{email}")
    public ResponseEntity<?> eliminarCuenta(@PathVariable String email) {

        usuarioService.eliminarPorEmail(email);
        return ResponseEntity.ok("Cuenta eliminada correctamente");
    }
}
