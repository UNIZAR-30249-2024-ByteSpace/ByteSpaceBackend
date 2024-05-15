const ReservaModelo = require('./modelos/modelo.reserva.js');
const UserModelo = require('./modelos/modelo.usuario.js');

  

async function agregarEspaciosDePrueba() {
    try {
        // Crear espacios de prueba
        const reservas = [
            {
                id: 'reserva1',
                horaInicio: 10,
                horaFin: 11,
                fecha: new Date(2024, 4, 15),
                idPersona: 'usuario1',
                idEspacio: 'espacio2',
                potencialInvalida: false
            },
            {
                id: 'reserva2',
                horaInicio: 11,
                horaFin: 12,
                fecha: new Date(2024, 4, 15),
                idPersona: 'usuario1',
                idEspacio: 'espacio2',
                potencialInvalida: true
            },
            {
                id: 'reserva3',
                horaInicio: 12,
                horaFin: 13,
                fecha: new Date(2024, 4, 15),
                idPersona: 'usuario1',
                idEspacio: 'espacio2',
                potencialInvalida: false
            },
            {
                id: 'reserva4',
                horaInicio: 13,
                horaFin: 14,
                fecha: new Date(2024, 4, 15),
                idPersona: 'usuario1',
                idEspacio: 'espacio2',
                potencialInvalida: true
            },
            {
                id: 'reserva5',
                horaInicio: 14,
                horaFin: 15,
                fecha: new Date(2024, 4, 15),
                idPersona: 'usuario1',
                idEspacio: 'espacio2',
                potencialInvalida: false
            },
            {
                id: 'reserva6',
                horaInicio: 15,
                horaFin: 16,
                fecha: new Date(2024, 4, 15),
                idPersona: 'usuario1',
                idEspacio: 'espacio2',
                potencialInvalida: true
            },
            {
                id: 'reserva7',
                horaInicio: 16,
                horaFin: 17,
                fecha: new Date(2024, 4, 15),
                idPersona: 'usuario1',
                idEspacio: 'espacio2',
                potencialInvalida: false
            },
            {
                id: 'reserva8',
                horaInicio: 17,
                horaFin: 18,
                fecha: new Date(2024, 4, 15),
                idPersona: 'usuario1',
                idEspacio: 'espacio2',
                potencialInvalida: true
            },
            {
                id: 'reserva9',
                horaInicio: 18,
                horaFin: 19,
                fecha: new Date(2024, 4, 15),
                idPersona: 'usuario1',
                idEspacio: 'espacio2',
                potencialInvalida: false
            },
            {
                id: 'reserva10',
                horaInicio: 19,
                horaFin: 20,
                fecha: new Date(2024, 4, 15),
                idPersona: 'usuario1',
                idEspacio: 'espacio2',
                potencialInvalida: true
            }
        ];
    
        for (let reservaData of reservas) {
            const reserva = new ReservaModelo(reservaData);
            await reserva.save();
        }

        console.log('Espacios de prueba añadidos correctamente.');
    } catch (error) {
        console.error('Error al añadir espacios de prueba:', error);
    }
}

module.exports = { agregarEspaciosDePrueba };

