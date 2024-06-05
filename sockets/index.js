const io = require("socket.io");
const UserModel = require('../modelos/modelo.usuario');
const ReservationModel = require('../modelos/modelo.reserva');

const SocketController = {
    async book(socket, userId, reservationId) {
        try {
            // Verificar si el usuario está autenticado
            const user = await UserModel.findById(userId);
            if (!user) {
                socket.emit('error', 'Invalid user');
                return;
            }

            // Verificar si la reserva existe
            const reservation = await ReservationModel.findById(reservationId);
            if (!reservation) {
                socket.emit('error', 'Invalid reservation');
                return;
            }

            // Realizar la lógica de reserva aquí

            // Emitir un mensaje de éxito
            socket.emit('success', 'Reservation successful');
        } catch (error) {
            console.error(error);
            socket.emit('error', 'An error occurred');
        }
    },

    async cancel(socket, userId, reservationId) {
        try {
            // Verificar si el usuario está autenticado
            const user = await UserModel.findById(userId);
            if (!user) {
                socket.emit('error', 'Invalid user');
                return;
            }

            // Verificar si la reserva existe
            const reservation = await ReservationModel.findById(reservationId);
            if (!reservation) {
                socket.emit('error', 'Invalid reservation');
                return;
            }

            // Realizar la lógica de cancelación aquí

            // Emitir un mensaje de éxito
            socket.emit('success', 'Reservation cancelled');
        } catch (error) {
            console.error(error);
            socket.emit('error', 'An error occurred');
        }
    },

    async start(server) {
        // Iniciar el servidor de sockets
        this.io = io(server);

        this.io.on("connection", (socket) => {
            console.log('New socket connected');

            // Manejar la reserva
            socket.on('book', async (userId, reservationId) => {
                await this.book(socket, userId, reservationId);
            });

            // Manejar la cancelación de reserva
            socket.on('cancel', async (userId, reservationId) => {
                await this.cancel(socket, userId, reservationId);
            });

            // Manejar la desconexión del socket
            socket.on("disconnect", () => {
                console.log('Socket disconnected');
            });
        });
    }
}

module.exports = SocketController;
