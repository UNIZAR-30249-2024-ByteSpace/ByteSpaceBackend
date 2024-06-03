// application/services/espacioService.js
const MongoEspacioRepository = require('../../infrastructure/repositories/MongoEspacioRepository'); // Importa el repositorio de Mongo
const Espacio = require('../../domain/entities/Espacio');
const TipoEspacio = require('../../domain/value-objects/tipoEspacio');
const Rol = require('../../domain/value-objects/rol');
const Departamento = require('../../domain/value-objects/departamento');

class EspacioService {
    constructor() {
        this.espacioRepository = new MongoEspacioRepository(); // Utiliza el repositorio de Mongo
    }

    async obtenerEspaciosReservables() {
        const espacios = await this.espacioRepository.obtenerEspaciosReservables();
        return espacios.map(espacio => new Espacio({
            id: espacio.id,
            tamanio: espacio.tamanio,
            tipo: new TipoEspacio(espacio.tipo),
            maxOcupantes: espacio.maxOcupantes,
            informacion: espacio.informacion,
            reservable: espacio.reservable,
            categoria: espacio.categoria,
            porcentajeOcupacion: espacio.porcentajeOcupacion,
            planta: espacio.planta,
            asignadoA: espacio.asignadoA,
        }));
    }

    async obtenerEspacioPorId(id) {
        const espacio = await this.espacioRepository.obtenerEspacioPorId(id);
        if (!espacio) {
            return null;
        }
        return new Espacio({
            id: espacio.id,
            tamanio: espacio.tamanio,
            tipo: new TipoEspacio(espacio.tipo),
            maxOcupantes: espacio.maxOcupantes,
            informacion: espacio.informacion,
            reservable: espacio.reservable,
            categoria: espacio.categoria,
            porcentajeOcupacion: espacio.porcentajeOcupacion,
            planta: espacio.planta,
            asignadoA: espacio.asignadoA,
        });
    }

    async filtrarEspacios(query) {
        const espacios = await this.espacioRepository.filtrarEspacios(query);
        return espacios.map(espacio => new Espacio({
            id: espacio.id,
            tamanio: espacio.tamanio,
            tipo: new TipoEspacio(espacio.tipo),
            maxOcupantes: espacio.maxOcupantes,
            informacion: espacio.informacion,
            reservable: espacio.reservable,
            categoria: espacio.categoria,
            porcentajeOcupacion: espacio.porcentajeOcupacion,
            planta: espacio.planta,
            asignadoA: espacio.asignadoA,
        }));
    }

    async crearReserva(id, data) {
        const { idUsuario, fecha, horaInicio, horaFin, asistentes } = data;
        const usuarioDoc = await UsuarioModel.findById(idUsuario);
        const espacioDoc = await EspacioModel.findById(id);

        if (!usuarioDoc || !espacioDoc) {
            return { error: 'Usuario o espacio no encontrado' };
        }

        const usuario = new Usuario({
            id: usuarioDoc._id,
            username: usuarioDoc.username,
            email: usuarioDoc.email,
            password: usuarioDoc.password,
            rol: new Rol(usuarioDoc.rol),
            departamento: new Departamento(usuarioDoc.departamento)
        });

        const espacio = new Espacio({
            id: espacioDoc._id,
            tamanio: espacioDoc.tamanio,
            tipo: new TipoEspacio(espacioDoc.tipo),
            maxOcupantes: espacioDoc.maxOcupantes,
            informacion: espacioDoc.informacion,
            reservable: espacioDoc.reservable,
            categoria: espacioDoc.categoria,
            porcentajeOcupacion: espacioDoc.porcentajeOcupacion,
            planta: espacioDoc.planta,
            asignadoA: espacioDoc.asignadoA,
        });

        if (asistentes > espacio.maxOcupantes * (espacio.porcentajeOcupacion / 100)) {
            return { error: 'Reserva inválida: El número de asistentes excede la capacidad del espacio' };
        }

        const fechaInicio = new Date(fecha);
        const reservasExistentes = await ReservaModel.find({
            idEspacio: id,
            fecha: fechaInicio,
            horaInicio: { $lt: horaFin },
            horaFin: { $gt: horaInicio },
            potencialInvalida: false
        });

        if (reservasExistentes.length > 0) {
            return { error: 'El espacio ya está reservado para el periodo solicitado' };
        }

        // Lógica para verificar roles y categorías omitida para brevedad
        if (usuario.rol === 'estudiante' && espacio.categoria !== 'salacomun') {
            await guardarReservaPotencialmenteInvalida(idUsuario, id, fechaInicio, horaInicio, horaFin, asistentes);
            res.status(200).json({ message: 'Reserva potencialmente inválida: El espacio no es común' });
            return;
        }

        if ((usuario.rol === 'investigador contratado' || usuario.rol === 'docente investigador') && 
            (espacio.categoria === 'despacho' || (usuario.departamento !== espacio.departamento && usuario.departamento !== 'EINA'))) {
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
            (usuario.departamento !== espacio.departamento && usuario.departamento !== 'EINA'))) {
            await guardarReservaPotencialmenteInvalida(idUsuario, id, fechaInicio, horaInicio, horaFin, asistentes);
            res.status(200).json({ message: 'Reserva potencialmente inválida: No tiene permiso para reservar este espacio' });
            return;
        }

        await new ReservaModel({
            id: generarIdUnico(),
            horaInicio,
            horaFin,
            fecha: fechaInicio,
            idPersona: idUsuario,
            idEspacio: id,
            potencialInvalida: false,
            asistentes,
            timestamp: Date.now()
        }).save();

        return { message: 'Reserva creada con éxito' };
    }

    async actualizarEspacio(data) {
        const updatedEspacio = await this.espacioRepository.actualizarEspacio(data);
        return new Espacio({
            id: updatedEspacio.id,
            tamanio: updatedEspacio.tamanio,
            tipo: new TipoEspacio(updatedEspacio.tipo),
            maxOcupantes: updatedEspacio.maxOcupantes,
            informacion: updatedEspacio.informacion,
            reservable: updatedEspacio.reservable,
            categoria: updatedEspacio.categoria,
            porcentajeOcupacion: updatedEspacio.porcentajeOcupacion,
            planta: updatedEspacio.planta,
            asignadoA: updatedEspacio.asignadoA,
        });
    }
}

module.exports = EspacioService;
