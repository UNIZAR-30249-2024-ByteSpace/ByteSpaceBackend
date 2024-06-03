// application/services/usuarioService.js
const MongoUsuarioRepository = require('../../infrastructure/repositories/MongoUsuarioRepository'); // Importa el repositorio de MongoDB
const Usuario = require('../../domain/entities/Usuario');

class UsuarioService {
    constructor() {
        this.usuarioRepository = new MongoUsuarioRepository(); // Utiliza el repositorio de MongoDB
    }

    async iniciarSesion(username, password) {
        const usuario = await this.usuarioRepository.findByUsername(username);

        if (!usuario) {
            return { error: 'Usuario no encontrado' };
        }

        if (usuario.password !== password) {
            return { error: 'Contraseña incorrecta' };
        }

        return usuario;
    }

    async cambiarRol(email, nuevoRol, nuevoDepartamento) {
        const usuario = await this.usuarioRepository.findByEmail(email);

        if (!usuario) {
            return { error: 'Usuario no encontrado' };
        }

        usuario.rol = nuevoRol;
        usuario.departamento = nuevoDepartamento || usuario.departamento;

        await this.usuarioRepository.update(usuario);

        return usuario;
    }
}

module.exports = UsuarioService;
