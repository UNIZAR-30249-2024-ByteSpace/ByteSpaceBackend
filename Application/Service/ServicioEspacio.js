// services/EspacioService.js
const Espacio = require('../../Domain/Model/Espacio.js');
const MongoReservaRepository = require('../../Infrastructure/Repositories/MongoReservaRepository.js');
const MongoEspacioRepository = require('../../Infrastructure/Repositories/MongoEspacioRepository.js');
const UsuarioModelo = require('../../modelos/modelo.usuario.js');

class EspacioService {
    constructor() {
        this.espacioRepository = new MongoEspacioRepository();
        this.reservaRepository = new MongoReservaRepository();
    }

    async obtenerEspaciosReservables() {
        const espacios = await this.espacioRepository.find({ reservable: true });
        return espacios.map(espacioData => new Espacio(espacioData));
    }

    async obtenerEspacioPorId(id) {
        const espacioData = await this.espacioRepository.findById(id);
        if (!espacioData) {
            throw new Error('Espacio no encontrado');
        }
        return new Espacio(espacioData);
    }

    async filtrarEspacios(queryParams) {
        const { id, categoria, planta, capacidad } = queryParams;
        const query = {};

        if (id) {
            query.id = id;
        } else {
            if (categoria) {
                query.categoria = categoria;
            }
            if (planta) {
                query.planta = parseInt(planta, 10);
            }
            if (capacidad) {
                query.maxOcupantes = { $gt: parseInt(capacidad, 10) };
            }
        }

        const espacios = await this.espacioRepository.find(query);
        return espacios.map(espacioData => new Espacio(espacioData));
    }

    async crearReserva({ idUsuario, idEspacio, fecha, horaInicio, horaFin, asistentes }) {
        const usuario = await UsuarioModelo.findOne({ id: idUsuario });
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

    async actualizarEspacio(id, updatedData) {
        console.log("UPDATED DATA: " + updatedData);
        console.log("ID: " + id);
        
        const existingEspacio = await this.espacioRepository.update(id, updatedData);
        
        if (!existingEspacio) {
            throw new Error('Espacio no encontrado');
        }
        
        return new Espacio(existingEspacio); // Devolver el espacio actualizado
    }
    

    esReservaPotencialmenteInvalida(usuario, espacio) {
        // Lógica para determinar si una reserva es potencialmente inválida
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
        if (usuario.rol === 'tecnico de laboratorio' &&
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

module.exports = EspacioService;
