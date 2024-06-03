// application/services/reservaService.js
const MongoReservaRepository = require('../../infrastructure/repositories/MongoReservaRepository'); // Importa el repositorio de MongoDB
const Reserva = require('../../domain/entities/Reserva');

class ReservaService {
    constructor() {
        this.reservaRepository = new MongoReservaRepository(); // Utiliza el repositorio de MongoDB
    }

    async getReservasByUserId(userId) {
        const reservas = await this.reservaRepository.getReservasByUserId(userId);
        return reservas.map(reserva => new Reserva(reserva.toObject()));
    }

    async getReservasAdmin() {
        const reservas = await this.reservaRepository.getReservasAdmin();
        return reservas.map(reserva => new Reserva(reserva.toObject()));
    }

    async cancelReserva(reservaId) {
        const resultado = await this.reservaRepository.cancelReserva(reservaId);
        if (resultado.error) {
            return { error: resultado.error };
        }
        return { reserva: new Reserva(resultado.reserva.toObject()) };
    }

    async acceptReserva(reservaId) {
        const resultado = await this.reservaRepository.acceptReserva(reservaId);
        if (resultado.error) {
            return { error: resultado.error };
        }
        return { reserva: new Reserva(resultado.reserva.toObject()) };
    }
}

module.exports = ReservaService;
