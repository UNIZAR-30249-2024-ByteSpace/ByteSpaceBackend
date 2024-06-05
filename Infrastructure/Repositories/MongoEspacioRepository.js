// repositories/MongoEspacioRepository.js
const EspacioRepository = require('../../Domain/Repositories/EspacioRepository.js');
const EspacioModelo = require('../../modelos/modelo.espacio.js');

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

    async update(espacio) {
        return await EspacioModelo.findOneAndUpdate({ id: espacio.id }, espacio, { new: true });
    }
}

module.exports = MongoEspacioRepository;
