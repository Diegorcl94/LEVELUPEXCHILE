package com.levelup.levelupbackend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "usuarios")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nombre;

    @Column(nullable = false)
    private String apellido;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false, length = 150)
    private String password;

    // NUEVO → FK a la tabla sexos
    @Column(name = "sexo_id")
    private Long sexoId;

    // Se elimina porque ahora usaremos la tabla direcciones
    // private String domicilio;

    private String fotoPerfil;

    @Column(nullable = false)
    private String rol;

    // =============== RESET PASSWORD ===============
    private String resetToken;
    private Long resetTokenExpira;

    public Usuario() {}

    // ==== GETTERS & SETTERS ====

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getApellido() { return apellido; }
    public void setApellido(String apellido) { this.apellido = apellido; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public Long getSexoId() { return sexoId; }
    public void setSexoId(Long sexoId) { this.sexoId = sexoId; }

    public String getFotoPerfil() { return fotoPerfil; }
    public void setFotoPerfil(String fotoPerfil) { this.fotoPerfil = fotoPerfil; }

    public String getRol() { return rol; }
    public void setRol(String rol) { this.rol = rol; }

    public String getResetToken() { return resetToken; }
    public void setResetToken(String resetToken) { this.resetToken = resetToken; }

    public Long getResetTokenExpira() { return resetTokenExpira; }
    public void setResetTokenExpira(Long resetTokenExpira) { this.resetTokenExpira = resetTokenExpira; }
}
