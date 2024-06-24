// repositories/MongoReservaInterface.js
const ReservaInterface = require('../../Domain/ReservaInterface.js');
const ReservaModelo = require('../ModelsDB/modelo.reserva.js');
const Reserva = require('../../Domain/Reserva.js');

class MongoReservaRepository extends ReservaInterface {
    async find(query) {
        const reservas = await ReservaModelo.find(query);
        return reservas.map(reserva => new Reserva(reserva.toObject()));
    }

    async findById(id) {
        const reservaDoc = await ReservaModelo.findOne({ id });
        return reservaDoc ? new Reserva(reservaDoc.toObject()) : null;
    }

    async save(reserva, session = null) {
        const nuevaReserva = new ReservaModelo({
            id: reserva.id,
            idPersona: reserva.idPersona,
            idEspacio: reserva.idEspacio,
            fecha: reserva.fecha,
            horaInicio: reserva.horaInicio,
            horaFin: reserva.horaFin,
            potencialInvalida: reserva.potencialInvalida,
            asistentes: reserva.asistentes,
            timestamp: reserva.timestamp
        });
        const savedReserva = session
            ? await nuevaReserva.save({ session })
            : await nuevaReserva.save();
        return new Reserva(savedReserva.toObject());
    }

    async delete(id, session = null) {
        return session
            ? await ReservaModelo.findOneAndDelete({ id }).session(session).exec()
            : await ReservaModelo.findOneAndDelete({ id }).exec();
    }

    async update(id, updatedData, session = null) {
        const updatedReserva = session
            ? await ReservaModelo.findOneAndUpdate({ id }, updatedData, { new: true }).session(session).exec()
            : await ReservaModelo.findOneAndUpdate({ id }, updatedData, { new: true }).exec();
        return updatedReserva ? new Reserva(updatedReserva.toObject()) : null;
    }
}

module.exports = MongoReservaRepository;
