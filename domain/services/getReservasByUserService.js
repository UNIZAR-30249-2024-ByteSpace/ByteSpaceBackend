// application/services/getReservasByUserService.js
const MongoReservaRepository = require('../../infrastructure/repositories/MongoReservaRepository');
const Reserva = require('../../domain/entities/Reserva');

async function getReservasByUserId(userId) {
    const reservaRepository = new MongoReservaRepository();
    const reservas = await reservaRepository.getReservasByUserId(userId);
    return reservas.map(reserva => new Reserva(reserva.toObject()));
}

module.exports = getReservasByUserService;
