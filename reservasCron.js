const cron = require('node-cron');
const ReservaModel = require('./modelos/modelo.reserva');
const UserModel = require('./modelos/modelo.usuario');
const nodemailer = require('nodemailer');

// Configurar nodemailer con tus credenciales de correo electrónico
let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'prueba.lis.123@gmail.com',
        pass: 'passworD123,'
    }
});

// Esta función se ejecutará todos los días a la medianoche (00:00)
cron.schedule('00 00 * * *', async () => {
    console.log('Ejecutando tarea de cron para comprobar reservas potencialmente inválidas...');

    // Obtener todas las reservas de la base de datos
    const reservas = await ReservaModel.find();
    console.log('Número de reservas encontradas:', reservas.length);

    // Obtener la fecha actual
    const fechaActual = new Date();

    // Filtrar las reservas potencialmente inválidas que llevan más de 7 días o cuya fecha de reserva sea el mismo día actual
    const reservasPotencialmenteInvalidas = reservas.filter(reserva => {
        const fechaReserva = new Date(reserva.fecha);
        const diferenciaEnDiasDesdeTimestamp = Math.ceil((fechaActual - new Date(reserva.timestamp)) / (1000 * 60 * 60 * 24));
        return (fechaReserva < fechaActual || diferenciaEnDiasDesdeTimestamp > 7);
    });

    // Contador de reservas eliminadas
    let reservasEliminadas = 0;

    // Array para almacenar las direcciones de correo electrónico de los usuarios cuyas reservas han sido eliminadas
    const usuariosEliminados = [];

    // Eliminar las reservas potencialmente inválidas
    for (const reserva of reservasPotencialmenteInvalidas) {
        await ReservaModel.findOneAndDelete(reserva);
        console.log(`Reserva potencialmente inválida eliminada: ${reserva._id}`);
        reservasEliminadas++;
        // Agregar la dirección de correo electrónico del usuario cuya reserva fue eliminada al array
        usuariosEliminados.push(reserva.idPersona);
    }

    // Mostrar el número de reservas eliminadas
    console.log(`Número de reservas eliminadas: ${reservasEliminadas}`);

    // Enviar correos electrónicos a los usuarios cuyas reservas han sido eliminadas
    for (const usuario of usuariosEliminados) {

        const user = await UserModel.findOne({id: usuario});
        console.log(`Enviar correo a: ${user.email}`);

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

    console.log('Tarea de cron completada.');
});