// repositories/MongoEspacioInterface.js
const EspacioInterface = require('../../Domain/EspacioInterface.js');
const EspacioModelo = require('../ModelsDB/modelo.espacio.js');
const Espacio = require('../../Domain/Espacio.js');

class MongoEspacioRepository extends EspacioInterface {
    async find(query) {
        const espacios = await EspacioModelo.find(query);
        return espacios.map(espacio => new Espacio(espacio));
    }

    async findById(id) {
        const espacioDoc = await EspacioModelo.findOne({ id });
        return espacioDoc ? new Espacio(espacioDoc) : null;
    }

    async save(espacio, session = null) {
        const nuevoEspacio = new EspacioModelo(espacio);
        const savedEspacio = session
            ? await nuevoEspacio.save({ session })
            : await nuevoEspacio.save();
        return new Espacio(savedEspacio.toObject());
    }

    async update(id, updatedData, session = null) {
        const updatedEspacio = session
            ? await EspacioModelo.findOneAndUpdate(
                { id: id },
                { $set: updatedData },
                { new: true }
            ).session(session).exec()
            : await EspacioModelo.findOneAndUpdate(
                { id: id },
                { $set: updatedData },
                { new: true }
            ).exec();
        return updatedEspacio ? new Espacio(updatedEspacio.toObject()) : null;
    }
}

module.exports = MongoEspacioRepository;
