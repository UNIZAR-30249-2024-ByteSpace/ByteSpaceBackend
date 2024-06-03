const EspacioModelo = require('../models/espacio');
const EspacioRepository = require('../../../domain/repository/espacio');

class MongoEspacioRepository extends EspacioRepository {

  async obtenerEspaciosReservables() {
    // Busca en la base de datos todos los espacios marcados como reservables
    const espacios = await EspacioModelo.find({ reservable: true });
    // Convierte los documentos de espacios encontrados en objetos y los devuelve
    return espacios.map(espacio => espacio.toObject());
  }
  
  /**
   * Obtiene un espacio por su ID.
   * @param {string} id - ID del espacio a buscar.
   * @returns {Promise<Espacio|null>} - Una promesa que resuelve en un objeto Espacio o null si no se encuentra.
   */
  async obtenerEspacioPorId(id) {
    // Busca en la base de datos un espacio por su ID
    const espacioDoc = await EspacioModelo.findOne({ id });
    // Si se encuentra un espacio, lo convierte a un objeto, si no, devuelve null
    return espacioDoc ? espacioDoc.toObject() : null;
  }

/**
 * Filtra los espacios según los parámetros de consulta.
 * @param {Object} query - Objeto con los parámetros de consulta.
 * @returns {Promise<Espacio[]>} - Una promesa que resuelve en un array de objetos Espacio que cumplen con los criterios de filtrado.
 */
  async filtrarEspacios(query) {
    const espacios = await EspacioModelo.find(query);
    return espacios.map(espacio => espacio.toObject());
}

/**
 * Actualiza la información de un espacio en la base de datos.
 * @param {object} data - Datos actualizados del espacio.
 * @returns {Promise<object|null>} - Una promesa que resuelve en un objeto con la información del espacio actualizado o null si no se encuentra.
 */
async actualizarEspacio(data) {
  const updatedEspacio = await EspacioModelo.findOneAndUpdate(
      { id: data.id },
      {
          tamanio: data.tamanio,
          tipo: data.tipo,
          maxOcupantes: data.maxOcupantes,
          informacion: data.informacion,
          reservable: data.reservable,
          categoria: data.categoria,
          porcentajeOcupacion: data.porcentajeOcupacion,
          planta: data.planta,
          asignadoA: data.asignadoA
      },
      { new: true }
  );
  return updatedEspacio ? updatedEspacio.toObject() : null;
}

}

module.exports = MongoEspacioRepository;
