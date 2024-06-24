// services/ReservaService.js
const MongoReservaRepository = require('../Infrastructure/Repositories/MongoReservaRepository.js');
const MongoEspacioRepository = require('../Infrastructure/Repositories/MongoEspacioRepository.js');
const MongoUsuarioRepository = require('../Infrastructure/Repositories/MongoUsuarioRepository.js');
const Reserva = require('../Domain/Reserva.js');
const Espacio = require('../Domain/EspacioAgregado.js');
const Usuario = require('../Domain/Usuario.js');
const PoliticaReserva = require('../Domain/PoliticaReserva.js');
const mongoose = require('mongoose');

class ReservaService {
    constructor() {
        this.reservaRepository = new MongoReservaRepository();
        this.espacioRepository = new MongoEspacioRepository();
        this.usuarioRepository = new MongoUsuarioRepository();
        this.politicaReserva = new PoliticaReserva();
    }

    async crearReserva({ idUsuario, idEspacio, fecha, horaInicio, horaFin, asistentes }) {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const usuarioDoc = await this.usuarioRepository.findById(idUsuario, session);
            const espacioDoc = await this.espacioRepository.findById(idEspacio, session);

            if (!usuarioDoc) {
                throw new Error('Usuario no encontrado');
            }

            if (!espacioDoc) {
                throw new Error('Espacio no encontrado');
            }

            const usuario = new Usuario(usuarioDoc);
            const espacio = new Espacio(espacioDoc);

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
            }, session);

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

            if (horaInicio < espacio.horaInicio || horaFin > espacio.horaFin) {
                throw new Error('El espacio no está disponible en el horario solicitado');
            }

            await this.reservaRepository.save(nuevaReserva, session);
            await session.commitTransaction();
            return nuevaReserva;
        } catch (error) {
            await session.abortTransaction();
            throw error;
        } finally {
            session.endSession();
        }
    }

    async getReservasAdmin() {
        const reservas = await this.reservaRepository.find({});
        return reservas.map(reservaData => new Reserva(reservaData));
    }

    async obtenerReservaPorId(id) {
        const reservaData = await this.reservaRepository.findById(id);
        if (!reservaData) {
            throw new Error('Reserva no encontrada');
        }
        return new Reserva(reservaData);
    }

    async cancel(id) {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const reserva = await this.obtenerReservaPorId(id);
            if (!reserva) {
                throw new Error('Reserva no encontrada');
            }
            await this.reservaRepository.delete(id, session);
            await session.commitTransaction();
        } catch (error) {
            await session.abortTransaction();
            throw error;
        } finally {
            session.endSession();
        }
    }

    async accept(id) {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const reserva = await this.obtenerReservaPorId(id);
            if (!reserva) {
                throw new Error('Reserva no encontrada');
            }
            const updatedReserva = await this.reservaRepository.update(id, { potencialInvalida: false }, session);
            await session.commitTransaction();
            return updatedReserva;
        } catch (error) {
            await session.abortTransaction();
            throw error;
        } finally {
            session.endSession();
        }
    }

    async getReservasByUserId(userId) {
        const reservas = await this.reservaRepository.find({ idPersona: userId });
        return reservas.map(reservaData => new Reserva(reservaData));
    }

    async eliminarReservasPotencialmenteInvalidas() {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const reservas = await this.reservaRepository.find({}, session);
            const fechaActual = new Date();
            const reservasPotencialmenteInvalidas = reservas.filter(reserva => {
                const fechaReserva = new Date(reserva.fecha);
                const diferenciaEnDiasDesdeTimestamp = Math.ceil((fechaActual - new Date(reserva.timestamp)) / (1000 * 60 * 60 * 24));
                return (fechaReserva <= fechaActual || diferenciaEnDiasDesdeTimestamp > 7);
            });

            let reservasEliminadas = 0;
            const usuariosEliminados = [];

            for (const reserva of reservasPotencialmenteInvalidas) {
                await this.reservaRepository.delete(reserva.id, session);
                reservasEliminadas++;
                usuariosEliminados.push(reserva.idPersona);
            }

            await session.commitTransaction();

            return { reservasEliminadas, usuariosEliminados };
        } catch (error) {
            await session.abortTransaction();
            throw error;
        } finally {
            session.endSession();
        }
    }

    esReservaPotencialmenteInvalida(usuario, espacio) {
        return this.politicaReserva.esReservaPotencialmenteInvalida(usuario, espacio);
    }

    generarIdUnico() {
        return Math.random().toString(36).substring(2) + Date.now().toString(36);
    }
}

module.exports = ReservaService;
