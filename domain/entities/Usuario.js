  // domain/entities/usuario.js
const Departamento = require('../value-objects/departamento');
const Rol = require('../value-objects/rol');

class Usuario {
    constructor({ id, username, email, password, rol, departamento }) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.rol = new Rol(rol);
        this.departamento = new Departamento(departamento);
    }
}

module.exports = Usuario;

  