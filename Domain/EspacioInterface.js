// repositories/EspacioInterface.js
class EspacioInterface {
    async find(query) {
        throw new Error('Method not implemented');
    }

    async findById(id) {
        throw new Error('Method not implemented');
    }

    async save(espacio, session = null) {
        throw new Error('Method not implemented');
    }

    async update(id, updatedData, session = null) {
        throw new Error('Method not implemented');
    }
}

module.exports = EspacioInterface;
