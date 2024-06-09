// domain/entities/Usuario.js
const Departamento = require('../Value_Objects/Departamento');
const Rol = require('../Value_Objects/Rol');

class Usuario {
    constructor({ id, username, email, password, rol, departamento }) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.rol = new Rol(rol).getNombre();
        this.departamento = departamento ? new Departamento(departamento).getNombre() : null; // Manejar caso nulo
    }
}

module.exports = Usuario;
