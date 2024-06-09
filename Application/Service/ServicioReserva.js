// services/ReservaService.js
const MongoReservaRepository = require('../../Infrastructure/Repositories/MongoReservaRepository.js');
const MongoEspacioRepository = require('../../Infrastructure/Repositories/MongoEspacioRepository.js');
const MongoUsuarioRepository = require('../../Infrastructure/Repositories/MongoUsuarioRepository.js');

class ReservaService {
    constructor() {
        this.reservaRepository = new MongoReservaRepository();
        this.espacioRepository = new MongoEspacioRepository();
        this.usuarioRepository = new MongoUsuarioRepository();
    }

    async crearReserva({ idUsuario, idEspacio, fecha, horaInicio, horaFin, asistentes }) {
        const usuario = await this.usuarioRepository.findById( idUsuario );
        const espacio = await this.espacioRepository.findById(idEspacio);

        if (!usuario || !espacio) {
            throw new Error('Usuario o espacio no encontrado');
        }

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

        const nuevaReserva = {
            id: this.generarIdUnico(),
            horaInicio,
            horaFin,
            fecha: fechaInicio,
            idPersona: idUsuario,
            idEspacio,
            potencialInvalida: this.esReservaPotencialmenteInvalida(usuario, espacio),
            asistentes,
            timestamp: Date.now()
        };

        await this.reservaRepository.save(nuevaReserva);
        return nuevaReserva;
    }

    async getReservasAdmin() {
        return await this.reservaRepository.find({});
    }

    async obtenerReservaPorId(id) {
        const reserva = await this.reservaRepository.findById(id);
        if (!reserva) {
            throw new Error('Reserva no encontrada');
        }
        return reserva;
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
        await this.reservaRepository.save(reserva); // Asumiendo que hay un método save para guardar la reserva
    }

    async getReservasByUserId(userId) {
        // Implementa la lógica para obtener las reservas de un usuario específico
        // Puedes usar el método find del repositorio de reservas para buscar las reservas asociadas al userId
        // Por ejemplo:
        const reservas = await this.reservaRepository.find({ idPersona: userId });
        return reservas;
    }

    esReservaPotencialmenteInvalida(usuario, espacio) {
        console.log('Usuario:', usuario);
        console.log('Espacio:', espacio);
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
