const EspacioModelo = require('../modelos/modelo.espacio.js');
const ReservaModelo = require('../modelos/modelo.reserva.js');
const UsuarioModelo = require('../modelos/modelo.usuario.js');

async function obtenerEspaciosReservables(req, res) {
    try {
        // Buscar espacios reservables en la misma planta
        const espacios = await EspacioModelo.find({ reservable: true });
        res.status(200).json(espacios);
    } catch (error) {
        console.error('Error al obtener espacios reservables por planta:', error);
        res.status(500).json({ error: 'Error al obtener espacios reservables por planta' });
    }
}


async function obtenerEspacioPorId(req, res) {
    try {
        const { id } = req.params;

        const espacio = await EspacioModelo.find({ id: id });

        if (!espacio) {
            return res.status(404).json({ error: 'Espacio no encontrado' });
        }

        res.status(200).json(espacio);
    } catch (error) {
        console.error('Error al obtener el espacio:', error);
        res.status(500).json({ error: 'Error al obtener el espacio' });
    }
}

async function filtrarEspacios(req, res) {
    try {

        const { id, categoria, planta, capacidad } = req.query;

        const query = {};

        if (id !== '') {
            query.id = id;
        } else {
            if (categoria !== undefined) {
                query.categoria = categoria;
            }
            if (planta !== undefined) {
                query.planta = parseInt(planta, 10);
            }
            if (capacidad !== undefined) {
                query.maxOcupantes = { $gt: parseInt(capacidad, 10) };
            }
        }

        const espaciosFiltrados = await EspacioModelo.find(query);

        res.status(200).json(espaciosFiltrados);
    } catch (error) {
        console.error('Error al filtrar los espacios:', error);
        res.status(500).json({ error: 'Error al filtrar los espacios' });
    }
}

async function crearReserva(req, res) {
    try {
        const { idUsuario, fecha, horaInicio, horaFin, asistentes } = req.body;
        const { id } = req.params;
        const usuario = await UsuarioModelo.findOne({ id: idUsuario });
        const espacio = await EspacioModelo.findOne({ id: id });


        if (!usuario || !espacio) {
            res.status(400).json({ error: 'Usuario o espacio no encontrado' });
            return;
        }

        if (asistentes > espacio.maxOcupantes) {
            res.status(400).json({ error: 'Reserva inválida: El número de asistentes excede la capacidad del espacio' });
            return;
        }

        const fechaInicio = new Date(fecha);

        const reservas = await ReservaModelo.find({
            idEspacio: id,
            fecha: fechaInicio,
            horaInicio: { $lt: horaFin },
            horaFin: { $gt: horaInicio },
            potencialInvalida: false
        });

        if (reservas.length > 0) {
            await guardarReservaPotencialmenteInvalida(idUsuario, id, fechaInicio, horaInicio, horaFin, asistentes);
            res.status(200).json({ message: 'Reserva potencialmente inválida: El espacio ya está reservado' });
            return;
        }

        if (usuario.rol === 'estudiante' && espacio.categoria !== 'salacomun') {
            await guardarReservaPotencialmenteInvalida(idUsuario, id, fechaInicio, horaInicio, horaFin, asistentes);
            res.status(200).json({ message: 'Reserva potencialmente inválida: El espacio no es común' });
            return;
        }

        if ((usuario.rol === 'investigador contratado' || usuario.rol === 'docente investigador') && 
            (espacio.categoria === 'despacho' || (usuario.departamento !== espacio.departamento && usuario.departamento !== 'eina'))) {
            await guardarReservaPotencialmenteInvalida(idUsuario, id, fechaInicio, horaInicio, horaFin, asistentes);
            res.status(200).json({ message: 'Reserva potencialmente inválida: No tiene permiso para reservar este espacio' });
            return;
        }

        if (usuario.rol === 'conserje' && espacio.categoria === 'despacho') {
            await guardarReservaPotencialmenteInvalida(idUsuario, id, fechaInicio, horaInicio, horaFin, asistentes);
            res.status(200).json({ message: 'Reserva potencialmente inválida: No tiene permiso para reservar despachos' });
            return;
        }

        if (usuario.rol === 'tecnico de laboratorio' && 
            (espacio.categoria !== 'salacomun' && espacio.categoria !== 'laboratorio' || 
            (usuario.departamento !== espacio.departamento && usuario.departamento !== 'eina'))) {
            await guardarReservaPotencialmenteInvalida(idUsuario, id, fechaInicio, horaInicio, horaFin, asistentes);
            res.status(200).json({ message: 'Reserva potencialmente inválida: No tiene permiso para reservar este espacio' });
            return;
        }

        await guardarReservaValida(idUsuario, id, fechaInicio, horaInicio, horaFin, asistentes);
        res.status(200).json({ message: 'Reserva creada con éxito' });
    } catch (error) {
        console.error('Error al crear la reserva:', error);
        res.status(500).json({ error: 'Error al crear la reserva' });
    }
}

async function guardarReservaPotencialmenteInvalida(idUsuario, idEspacio, fechaInicio, horaInicio, horaFin, asistentes) {
    const nuevaReserva = new ReservaModelo({
        id: generarIdUnico(),
        horaInicio: horaInicio,
        horaFin: horaFin,
        fecha: fechaInicio,
        idPersona: idUsuario,
        idEspacio: idEspacio,
        potencialInvalida: true,
        asistentes: asistentes,
        timestamp: Date.now() 
    });
    await nuevaReserva.save();
}

async function guardarReservaValida(idUsuario, idEspacio, fechaInicio, horaInicio, horaFin, asistentes) {
    const nuevaReserva = new ReservaModelo({
        id: generarIdUnico(),
        horaInicio: horaInicio,
        horaFin: horaFin,
        fecha: fechaInicio,
        idPersona: idUsuario,
        idEspacio: idEspacio,
        potencialInvalida: false,
        asistentes: asistentes,
        timestamp: Date.now()
    });
    await nuevaReserva.save();
}

function generarIdUnico() {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

async function actualizarEspacio(req, res) {
    try {
        const { id, ...updatedData } = req.body;

        // Encuentra el espacio existente por ID
        const existingEspacio = await EspacioModelo.findOne({ id: id });

        if (!existingEspacio) {
            return res.status(404).json({ error: 'Espacio no encontrado' });
        }

        // Lista de campos que se pueden actualizar
        const updatableFields = ['reservable', 'categoria', 'asignadoA', 'porcentajeOcupacion'];

        // Actualiza solo las claves especificadas si existen en el cuerpo de la solicitud
        updatableFields.forEach(key => {
            if (updatedData.hasOwnProperty(key)) {
                existingEspacio[key] = updatedData[key];
            }
        });

        // Guarda el espacio actualizado
        const updatedEspacio = await existingEspacio.save();

        res.status(200).json(updatedEspacio);
    } catch (error) {
        console.error('Error al actualizar el espacio:', error);
        res.status(500).json({ error: 'Error al actualizar el espacio' });
    }
}


module.exports = {
    obtenerEspacioPorId,
    obtenerEspaciosReservables,
    filtrarEspacios,
    crearReserva,
    actualizarEspacio
};

