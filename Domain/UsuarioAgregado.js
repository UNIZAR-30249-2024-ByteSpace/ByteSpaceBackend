// Entidad usuario
// Entidad raíz
const Usuario = require('./Usuario');
const Departamento = require('./Departamento');
const Rol = require('./Rol');

class UsuarioAgregado {
    constructor(usuario) {
        this._usuario = new Usuario(usuario);
        this._rol = new Rol(usuario.rol).getNombre();
        console.log("Entro" )
        this._departamento = usuario.departamento ? new Departamento(usuario.departamento).getNombre() : null; // Manejar caso nulo
        console.log("Salgo")
    }

    get id() {
        return this._usuario._id;
    }

    set id(newId) {
        this._usuario._id = newId;
    }

    get username() {
        return this._usuario._username;
    }

    get usuario() {
        return this._usuario;
    }

    set usuario(newUsuario) {
        this._usuario = newUsuario;
    }

    set username(newUsername) {
        this._usuario._username = newUsername;
    }

    get email() {
        return this._usuario._email;
    }

    set email(newEmail) {
        this._usuario._email = newEmail;
    }

    get password() {
        return this._usuario._password;
    }

    set password(newPassword) {
        this._usuario._password = newPassword;
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

    toUserDTO() {
        return {
            _id: this.usuario.id,
            _username: this.usuario.username,
            _email: this.usuario.email,
            _rol: this.rol,
            _departamento: this.departamento,
            _token: this.usuario.token,
        };
    }
}

module.exports = UsuarioAgregado;
