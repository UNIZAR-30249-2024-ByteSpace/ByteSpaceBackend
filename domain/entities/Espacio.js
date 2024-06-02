// src/domain/entities/Espacio.js

class Espacio {
    constructor({ id, tamanio, tipo, maxOcupantes, informacion, reservable, categoria, porcentajeOcupacion, planta, asignadoA }) {
      this.id = id;
      this.tamanio = tamanio;
      this.tipo = tipo;
      this.maxOcupantes = maxOcupantes;
      this.informacion = informacion;
      this.reservable = reservable;
      this.categoria = categoria || null;
      this.porcentajeOcupacion = porcentajeOcupacion || null;
      this.planta = planta;
      this.asignadoA = asignadoA || null;
  
      this.validate();
    }
  
    // Métodos y validaciones de negocio
    validate() {
      if (!this.id) {
        throw new Error('ID es requerido');
      }
      if (typeof this.tamanio !== 'number' || this.tamanio <= 0) {
        throw new Error('Tamaño debe ser un número positivo');
      }
      if (!this.tipo) {
        throw new Error('Tipo es requerido');
      }
      if (typeof this.maxOcupantes !== 'number' || this.maxOcupantes <= 0) {
        throw new Error('Máximo de ocupantes debe ser un número positivo');
      }
      if (!this.informacion) {
        throw new Error('Información es requerida');
      }
      if (typeof this.reservable !== 'boolean') {
        throw new Error('Reservable debe ser un valor booleano');
      }
      if (typeof this.planta !== 'number' || this.planta <= 0) {
        throw new Error('Planta debe ser un número positivo');
      }
    }
  
    // Métodos adicionales para lógica de negocio
    isAvailable() {
      return this.reservable && (!this.asignadoA);
    }
  }
  
  module.exports = Espacio;
  