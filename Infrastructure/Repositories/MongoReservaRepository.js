// repositories/MongoReservaRepository.js
const ReservaRepository = require('../../Domain/Repositories/ReservaRepository.js');
const ReservaModelo = require('../models/modelo.reserva.js');

class MongoReservaRepository extends ReservaRepository {
    async find(query) {
        return await ReservaModelo.find(query);
    }

    async findById(id) {
        return await ReservaModelo.findOne({ id });
    }

    async save(reserva) {
        const nuevaReserva = new ReservaModelo(reserva);
        return await nuevaReserva.save();
    }

    async delete(id) {
        return await ReservaModelo.findOneAndDelete({ id });
    }
}

module.exports = MongoReservaRepository;
