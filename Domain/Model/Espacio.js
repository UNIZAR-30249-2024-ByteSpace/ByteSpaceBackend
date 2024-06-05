// domain/entities/Espacio.js
class Espacio {
    constructor({ id, reservable, categoria, asignadoA, porcentajeOcupacion, tamanio }) {
        this.id = id;
        this.reservable = reservable;
        this.categoria = categoria;
        this.asignadoA = asignadoA;
        this.porcentajeOcupacion = porcentajeOcupacion;
        this.tamanio = tamanio;
    }
}

module.exports = Espacio;
