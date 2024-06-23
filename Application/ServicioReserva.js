// services/ReservaService.js
const MongoReservaRepository = require('../Infrastructure/Repositories/MongoReservaRepository.js');
const MongoEspacioRepository = require('../Infrastructure/Repositories/MongoEspacioRepository.js');
const MongoUsuarioRepository = require('../Infrastructure/Repositories/MongoUsuarioRepository.js');
const Reserva = require('../Domain/Model/Reserva.js');
const Espacio = require('../Domain/Model/Espacio.js');
const Usuario = require('../Domain/Model/Usuario.js');
const PoliticaReserva = require('../Domain/Value_objects/PoliticaReserva.js');
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

    esReservaPotencialmenteInvalida(usuario, espacio) {
        return this.politicaReserva.esReservaPotencialmenteInvalida(usuario, espacio);
    }

    generarIdUnico() {
        return Math.random().toString(36).substring(2) + Date.now().toString(36);
    }
}

module.exports = ReservaService;
