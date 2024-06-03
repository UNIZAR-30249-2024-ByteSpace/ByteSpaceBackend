// application/services/iniciarSesionService.js
const MongoUsuarioRepository = require('../../infrastructure/repositories/MongoUsuarioRepository');
const Usuario = require('../../domain/entities/Usuario');

class IniciarSesionService {
    async iniciarSesion(username, password) {
        const usuarioRepository = new MongoUsuarioRepository();
        const usuario = await usuarioRepository.findByUsername(username);

        if (!usuario) {
            return { error: 'Usuario no encontrado' };
        }

        if (usuario.password !== password) {
            return { error: 'Contraseña incorrecta' };
        }

        return usuario;
    }
}

module.exports = IniciarSesionService;
