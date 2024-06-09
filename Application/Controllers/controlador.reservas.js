// controladores/ReservaController.js
const ReservaService = require('../Service/ServicioReserva');
const reservaService = new ReservaService();

class ReservaController {
    getReservasByUserId = async (req, res) => {
        console.log('Obtener reservas del usuario controlador:', req.params.id);
        try {
            const userId = req.params.id;
            const reservas = await reservaService.getReservasByUserId(userId);
            return res.status(200).json(reservas);
        } catch (error) {
            console.error('Error al obtener las reservas del usuario:', error.message);
            return res.status(404).json({ message: error.message });
        }
    }
    getReservasAdmin = async (req, res) => {
        console.log('Obtener reservas del admin controlador');
        try {
            const reservas = await reservaService.getReservasAdmin();
            return res.status(200).json(reservas);
        } catch (error) {
            console.error('Error al obtener las reservas del admin:', error.message);
            return res.status(500).json({ message: 'Error interno del servidor' });
        }
    }

    cancel = async (req, res) => {
        console.log('Cancelar reserva controlador:', req.params.id);
        try {
            const reservaId = req.params.id;
            const reserva = await reservaService.cancel(reservaId);
            return res.status(204).json(reserva);
        } catch (error) {
            console.error('Error al cancelar la reserva:', error.message);
            return res.status(404).json({ message: error.message });
        }
    }

    accept = async (req, res) => {
        console.log('Aceptar reserva controlador:', req.params.id);
        try {
            const reservaId = req.params.id;
            const reserva = await reservaService.accept(reservaId);
            return res.status(200).json({ message: 'Reserva aceptada', reserva });
        } catch (error) {
            console.error('Error al aceptar la reserva:', error.message);
            return res.status(404).json({ message: error.message });
        }
    }
    
    // controllers/ReservaController.js
    // controllers/ReservaController.js
    crearReserva = async (req, res) => {
        try {
            const { idUsuario, fecha, horaInicio, horaFin, asistentes } = req.body;
            const { id } = req.params;
            const reserva = await reservaService.crearReserva({
                idUsuario,
                idEspacio: id,
                fecha,
                horaInicio,
                horaFin,
                asistentes
            });

            const message = reserva.potencialInvalida 
                ? 'Reserva potencialmente inválida creada con éxito' 
                : 'Reserva creada con éxito';

            res.status(200).json({ message, reserva });
        } catch (error) {
            console.error('Error al crear la reserva:', error.message);
            res.status(500).json({ error: 'Error al crear la reserva' });
        }
    }



    obtenerReservaPorId = async (req, res) => {
        try {
            const { id } = req.params;
            const reserva = await reservaService.obtenerReservaPorId(id);
            res.status(200).json(reserva);
        } catch (error) {
            console.error('Error al obtener la reserva:', error.message);
            res.status(500).json({ error: 'Error al obtener la reserva' });
        }
    }
}

module.exports = new ReservaController();
