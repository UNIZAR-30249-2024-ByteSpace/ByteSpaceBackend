// domain/entities/Usuario.js
const Departamento = require('../Value_Objects/Departamento');
const Rol = require('../Value_Objects/Rol');

class Usuario {
    constructor({ id, username, email, password, rol, departamento }) {
        this._id = id;
        this._username = username;
        this._email = email;
        this._password = password;
        this._rol = new Rol(rol).getNombre();
        this._departamento = departamento ? new Departamento(departamento).getNombre() : null; // Manejar caso nulo
    }

    get id() {
        return this._id;
    }

    set id(newId) {
        this._id = newId;
    }

    get username() {
        return this._username;
    }

    set username(newUsername) {
        this._username = newUsername;
    }

    get email() {
        return this._email;
    }

    set email(newEmail) {
        this._email = newEmail;
    }

    get password() {
        return this._password;
    }

    set password(newPassword) {
        this._password = newPassword;
    }

    get rol() {
        return this._rol;
    }

    set rol(newRol) {
        this._rol = newRol;
    }

    get departamento() {
        return this._departamento;
    }

    set departamento(newDepartamento) {
        this._departamento = newDepartamento;
    }
}

module.exports = Usuario;
