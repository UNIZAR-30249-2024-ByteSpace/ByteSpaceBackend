const ReservaModelo = require('../../models/ReservaModelo');
const ReservaRepository = require('../../domain/repositories/ReservaRepository');

class MongoReservaRepository extends ReservaRepository {
  async create(reserva) {
    const reservaDoc = new ReservaModelo({
      id: reserva.id,
      horaInicio: reserva.horaInicio,
      horaFin: reserva.horaFin,
      fecha: reserva.fecha,
      idPersona: reserva.idPersona,
      idEspacio: reserva.idEspacio,
      potencialInvalida: reserva.potencialInvalida,
      asistentes: reserva.asistentes,
      timestamp: reserva.timestamp
    });
    return await reservaDoc.save();
  }

  async getById(id) {
    const reservaDoc = await ReservaModelo.findOne({ id });
    return reservaDoc ? reservaDoc.toObject() : null;
  }

  async update(reserva) {
    const reservaDoc = await ReservaModelo.findOneAndUpdate(
      { id: reserva.id },
      {
        horaInicio: reserva.horaInicio,
        horaFin: reserva.horaFin,
        fecha: reserva.fecha,
        idPersona: reserva.idPersona,
        idEspacio: reserva.idEspacio,
        potencialInvalida: reserva.potencialInvalida,
        asistentes: reserva.asistentes,
        timestamp: reserva.timestamp
      },
      { new: true }
    );
    return reservaDoc ? reservaDoc.toObject() : null;
  }

  async delete(id) {
    await ReservaModelo.deleteOne({ id });
  }

  async list() {
    const reservasDocs = await ReservaModelo.find();
    return reservasDocs.map(doc => doc.toObject());
  }
}

module.exports = MongoReservaRepository;
