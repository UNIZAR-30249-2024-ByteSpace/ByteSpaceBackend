// src/domain/repositories/ReservaRepository.js

class ReservaRepository {
    /**
     * Crea una nueva reserva.
     * @param {Reserva} reserva
     * @returns {Promise<Reserva>}
     */
    async create(reserva) {
      throw new Error('Método no implementado');
    }
  
    /**
     * Obtiene una reserva por su ID.
     * @param {String} id
     * @returns {Promise<Reserva>}
     */
    async getById(id) {
      throw new Error('Método no implementado');
    }
  
    /**
     * Actualiza una reserva.
     * @param {Reserva} reserva
     * @returns {Promise<Reserva>}
     */
    async update(reserva) {
      throw new Error('Método no implementado');
    }
  
    /**
     * Elimina una reserva por su ID.
     * @param {String} id
     * @returns {Promise<void>}
     */
    async delete(id) {
      throw new Error('Método no implementado');
    }
  
    /**
     * Lista todas las reservas.
     * @returns {Promise<Reserva[]>}
     */
    async list() {
      throw new Error('Método no implementado');
    }
  }
  
  module.exports = ReservaRepository;
  