// src/infrastructure/database/MongoUsuarioRepository.js

const UsuarioModelo = require('./models/Usuario');
const EspacioModelo = require('./models/EspacioModelo'); // Importa el modelo de Espacio
const Usuario = require('../../domain/entities/Usuario');
const UsuarioRepository = require('../../domain/repositories/UsuarioRepository');

class MongoUsuarioRepository extends UsuarioRepository {
  async findByUsername(username) {
    const usuarioDoc = await UsuarioModelo.findOne({ username });
    return usuarioDoc ? new Usuario(usuarioDoc.toObject()) : null;
  }

  async findByEmail(email) {
    const usuarioDoc = await UsuarioModelo.findOne({ email });
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

  async obtenerEspaciosReservables() {
    const espaciosDocs = await EspacioModelo.find({ reservable: true });
    return espaciosDocs.map(espacio => espacio.toObject());
  }

  async obtenerEspacioPorId(id) {
    const espacioDoc = await EspacioModelo.findById(id);
    return espacioDoc ? espacioDoc.toObject() : null;
  }

  async filtrarEspacios(query) {
    const filtros = {};
    if (query.categoria) {
        filtros.categoria = query.categoria;
    }
    if (query.planta) {
        filtros.planta = parseInt(query.planta, 10);
    }
    if (query.capacidad) {
        filtros.maxOcupantes = { $gt: parseInt(query.capacidad, 10) };
    }
    const espaciosDocs = await EspacioModelo.find(filtros);
    return espaciosDocs.map(espacio => espacio.toObject());
  }

  async crearReserva(id, data) {
    const { idUsuario, fecha, horaInicio, horaFin, asistentes } = data;
    
    // Verificar si el usuario existe
    const usuarioDoc = await UsuarioModel.findById(idUsuario);
    if (!usuarioDoc) {
        return { error: 'Usuario no encontrado' };
    }
    
    // Verificar si el espacio existe
    const espacioDoc = await EspacioModel.findById(id);
    if (!espacioDoc) {
        return { error: 'Espacio no encontrado' };
    }

    // Crear una nueva reserva
    const reservaDoc = new ReservaModel({
        id: generarIdUnico(),
        horaInicio,
        horaFin,
        fecha: new Date(fecha),
        idPersona: idUsuario,
        idEspacio: id,
        asistentes,
        timestamp: Date.now()
    });
    await reservaDoc.save();

    return { message: 'Reserva creada con éxito' };
}

async actualizarEspacio(data) {
    const { id, ...updatedData } = data;
    
    // Verificar si el espacio existe
    const espacioDoc = await EspacioModel.findById(id);
    if (!espacioDoc) {
        throw new Error('Espacio no encontrado');
    }

    // Actualizar los datos del espacio
    Object.assign(espacioDoc, updatedData);
    await espacioDoc.save();

    return { message: 'Espacio actualizado con éxito' };
}

}

module.exports = MongoUsuarioRepository;
