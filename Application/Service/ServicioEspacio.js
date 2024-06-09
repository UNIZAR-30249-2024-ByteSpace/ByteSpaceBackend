// services/EspacioService.js
const Espacio = require('../../Domain/Model/Espacio.js');
const MongoEspacioRepository = require('../../Infrastructure/Repositories/MongoEspacioRepository.js');


class EspacioService {
    constructor() {
        this.espacioRepository = new MongoEspacioRepository();
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
