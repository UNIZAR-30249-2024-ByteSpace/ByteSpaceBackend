const ReservaModel = require('../modelos/modelo.reserva');
const UserModel = require('../modelos/modelo.usuario');

    async function getReservasByUserId(req, res) {
        try {
            const userId = req.params.id;
            // Se busca el usuario en la base de datos por su correo electrónico
            const usuario = await UserModel.findOne({ id: userId });
            console.log("Usuario: " + usuario);
            if (!usuario) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            // Se buscan las reservas asociadas al usuario
            const reservas = await ReservaModel.find({ idPersona: usuario.id });
            console.log("reservas" + reservas);
            // Se envían las reservas al cliente
            return res.status(200).json(reservas);
        } catch (error) {
            console.error('Error al obtener las reservas del usuario:', error);
            return res.status(500).json({ message: 'Error interno del servidor' });
        }
    }

    async function getReservasAdmin(req, res) {
        try {
            const reservas = await ReservaModel.find();
            console.log("reservas" + reservas);
            // Se envían las reservas al cliente
            return res.status(200).json(reservas);
        } catch (error) {
            console.error('Error al obtener las reservas del admin:', error);
            return res.status(500).json({ message: 'Error interno del servidor' });
        }
    }

    async function cancelReserva(req, res) {
        try {
            console.log("Entro al frontend ");
            console.log("req.params.id: " + req.params.id);
            const reservaId = req.params.id;

            // Se busca la reserva en la base de datos
            const reserva = await ReservaModel.findOne({ id: reservaId});
            console.log("Reserva: " + reserva);
            if (!reserva) {
                return res.status(404).json({ message: 'Reserva no encontrada' });
            }

            // Se elimina la reserva de la base de datos
            await ReservaModel.findOneAndDelete({ id: reservaId});
            console.log("Devuelvo json");
            return res.status(204).json({reserva});
        } catch (error) {
            console.error('Error al cancelar la reserva:', error);
            return res.status(500).json({ message: 'Error interno del servidor' });
        }
    }

    async function acceptReserva(req, res) {
        try {
            console.log("Entro al frontend ");
            console.log("req.params.id: " + req.params.id);
            const reservaId = req.params.id;
    
            // Se busca la reserva en la base de datos
            const reserva = await ReservaModel.findOne({ id: reservaId });
            console.log("Reserva: " + reserva);
            if (!reserva) {
                return res.status(404).json({ message: 'Reserva no encontrada' });
            }
    
            // Se actualiza el atributo potencialInvalida a false
            await ReservaModel.findOneAndUpdate({ id: reservaId }, { potencialInvalida: false });
            console.log("Acepté la reserva");
            
            // Se devuelve la reserva actualizada
            return res.status(200).json({ message: 'Reserva aceptada', reserva });
        } catch (error) {
            console.error('Error al aceptar la reserva:', error);
            return res.status(500).json({ message: 'Error interno del servidor' });
        }
    }

module.exports = {
    getReservasByUserId,
    cancelReserva,
    acceptReserva,
    getReservasAdmin
};