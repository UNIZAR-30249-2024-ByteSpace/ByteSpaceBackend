// domain/entities/Espacio.js
const TipoEspacio = require('../value-objects/tipoEspacio');

class Espacio {
    constructor({ id, reservable, categoria, asignadoA, porcentajeOcupacion, tamanio, tipo, maxOcupantes, informacion, planta }) {
        this.id = id;
        this.reservable = reservable;
        this.categoria = categoria;
        this.asignadoA = asignadoA;
        this.porcentajeOcupacion = porcentajeOcupacion;
        this.tamanio = tamanio;
        this.tipo = new TipoEspacio(tipo); // Use the value object here
        this.maxOcupantes = maxOcupantes;
        this.informacion = informacion;
        this.planta = planta;
    }

    getTipo() {
        return this.tipo.getNombre();
    }
}

module.exports = Espacio;
