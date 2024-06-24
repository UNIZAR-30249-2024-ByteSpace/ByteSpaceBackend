// Entidad usuario

const Departamento = require('./Departamento');
const Rol = require('./Rol');

class Usuario {
    constructor(usuario) {
        this._id = usuario.id;
        this._username = usuario.username;
        this._email = usuario.email;
        this._password = usuario.password;
        //this._rol = new Rol(rol).getNombre();
        //1this._departamento = departamento ? new Departamento(departamento).getNombre() : null; // Manejar caso nulo
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
