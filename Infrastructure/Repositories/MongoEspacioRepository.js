// repositories/MongoEspacioRepository.js
const EspacioRepository = require('../../Domain/Repositories/EspacioRepository.js');
const EspacioModelo = require('../Models/modelo.espacio.js');
const Espacio = require('../../Domain/Model/Espacio');

class MongoEspacioRepository extends EspacioRepository {
    async find(query) {
        const espacios = await EspacioModelo.find(query);
        return espacios.map(espacio => new Espacio(espacio.toObject()));
    }

    async findById(id) {
        const espacioDoc = await EspacioModelo.findOne({ id });
        return espacioDoc ? new Espacio(espacioDoc.toObject()) : null;
    }

    async save(espacio) {
        const nuevoEspacio = new EspacioModelo(espacio);
        const savedEspacio = await nuevoEspacio.save();
        return new Espacio(savedEspacio.toObject());
    }

    async update(id, updatedData) {
        const updatedEspacio = await EspacioModelo.findOneAndUpdate(
            { id: id },
            { $set: updatedData },
            { new: true }
        );
        return updatedEspacio ? new Espacio(updatedEspacio.toObject()) : null;
    }
}

module.exports = MongoEspacioRepository;
