// application/services/getReservasAdminService.js
const MongoReservaRepository = require('../../infrastructure/repositories/MongoReservaRepository');
const Reserva = require('../../domain/entities/Reserva');

async function getReservasAdmin() {
    const reservaRepository = new MongoReservaRepository();
    const reservas = await reservaRepository.getReservasAdmin();
    return reservas.map(reserva => new Reserva(reserva.toObject()));
}

module.exports = getReservasAdminService;
