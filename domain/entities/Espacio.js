// domain/entities/espacio.js
const TipoEspacio = require('../value-objects/tipoEspacio');

class Espacio {
    constructor({ id, tamanio, tipo, maxOcupantes, informacion, reservable, categoria, porcentajeOcupacion, planta, asignadoA }) {
        this.id = id;
        this.tamanio = tamanio;
        this.tipo = new TipoEspacio(tipo);
        this.maxOcupantes = maxOcupantes;
        this.informacion = informacion;
        this.reservable = reservable;
        this.categoria = categoria;
        this.porcentajeOcupacion = porcentajeOcupacion;
        this.planta = planta;
        this.asignadoA = asignadoA;
    }
}

module.exports = Espacio;

  