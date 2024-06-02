// src/infrastructure/database/MongoUsuarioRepository.js

const UsuarioModelo = require('./models/Usuario');
const Usuario = require('../../domain/entities/Usuario');
const UsuarioRepository = require('../../domain/repositories/UsuarioRepository');

class MongoUsuarioRepository extends UsuarioRepository {
  async create(usuario) {
    const usuarioDoc = new UsuarioModelo({
      username: usuario.username,
      email: usuario.email,
      password: usuario.password,
      rol: usuario.rol,
      departamento: usuario.departamento
    });
    const savedDoc = await usuarioDoc.save();
    return new Usuario(savedDoc.toObject());
  }

  async getById(id) {
    const usuarioDoc = await UsuarioModelo.findById(id);
    return usuarioDoc ? new Usuario(usuarioDoc.toObject()) : null;
  }

  async getByUsername(username) {
    const usuarioDoc = await UsuarioModelo.findOne({ username });
    return usuarioDoc ? new Usuario(usuarioDoc.toObject()) : null;
  }

  async update(usuario) {
    const usuarioDoc = await UsuarioModelo.findOneAndUpdate(
      { _id: usuario.id },
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

  async delete(id) {
    await UsuarioModelo.deleteOne({ _id: id });
  }

  async list() {
    const usuariosDocs = await UsuarioModelo.find();
    return usuariosDocs.map(doc => new Usuario(doc.toObject()));
  }
}

module.exports = MongoUsuarioRepository;
