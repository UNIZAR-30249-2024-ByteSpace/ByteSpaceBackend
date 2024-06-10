// services/ReservaService.js
const MongoReservaRepository = require('../../Infrastructure/Repositories/MongoReservaRepository.js');
const MongoEspacioRepository = require('../../Infrastructure/Repositories/MongoEspacioRepository.js');
const MongoUsuarioRepository = require('../../Infrastructure/Repositories/MongoUsuarioRepository.js');
const Reserva = require('../../Domain/Model/Reserva.js');
const Espacio = require('../../Domain/Model/Espacio.js');
const Usuario = require('../../Domain/Model/Usuario.js');

class ReservaService {
    constructor() {
        this.reservaRepository = new MongoReservaRepository();
        this.espacioRepository = new MongoEspacioRepository();
        this.usuarioRepository = new MongoUsuarioRepository();
    }

    async crearReserva({ idUsuario, idEspacio, fecha, horaInicio, horaFin, asistentes }) {
        const usuarioDoc = await this.usuarioRepository.findById(idUsuario);
        const espacioDoc = await this.espacioRepository.findById(idEspacio);

        if (!usuarioDoc || !espacioDoc) {
            throw new Error('Usuario o espacio no encontrado');
        }

        const usuario = new Usuario(usuarioDoc.toObject());
        const espacio = new Espacio(espacioDoc.toObject());

        const maxCapacity = espacio.tamanio * (espacio.porcentajeOcupacion / 100);
        if (asistentes > maxCapacity) {
            throw new Error('El número de asistentes excede la capacidad del espacio');
        }

        const fechaInicio = new Date(fecha);

        const reservas = await this.reservaRepository.find({
            idEspacio: idEspacio,
            fecha: fechaInicio,
            horaInicio: { $lt: horaFin },
            horaFin: { $gt: horaInicio },
            potencialInvalida: false
        });

        if (reservas.length > 0) {
            throw new Error('El espacio ya está reservado para el periodo solicitado');
        }

        const nuevaReserva = new Reserva({
            id: this.generarIdUnico(),
            horaInicio,
            horaFin,
            fecha: fechaInicio,
            idPersona: idUsuario,
            idEspacio,
            potencialInvalida: this.esReservaPotencialmenteInvalida(usuario, espacio),
            asistentes,
            timestamp: Date.now()
        });

        await this.reservaRepository.save(nuevaReserva);
        return nuevaReserva;
    }

    async getReservasAdmin() {
        const reservas = await this.reservaRepository.find({});
        return reservas.map(reservaData => new Reserva(reservaData.toObject()));
    }

    async obtenerReservaPorId(id) {
        const reservaData = await this.reservaRepository.findById(id);
        if (!reservaData) {
            throw new Error('Reserva no encontrada');
        }
        return new Reserva(reservaData.toObject());
    }

    async cancel(id) {
        const reserva = await this.obtenerReservaPorId(id);
        if (!reserva) {
            throw new Error('Reserva no encontrada');
        }
        await this.reservaRepository.delete(id);
    }

    async accept(id) {
        const reserva = await this.obtenerReservaPorId(id);
        if (!reserva) {
            throw new Error('Reserva no encontrada');
        }
        reserva.potencialInvalida = false;
        await this.reservaRepository.update(reserva);
    }

    async getReservasByUserId(userId) {
        const reservas = await this.reservaRepository.find({ idPersona: userId });
        return reservas.map(reservaData => new Reserva(reservaData.toObject()));
    }

    esReservaPotencialmenteInvalida(usuario, espacio) {
        if (usuario.rol === 'estudiante' && espacio.categoria !== 'salacomun') {
            return true;
        }
        if ((usuario.rol === 'investigador contratado' || usuario.rol === 'docente investigador') &&
            (usuario.departamento !== espacio.asignadoA && espacio.asignadoA !== 'EINA')) {
            return true;
        }
        if (usuario.rol === 'conserje' && espacio.categoria === 'despacho') {
            return true;
        }
        if (usuario.rol === 'técnico de laboratorio' &&
            ((espacio.categoria !== 'salacomun' && espacio.categoria !== 'laboratorio') ||
            (usuario.departamento !== espacio.asignadoA && espacio.asignadoA !== 'EINA'))) {
            return true;
        }
        return false;
    }

    generarIdUnico() {
        return Math.random().toString(36).substring(2) + Date.now().toString(36);
    }
}

module.exports = ReservaService;
