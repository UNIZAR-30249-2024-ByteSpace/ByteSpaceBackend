// repositories/MongoReservaRepository.js
const ReservaRepository = require('../../Domain/Repositories/ReservaRepository.js');
const ReservaModelo = require('../Models/modelo.reserva.js');
const Reserva = require('../../Domain/Model/Reserva');

class MongoReservaRepository extends ReservaRepository {
    async find(query) {
        const reservas = await ReservaModelo.find(query);
        return reservas.map(reserva => new Reserva(reserva.toObject()));
    }

    async findById(id) {
        const reservaDoc = await ReservaModelo.findOne({ id });
        return reservaDoc ? new Reserva(reservaDoc.toObject()) : null;
    }

    async save(reserva) {
        const nuevaReserva = new ReservaModelo(reserva);
        const savedReserva = await nuevaReserva.save();
        return new Reserva(savedReserva.toObject());
    }

    async delete(id) {
        return await ReservaModelo.findOneAndDelete({ id });
    }
}

module.exports = MongoReservaRepository;
