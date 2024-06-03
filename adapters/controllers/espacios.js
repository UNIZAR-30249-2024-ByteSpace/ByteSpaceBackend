// src/interfaces/controllers/EspacioController.js
const EspacioService = require('../../application/services/espacio');

class EspacioController {
  constructor() {
    this.espacioService = new EspacioService();
  }

  /**
   * Crea una reserva para un espacio específico.
   */
  async crearReserva(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;
      const result = await this.espacioService.crearReserva(id, data);
      if (result.error) {
        return res.status(400).json({ error: result.error });
      }
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Obtiene todos los espacios reservables.
   */
  async obtenerEspaciosReservables(req, res) {
    try {
      const espacios = await this.espacioService.obtenerEspaciosReservables();
      res.status(200).json(espacios);
    } catch (error) {
      console.error('Error al obtener espacios reservables:', error);
      res.status(500).json({ error: 'Error al obtener espacios reservables' });
    }
  }

  /**
   * Obtiene un espacio por su ID.
   */
  async obtenerEspacioPorId(req, res) {
    try {
      const { id } = req.params;
      const espacio = await this.espacioService.obtenerEspacioPorId(id);

      if (!espacio) {
        return res.status(404).json({ error: 'Espacio no encontrado' });
      }

      res.status(200).json(espacio);
    } catch (error) {
      console.error('Error al obtener el espacio:', error);
      res.status(500).json({ error: 'Error al obtener el espacio' });
    }
  }

  /**
   * Filtra los espacios según los parámetros de consulta.
   */
  async filtrarEspacios(req, res) {
    try {
      const espaciosFiltrados = await this.espacioService.filtrarEspacios(req.query);
      res.status(200).json(espaciosFiltrados);
    } catch (error) {
      console.error('Error al filtrar los espacios:', error);
      res.status(500).json({ error: 'Error al filtrar los espacios' });
    }
  }

  /**
   * Actualiza la información de un espacio.
   */
  async actualizarEspacio(req, res) {
    try {
      const updatedEspacio = await this.espacioService.actualizarEspacio(req.body);
      res.status(200).json(updatedEspacio);
    } catch (error) {
      console.error('Error al actualizar el espacio:', error);
      res.status(500).json({ error: 'Error al actualizar el espacio' });
    }
  }

}

module.exports = EspacioController;
