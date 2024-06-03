// application/services/acceptReservaService.js
const MongoReservaRepository = require('../../infrastructure/repositories/MongoReservaRepository');
const Reserva = require('../../domain/entities/Reserva');

async function acceptReserva(reservaId) {
    const reservaRepository = new MongoReservaRepository();
    const resultado = await reservaRepository.acceptReserva(reservaId);
    if (resultado.error) {
        return { error: resultado.error };
    }
    return { reserva: new Reserva(resultado.reserva.toObject()) };
}

module.exports = acceptReservaService;
