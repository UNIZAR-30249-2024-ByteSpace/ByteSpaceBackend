const ReservaModel = require('../modelos/modelo.reserva');
const UserModel = require('../modelos/modelo.usuario');

const Reservas = {
    async login(req, res) {
        // Aquí se manejaría la lógica de inicio de sesión
        // Por ejemplo, verificar las credenciales del usuario y generar un token de autenticación
        // Se omite la implementación real por brevedad
    },

    async home(req, res) {
        // En esta función se manejaría el acceso a la página de inicio de la aplicación
        // Por ejemplo, se podrían cargar datos para mostrar al usuario en la página de inicio
        // Se omite la implementación real por brevedad
    },

    async misReservas(req, res) {
        try {
            // Se obtiene el ID del usuario desde el token de autenticación
            const userId = res.locals.decoded.id;

            // Se busca el usuario en la base de datos
            const usuario = await UserModel.findById(userId);

            if (!usuario) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            // Se buscan las reservas asociadas al usuario
            const reservas = await ReservaModel.find({ usuario: userId });

            // Se envían las reservas al cliente
            return res.status(200).json(reservas);
        } catch (error) {
            console.error('Error al obtener las reservas del usuario:', error);
            return res.status(500).json({ message: 'Error interno del servidor' });
        }
    }
};

module.exports = Reservas;
