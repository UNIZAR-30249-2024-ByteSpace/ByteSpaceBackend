// \application\services\espacio.js
const MongoEspacioRepository = require('../../infrastructure/repositories/MongoEspacioRepository');
const Espacio = require('../../domain/entities/Espacio');
const TipoEspacio = require('../../domain/value-objects/tipoEspacio');
const Rol = require('../../domain/value-objects/rol');
const Departamento = require('../../domain/value-objects/departamento');

class EspacioService {
  constructor() {
    this.espacioRepository = new MongoEspacioRepository(); // Utiliza el repositorio de Mongo
  }

  /**
   * Obtiene todos los espacios reservables.
   * @returns {Promise<Array<Espacio>>} - Una promesa que resuelve en un array de objetos Espacio.
   */
  async obtenerEspaciosReservables() {
    const espacios = await this.espacioRepository.obtenerEspaciosReservables();
    return espacios.map(espacio => new Espacio({
      id: espacio.id,
      tamanio: espacio.tamanio,
      tipo: new TipoEspacio(espacio.tipo),
      maxOcupantes: espacio.maxOcupantes,
      informacion: espacio.informacion,
      reservable: espacio.reservable,
      categoria: espacio.categoria,
      porcentajeOcupacion: espacio.porcentajeOcupacion,
      planta: espacio.planta,
      asignadoA: espacio.asignadoA,
    }));
  }

  /**
   * Obtiene un espacio por su ID.
   * @param {string} id - ID del espacio a buscar.
   * @returns {Promise<Espacio|null>} - Una promesa que resuelve en un objeto Espacio o null si no se encuentra.
   */
  async obtenerEspacioPorId(id) {
    const espacio = await this.espacioRepository.obtenerEspacioPorId(id);
    if (!espacio) {
      return null;
    }
    return new Espacio({
      id: espacio.id,
      tamanio: espacio.tamanio,
      tipo: new TipoEspacio(espacio.tipo),
      maxOcupantes: espacio.maxOcupantes,
      informacion: espacio.informacion,
      reservable: espacio.reservable,
      categoria: espacio.categoria,
      porcentajeOcupacion: espacio.porcentajeOcupacion,
      planta: espacio.planta,
      asignadoA: espacio.asignadoA,
    });
  }

  /**
   * Filtra los espacios según los parámetros de consulta.
   * @param {object} query - Parámetros de consulta para filtrar los espacios.
   * @returns {Promise<Array<Espacio>>} - Una promesa que resuelve en un array de objetos Espacio.
   */
  async filtrarEspacios(query) {
    const espacios = await this.espacioRepository.filtrarEspacios(query);
    return espacios.map(espacio => new Espacio({
      id: espacio.id,
      tamanio: espacio.tamanio,
      tipo: new TipoEspacio(espacio.tipo),
      maxOcupantes: espacio.maxOcupantes,
      informacion: espacio.informacion,
      reservable: espacio.reservable,
      categoria: espacio.categoria,
      porcentajeOcupacion: espacio.porcentajeOcupacion,
      planta: espacio.planta,
      asignadoA: espacio.asignadoA,
    }));
  }

  /**
   * Crea una reserva para un espacio específico.
   * @param {string} id - ID del espacio para el cual se va a crear la reserva.
   * @param {object} data - Datos de la reserva.
   * @returns {Promise<object>} - Una promesa que resuelve en un objeto con el resultado de la operación.
   */
  async crearReserva(id, data) {
    // Lógica para crear la reserva...
  }

  /**
   * Actualiza la información de un espacio.
   * @param {object} data - Datos actualizados del espacio.
   * @returns {Promise<Espacio>} - Una promesa que resuelve en un objeto Espacio con la información actualizada.
   */
  async actualizarEspacio(data) {
    const updatedEspacio = await this.espacioRepository.actualizarEspacio(data);
    return new Espacio({
      id: updatedEspacio.id,
      tamanio: updatedEspacio.tamanio,
      tipo: new TipoEspacio(updatedEspacio.tipo),
      maxOcupantes: updatedEspacio.maxOcupantes,
      informacion: updatedEspacio.informacion,
      reservable: updatedEspacio.reservable,
      categoria: updatedEspacio.categoria,
      porcentajeOcupacion: updatedEspacio.porcentajeOcupacion,
      planta: updatedEspacio.planta,
      asignadoA: updatedEspacio.asignadoA,
    });
  }
}

module.exports = EspacioService;
