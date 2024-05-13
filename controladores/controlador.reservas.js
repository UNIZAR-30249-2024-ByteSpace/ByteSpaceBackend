const ReservaModel = require('../modelos/modelo.reserva');
const UserModel = require('../modelos/modelo.usuario');

    async function getReservasByUserId(req, res) {
        try {
            const userEmail = req.params.email;

            // Se busca el usuario en la base de datos por su correo electrónico
            const usuario = await UserModel.findOne({ email: userEmail });

            if (!usuario) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            // Se buscan las reservas asociadas al usuario
            const reservas = await ReservaModel.find({ usuario: usuario._id });

            // Se envían las reservas al cliente
            return res.status(200).json(reservas);
        } catch (error) {
            console.error('Error al obtener las reservas del usuario:', error);
            return res.status(500).json({ message: 'Error interno del servidor' });
        }
    }

    async function cancelReserva(req, res) {
        try {
            const reservaId = req.params.id;

            // Se busca la reserva en la base de datos
            const reserva = await ReservaModel.findById(reservaId);

            if (!reserva) {
                return res.status(404).json({ message: 'Reserva no encontrada' });
            }

            // Se elimina la reserva de la base de datos
            await ReservaModel.findByIdAndDelete(reservaId);

            return res.status(200).json({ message: 'Reserva cancelada correctamente' });
        } catch (error) {
            console.error('Error al cancelar la reserva:', error);
            return res.status(500).json({ message: 'Error interno del servidor' });
        }
    }

module.exports = {
    getReservasByUserId,
    cancelReserva
    
};