const UsuarioModelo = require('../models/modelo.usuario');
const Usuario = require('../../Domain/Model/Usuario');
const UsuarioRepository = require('../../Domain/Repositories/UsuarioRepository');

class MongoUsuarioRepository extends UsuarioRepository {
    async findByEmail(email) {
        const usuarioDoc = await UsuarioModelo.findOne({ email });
        return usuarioDoc ? new Usuario(usuarioDoc.toObject()) : null;
    }

    async findById(id) {
        const usuarioDoc = await UsuarioModelo.findOne({ id });
        return usuarioDoc ? new Usuario(usuarioDoc.toObject()) : null;
    }

    async update(usuario) {
        const usuarioDoc = await UsuarioModelo.findOneAndUpdate(
            { email: usuario.email },
            {
                username: usuario.username,
                email: usuario.email,
                password: usuario.password,
                rol: usuario.rol,
                departamento: usuario.departamento
            },
            { new: true }
        );
        return usuarioDoc ? new Usuario(usuarioDoc.toObject()) : null;
    }
}

module.exports = MongoUsuarioRepository;
