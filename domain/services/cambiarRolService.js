// application/services/cambiarRolService.js
const MongoUsuarioRepository = require('../../infrastructure/repositories/MongoUsuarioRepository');
const Usuario = require('../../domain/entities/Usuario');

class CambiarRolService {
    async cambiarRol(email, nuevoRol, nuevoDepartamento) {
        const usuarioRepository = new MongoUsuarioRepository();
        const usuario = await usuarioRepository.findByEmail(email);

        if (!usuario) {
            return { error: 'Usuario no encontrado' };
        }

        usuario.rol = nuevoRol;
        usuario.departamento = nuevoDepartamento || usuario.departamento;

        await usuarioRepository.update(usuario);

        return usuario;
    }
}

module.exports = CambiarRolService;
