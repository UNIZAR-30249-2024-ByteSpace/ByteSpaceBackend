const jwt = require('jsonwebtoken');
const MongoUsuarioRepository = require('../../Infrastructure/Repositories/MongoUsuarioRepository');
const Usuario = require('../../Domain/Model/Usuario.js');

class UsuarioService {
    constructor() {
        this.usuarioRepository = new MongoUsuarioRepository();
    }

    validarEmail(email) {
        return email.match(
            /^(([^<>()\[\]\.,;:\s@"]+(.[^<>()\[\]\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    }

    async iniciarSesion(username, password) {
        if (!this.validarEmail(username)) {
            throw new Error('Formato de email no válido.');
        }

        const usuarioData = await this.usuarioRepository.findByEmail(username);
        if (!usuarioData) {
            throw new Error('Usuario no encontrado');
        }

        const usuario = new Usuario(usuarioData);

        if (usuario.password !== password) {
            throw new Error('El email o la contraseña no son correctas');
        }

        const jwtToken = jwt.sign(
            { idUsuario: usuario.id, email: usuario.email },
            'clavesecreta',
            { expiresIn: '1h' }
        );

        return {
            username: usuario.username,
            email: usuario.email,
            id: usuario.id,
            rol: usuario.rol,
            departamento: usuario.departamento,
            token: jwtToken,
        };
    }

    async cambiarRol(email, nuevoRol, nuevoDepartamento) {
        if (!this.validarEmail(email)) {
            throw new Error('Formato de email no válido.');
        }

        const usuarioData = await this.usuarioRepository.findByEmail(email);
        if (!usuarioData) {
            throw new Error('Usuario no encontrado');
        }

        const usuario = new Usuario(usuarioData);

        if (['estudiante', 'conserje', 'gerente'].includes(nuevoRol)) {
            usuario.rol = nuevoRol;
            usuario.departamento = null;
        } else if (nuevoDepartamento !== undefined) {
            if (nuevoDepartamento !== 'informática e ingeniería de sistemas' && nuevoDepartamento !== 'ingeniería electrónica y comunicaciones') {
                throw new Error('El nuevo departamento es inválido.');
            }
            usuario.rol = nuevoRol;
            usuario.departamento = nuevoDepartamento;
        } else {
            throw new Error('Este cambio de rol requiere de un nuevo departamento.');
        }

        await this.usuarioRepository.update(usuario);

        return {
            message: 'Rol y departamento actualizados con éxito',
            email: usuario.email,
            nuevoRol: usuario.rol,
            nuevoDepartamento: usuario.departamento,
        };
    }
}

module.exports = UsuarioService;
