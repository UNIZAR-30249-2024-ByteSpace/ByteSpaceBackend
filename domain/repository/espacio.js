class EspacioRepository {
  /**
    * Obtiene todos los espacios reservables.
    * @returns {Promise<Espacio[]>} - Una promesa que resuelve en un array de objetos Espacio.
    */
  async obtenerEspaciosReservables() {
    throw new Error('Método no implementado');
  }

  /**
     * Obtiene un espacio por su ID.
     * @param {string} id - ID del espacio a buscar.
     * @returns {Promise<Espacio|null>} - Una promesa que resuelve en un objeto Espacio o null si no se encuentra.
     */
  async obtenerEspacioPorId(id) {
    throw new Error('Método no implementado');
  }

  /**
      * Filtra los espacios según los parámetros de consulta.
      * @param {Object} query - Objeto con los parámetros de consulta.
      * @returns {Promise<Espacio[]>} - Una promesa que resuelve en un array de objetos Espacio que cumplen con los criterios de filtrado.
      */
    async filtrarEspacios(query) {
      throw new Error('Método no implementado');
    }

  /**
   * Actualiza la información de un espacio.
   * @param {object} data - Datos actualizados del espacio.
   * @returns {Promise<Espacio>} - Una promesa que resuelve en un objeto Espacio con la información actualizada.
   */
  async actualizarEspacio(data) {
    throw new Error('Método no implementado');
  }

}

module.exports = EspacioRepository;  