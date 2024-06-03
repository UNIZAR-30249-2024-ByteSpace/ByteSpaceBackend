// application/services/cancelReservaService.js
const MongoReservaRepository = require('../../infrastructure/repositories/MongoReservaRepository');
const Reserva = require('../../domain/entities/Reserva');

async function cancelReserva(reservaId) {
    const reservaRepository = new MongoReservaRepository();
    const resultado = await reservaRepository.cancelReserva(reservaId);
    if (resultado.error) {
        return { error: resultado.error };
    }
    return { reserva: new Reserva(resultado.reserva.toObject()) };
}

module.exports = cancelReservaService;
