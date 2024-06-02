const EspacioModelo = require('../../models/EspacioModelo');
const EspacioRepository = require('../../domain/repositories/EspacioRepository');

class MongoEspacioRepository extends EspacioRepository {
  async create(espacio) {
    const espacioDoc = new EspacioModelo({
      id: espacio.id,
      tamanio: espacio.tamanio,
      tipo: espacio.tipo,
      maxOcupantes: espacio.maxOcupantes,
      informacion: espacio.informacion,
      reservable: espacio.reservable,
      categoria: espacio.categoria,
      porcentajeOcupacion: espacio.porcentajeOcupacion,
      planta: espacio.planta,
      asignadoA: espacio.asignadoA
    });
    return await espacioDoc.save();
  }

  async getById(id) {
    const espacioDoc = await EspacioModelo.findOne({ id });
    return espacioDoc ? espacioDoc.toObject() : null;
  }

  async update(espacio) {
    const espacioDoc = await EspacioModelo.findOneAndUpdate(
      { id: espacio.id },
      {
        tamanio: espacio.tamanio,
        tipo: espacio.tipo,
        maxOcupantes: espacio.maxOcupantes,
        informacion: espacio.informacion,
        reservable: espacio.reservable,
        categoria: espacio.categoria,
        porcentajeOcupacion: espacio.porcentajeOcupacion,
        planta: espacio.planta,
        asignadoA: espacio.asignadoA
      },
      { new: true }
    );
    return espacioDoc ? espacioDoc.toObject() : null;
  }

  async delete(id) {
    await EspacioModelo.deleteOne({ id });
  }

  async list() {
    const espaciosDocs = await EspacioModelo.find();
    return espaciosDocs.map(doc => doc.toObject());
  }
}

module.exports = MongoEspacioRepository;
