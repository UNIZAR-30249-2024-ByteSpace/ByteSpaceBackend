// src/domain/entities/Usuario.js

class Usuario {
    constructor({
      id,
      username,
      email,
      password,
      rol,
      departamento
    }) {
      this.id = id;
      this.username = username;
      this.email = email;
      this.password = password;
      this.rol = rol;
      this.departamento = departamento;
    }
  }
  
  module.exports = Usuario;
  