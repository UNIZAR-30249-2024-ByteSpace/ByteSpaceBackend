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


async function obtenerEspacioPorId(req, res) {
    try {
        console.log("ME LLAMAN DEL FRONT")
        console.log("PARAMS", JSON.stringify(req.params));
        const { id } = req.params;
        console.log("IDESPACIO" + id);

        const espacio = await EspacioModelo.findById(id);

        if (!espacio) {
            return res.status(404).json({ error: 'Espacio no encontrado' });
        }

        console.log(espacio);
        res.status(200).json(espacio);
    } catch (error) {
        console.error('Error al obtener el espacio:', error);
        res.status(500).json({ error: 'Error al obtener el espacio' });
    }
}

async function filtrarEspacios(req, res) {
    try {
        console.log("ME LLAMAN DEL FRONT");
        console.log("QUERY", JSON.stringify(req.query));

        const { categoria, planta, capacidad, tamanio } = req.query;
        console.log(`Categoria: ${categoria}, Planta: ${planta}, Capacidad: ${capacidad}, Tamanio: ${tamanio}`);

        const query = {};

        if (categoria !== undefined) {
            query.categoria = categoria;
        }
        if (planta !== undefined) {
            query.planta = parseInt(planta, 10);
        }
        if (capacidad !== undefined) {
            query.maxOcupantes = { $gt: parseInt(capacidad, 10) };
        }
        if (tamanio !== undefined) {
            query.tamanio = { $gt: parseInt(tamanio, 10) };
        }

        const espaciosFiltrados = await EspacioModelo.find(query);

        //console.log(espaciosFiltrados);
        res.status(200).json(espaciosFiltrados);
        console.log(`Categoria: ${categoria}, Planta: ${planta}, Capacidad: ${capacidad}, Tamanio: ${tamanio}`);
    } catch (error) {
        console.error('Error al filtrar los espacios:', error);
        res.status(500).json({ error: 'Error al filtrar los espacios' });
    }
}

async function verificarReserva(fecha, horaInicio, duracion, idUsuario, idEspacio) {
    try {
        // Obtener información del usuario y del espacio
        const usuario = await EspacioModelo.find({ id: idUsuario });
        const espacio = await EspacioModelo.find({ id: idEspacio });

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
    filtrarEspacios,
    verificarReserva
};

