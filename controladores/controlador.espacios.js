const EspacioModelo = require('../modelos/modelo.espacio.js');
const UserModelo = require('../modelos/modelo.usuario.js');
const MiModelo = require('../index.js');

async function obtenerEspaciosReservables(req, res) {
    try {
        // Buscar espacios reservables en la misma planta
        console.log("ME LLAMAN DEL FRONT")
        const espacios = await EspacioModelo.find({ reservable: true });
        console.log(espacios)
        res.status(200).json(espacios);
    } catch (error) {
        console.error('Error al obtener espacios reservables por planta:', error);
        res.status(500).json({ error: 'Error al obtener espacios reservables por planta' });
    }
}


async function obtenerEspacioPorId(idEspacio) {
    try {
        const espacio = await EspacioModelo.find({ id: idEspacio });
        console.log(espacio)
        return espacio;
    } catch (error) {
        console.error('Error al obtener el espacio:', error);
        throw error;
    }
}

async function verificarReserva(fecha, horaInicio, duracion, idUsuario, idEspacio) {
    try {
        // Obtener información del usuario y del espacio
        const usuario = await MiModelo.find({ id: idUsuario });
        const espacio = await MiModelo.find({ id: idEspacio });

        // Verificar si el usuario y el espacio existen
        if (!usuario || !espacio) {
            throw new Error('Usuario o espacio no encontrado');
        }

        // Verificar disponibilidad del espacio en el horario especificado
        const fechaInicio = new Date(fecha);
        const horaFinal = new Date(fechaInicio.getTime() + duracion * 60000); // Convertir duración a milisegundos
        const reservas = await ReservaModelo.find({
            idEspacio: idEspacio,
            dia: fechaInicio.getDate(),
            mes: fechaInicio.getMonth() + 1, // Meses en JavaScript son de 0 a 11
            año: fechaInicio.getFullYear(),
            horaInicio: { $lt: horaFinal },
            horaFinal: { $gt: horaInicio }
        });

        if (reservas.length > 0) {
            return 'Potencialmente inválido: El espacio ya está reservado en ese horario';
        }

        // Verificar permisos del usuario
        if (usuario.rol === 'estudiante') {
            if (espacio.tipo !== 'comun') {
                return 'Potencialmente inválido: Los estudiantes solo pueden reservar espacios comunes';
            }
        } else if (usuario.rol === 'investigador contratado' || usuario.rol === 'docente investigador') {
            if (espacio.tipo === 'despacho') {
                return 'Potencialmente inválido: No tiene permiso para reservar despachos';
            }
            if (usuario.departamento !== espacio.departamento && usuario.departamento !== 'eina') {
                return 'Potencialmente inválido: No tiene permiso para reservar este espacio';
            }
        } else if (usuario.rol === 'conserje') {
            if (espacio.tipo === 'despacho') {
                return 'Potencialmente inválido: No tiene permiso para reservar despachos';
            }
        } else if (usuario.rol === 'tecnico de laboratorio') {
            if (espacio.tipo !== 'sala comun' && espacio.tipo !== 'laboratorio') {
                return 'Potencialmente inválido: No tiene permiso para reservar este espacio';
            }
            if (usuario.departamento !== espacio.departamento && usuario.departamento !== 'eina') {
                return 'Potencialmente inválido: No tiene permiso para reservar este espacio';
            }
        }

        return 'Apto para reservar';
    } catch (error) {
        console.error('Error al verificar reserva:', error);
        throw error;
    }
}


module.exports = {
    obtenerEspacioPorId,
    obtenerEspaciosReservables,
    verificarReserva
};

