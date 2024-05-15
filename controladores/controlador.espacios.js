const EspacioModelo = require('../modelos/modelo.espacio.js');
const ReservaModelo = require('../modelos/modelo.reserva.js');
const UsuarioModelo = require('../modelos/modelo.usuario.js');

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

        const espacio = await EspacioModelo.find({ id: id });

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

async function crearReserva(req, res) {
    try {
        console.log("Entro crearReserva");
        const { idUsuario, fecha, horaInicio, duracion } = req.body;
        const { id } = req.params;
        const usuario = await UsuarioModelo.findOne({ id: idUsuario });
        const espacio = await EspacioModelo.findById(id);
        console.log("Usuario: " + usuario)
        console.log("Espacio: " + espacio)
        if (!usuario || !espacio) {
            res.status(400).json({ error: 'Usuario o espacio no encontrado' });
            return;
        }

        const fechaInicio = new Date(fecha);
        const horaFinal = new Date(fechaInicio.getTime() + duracion * 60000);
        const reservas = await ReservaModelo.find({
            idEspacio: id,
            fecha: fechaInicio,
            horaInicio: { $lt: horaFinal },
            horaFin: { $gt: horaInicio }
        });

        if (reservas.length > 0) {
            await guardarReservaPotencialmenteInvalida(idUsuario, id, fechaInicio, horaInicio, horaFinal);
            res.status(200).json({ message: 'Reserva potencialmente inválida: El espacio ya esta reservado' });
            return;
        }

        if  (usuario.rol === 'estudiante' && espacio.categoria !== 'salacomun') {
            await guardarReservaPotencialmenteInvalida(idUsuario, id, fechaInicio, horaInicio, horaFinal);
            res.status(200).json({ message: 'Reserva potencialmente inválida: El espacio no es común' });
            return;
        }

        if ((usuario.rol === 'investigador contratado' || usuario.rol === 'docente investigador') && (espacio.categoria === 'despacho' || (usuario.departamento !== espacio.departamento && usuario.departamento !== 'eina'))) {
            await guardarReservaPotencialmenteInvalida(idUsuario, id, fechaInicio, horaInicio, horaFinal);
            res.status(200).json({ message: 'Reserva potencialmente inválida: No tiene permiso para reservar este espacio' });
            return;
        }

        if (usuario.rol === 'conserje' && espacio.categoria === 'despacho') {
            await guardarReservaPotencialmenteInvalida(idUsuario, id, fechaInicio, horaInicio, horaFinal);
            res.status(200).json({ message: 'Reserva potencialmente inválida: No tiene permiso para reservar despachos' });
            return;
        }

        if (usuario.rol === 'tecnico de laboratorio' && (espacio.categoria !== 'sala comun' && espacio.categoria !== 'laboratorio' || (usuario.departamento !== espacio.departamento && usuario.departamento !== 'eina'))) {
            await guardarReservaPotencialmenteInvalida(idUsuario, id, fechaInicio, horaInicio, horaFinal);
            res.status(200).json({ message: 'Reserva potencialmente inválida: No tiene permiso para reservar este espacio' });
            return;
        }

        await guardarReservaValida(idUsuario, id, fechaInicio, horaInicio, horaFinal);
        res.status(200).json({ message: 'Reserva creada con éxito' });
    } catch (error) {
        console.error('Error al crear la reserva:', error);
        res.status(500).json({ error: 'Error al crear la reserva' });
    }
}

async function guardarReservaPotencialmenteInvalida(idUsuario, idEspacio, fechaInicio, horaInicio, horaFinal) {
    const nuevaReserva = new ReservaModelo({
        id: generarIdUnico(),
        horaInicio: horaInicio,
        horaFin: horaFinal,
        fecha: fechaInicio,
        idPersona: idUsuario,
        idEspacio: idEspacio,
        potencialInvalida: true
    });
    await nuevaReserva.save();
}

async function guardarReservaValida(idUsuario, idEspacio, fechaInicio, horaInicio, horaFinal) {
    const nuevaReserva = new ReservaModelo({
        id: generarIdUnico(),
        horaInicio: horaInicio,
        horaFin: horaFinal,
        fecha: fechaInicio,
        idPersona: idUsuario,
        idEspacio: idEspacio,
        potencialInvalida: false
    });
    await nuevaReserva.save();
}

function generarIdUnico() {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
}


module.exports = {
    obtenerEspacioPorId,
    obtenerEspaciosReservables,
    filtrarEspacios,
    crearReserva
};

