// repositories/MongoEspacioRepository.js
const EspacioRepository = require('../../Domain/Repositories/EspacioRepository.js');
const EspacioModelo = require('../models/modelo.espacio.js');

class MongoEspacioRepository extends EspacioRepository {
    async find(query) {
        return await EspacioModelo.find(query);
    }

    async findById(id) {
        return await EspacioModelo.findOne({ id });
    }

    async save(espacio) {
        const nuevoEspacio = new EspacioModelo(espacio);
        return await nuevoEspacio.save();
    }

    async update(id, updatedData) {
        return await EspacioModelo.findOneAndUpdate({ id: id }, { $set: updatedData }, { new: true });
    }
    
}

module.exports = MongoEspacioRepository;
