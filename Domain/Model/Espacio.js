// domain/entities/Espacio.js
class Espacio {
    constructor({ id, reservable, categoria, asignadoA, porcentajeOcupacion, tamanio, tipo, maxOcupantes, informacion, planta }) {
        this.id = id;
        this.reservable = reservable;
        this.categoria = categoria;
        this.asignadoA = asignadoA;
        this.porcentajeOcupacion = porcentajeOcupacion;
        this.tamanio = tamanio;
        this.tipo = tipo;
        this.maxOcupantes = maxOcupantes;
        this.informacion = informacion;
        this.planta = planta;
    }
}

module.exports = Espacio;
