// services/EspacioService.js
const Espacio = require('../Domain/EspacioAgregado.js');
const MongoEspacioRepository = require('../Infrastructure/Repositories/MongoEspacioRepository.js');
const mongoose = require('mongoose');

class EspacioService {
    constructor() {
        this.espacioRepository = new MongoEspacioRepository();
    }

    async obtenerEspaciosReservables() {
        const espacios = await this.espacioRepository.find({ reservable: true });
        return espacios.map(espacioData => new Espacio(espacioData).toSpaceDTO);
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

    async actualizarEspacio(id, updatedData) {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const existingEspacio = await this.espacioRepository.update(id, updatedData, session);
            if (!existingEspacio) {
                throw new Error('Espacio no encontrado');
            }
            await session.commitTransaction();
            return new Espacio(existingEspacio);
        } catch (error) {
            await session.abortTransaction();
            throw error;
        } finally {
            session.endSession();
        }
    }

    generarIdUnico() {
        return Math.random().toString(36).substring(2) + Date.now().toString(36);
    }
}

module.exports = EspacioService;
