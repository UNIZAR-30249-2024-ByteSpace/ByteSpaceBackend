// domain/value-objects/tipoEspacio.js

class TipoEspacio {
    constructor(nombre) {
        const validTypes = ['salacomun', 'laboratorio', 'despacho', 'seminario', 'aula'];
        if (!validTypes.includes(nombre)) {
            throw new Error(`Tipo de espacio inválido: ${nombre}`);
        }
        this.nombre = nombre;
    }

    getNombre() {
        return this.nombre;
    }
}

module.exports = TipoEspacio;
