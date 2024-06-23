// infrastructure/CronJobs/checkInvalidReservations.js

const cron = require('node-cron');
const nodemailer = require('nodemailer');
const ReservaService = require('../../Application/ServicioReserva');
const UserModel = require('../Models/modelo.usuario');

const reservaService = new ReservaService();

// Configurar nodemailer con tus credenciales de correo electrónico
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'prueba.lis.123@gmail.com',
        pass: 'passworD123,'
    }
});

// Esta función se ejecutará todos los días a la medianoche (00:00)
cron.schedule('00 00 * * *', async () => {
    console.log('Ejecutando tarea de cron para comprobar reservas potencialmente inválidas...');

    try {
        const { reservasEliminadas, usuariosEliminados } = await reservaService.eliminarReservasPotencialmenteInvalidas();
        console.log(`Número de reservas eliminadas: ${reservasEliminadas}`);

        for (const usuarioId of usuariosEliminados) {
            const user = await UserModel.findOne({ id: usuarioId });
            if (user && user.email) {
                const mailOptions = {
                    from: 'prueba.lis.123@gmail.com',
                    to: user.email,
                    subject: 'Reserva eliminada',
                    text: 'Tu reserva ha sido eliminada debido a que ya no es válida. Por favor, ponte en contacto con nosotros para más detalles.'
                };

                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log('Error al enviar el correo electrónico:', error);
                    } else {
                        console.log('Correo electrónico enviado:', info.response);
                    }
                });
            }
        }
    } catch (error) {
        console.error('Error durante la tarea de cron:', error);
    }

    console.log('Tarea de cron completada.');
});
