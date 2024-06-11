// services/ReservaService.js
const MongoReservaRepository = require('../../Infrastructure/Repositories/MongoReservaRepository.js');
const MongoEspacioRepository = require('../../Infrastructure/Repositories/MongoEspacioRepository.js');
const MongoUsuarioRepository = require('../../Infrastructure/Repositories/MongoUsuarioRepository.js');
const Reserva = require('../../Domain/Model/Reserva.js');
const Espacio = require('../../Domain/Model/Espacio.js');
const Usuario = require('../../Domain/Model/Usuario.js');
const PoliticaReserva = require('../../Domain/Value_objects/PoliticaReserva.js');

class ReservaService {
    constructor() {
        this.reservaRepository = new MongoReservaRepository();
        this.espacioRepository = new MongoEspacioRepository();
        this.usuarioRepository = new MongoUsuarioRepository();
        this.politicaReserva = new PoliticaReserva();
    }

    async crearReserva({ idUsuario, idEspacio, fecha, horaInicio, horaFin, asistentes }) {
        const usuarioDoc = await this.usuarioRepository.findById(idUsuario);
        console.log("idEspacio: "+idEspacio)
        const espacioDoc = await this.espacioRepository.findById(idEspacio);

        if (!usuarioDoc ) {
            throw new Error('Usuario no encontrado');
        }

        if (!espacioDoc) {
            throw new Error('Espacio no encontrado');
        }

        const usuario = new Usuario(usuarioDoc);
        const espacio = new Espacio(espacioDoc);
        console.log("Paso 1  ")
        const maxCapacity = espacio.tamanio * (espacio.porcentajeOcupacion / 100);
        if (asistentes > maxCapacity) {
            throw new Error('El número de asistentes excede la capacidad del espacio');
        }

        const fechaInicio = new Date(fecha);
        console.log("Paso 2  ")
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
        console.log("Paso 3  ")
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
        console.log("Paso 4  ")
        if (horaInicio < espacio.horaInicio || horaFin > espacio.horaFin) {
            throw new Error('El espacio no está disponible en el horario solicitado');
        }
        console.log("Paso 5  ")
        await this.reservaRepository.save(nuevaReserva);
        return nuevaReserva;
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

    async accept(id) {
        const reserva = await this.obtenerReservaPorId(id);
        if (!reserva) {
            throw new Error('Reserva no encontrada');
        }
        //reserva.potencialInvalida = false;
        const updatedReserva = await this.reservaRepository.update(id, { potencialInvalida: false });
        return updatedReserva;
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
