class EspacioRepository {
    /**
     * Crea un nuevo espacio.
     * @param {Espacio} espacio
     * @returns {Promise<Espacio>}
     */
    async create(espacio) {
      throw new Error('Método no implementado');
    }
  
    /**
     * Obtiene un espacio por su ID.
     * @param {String} id
     * @returns {Promise<Espacio>}
     */
    async getById(id) {
      throw new Error('Método no implementado');
    }
  
    /**
     * Actualiza un espacio.
     * @param {Espacio} espacio
     * @returns {Promise<Espacio>}
     */
    async update(espacio) {
      throw new Error('Método no implementado');
    }
  
    /**
     * Elimina un espacio por su ID.
     * @param {String} id
     * @returns {Promise<void>}
     */
    async delete(id) {
      throw new Error('Método no implementado');
    }
  
    /**
     * Lista todos los espacios.
     * @returns {Promise<Espacio[]>}
     */
    async list() {
      throw new Error('Método no implementado');
    }
  }
  
  module.exports = EspacioRepository;
  