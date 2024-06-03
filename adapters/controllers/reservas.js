// controllers/reservaController.js
const ReservaService = require('../application/services/reservaService');

async function getReservasByUserId(req, res) {
    try {
        const userId = req.params.id;
        const resultado = await ReservaService.getReservasByUserId(userId);

        if (resultado.error) {
            return res.status(404).json({ message: resultado.error });
        }

        return res.status(200).json(resultado.reservas);
    } catch (error) {
        console.error('Error al obtener las reservas del usuario:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
}

async function getReservasAdmin(req, res) {
    try {
        const reservas = await ReservaService.getReservasAdmin();
        return res.status(200).json(reservas);
    } catch (error) {
        console.error('Error al obtener las reservas del admin:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
}

async function cancelReserva(req, res) {
    try {
        const reservaId = req.params.id;
        const resultado = await ReservaService.cancelReserva(reservaId);

        if (resultado.error) {
            return res.status(404).json({ message: resultado.error });
        }

        return res.status(204).json({ reserva: resultado.reserva });
    } catch (error) {
        console.error('Error al cancelar la reserva:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
}

async function acceptReserva(req, res) {
    try {
        const reservaId = req.params.id;
        const resultado = await ReservaService.acceptReserva(reservaId);

        if (resultado.error) {
            return res.status(404).json({ message: resultado.error });
        }

        return res.status(200).json({ message: 'Reserva aceptada', reserva: resultado.reserva });
    } catch (error) {
        console.error('Error al aceptar la reserva:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
}

module.exports = {
    getReservasByUserId,
    getReservasAdmin,
    cancelReserva,
    acceptReserva
};
