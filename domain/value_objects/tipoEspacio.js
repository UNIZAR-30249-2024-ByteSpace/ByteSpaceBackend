// domain/value-objects/tipoEspacio.js

class TipoEspacio {
    constructor(tipo) {
        const validTipos = ['salacomun', 'despacho', 'laboratorio', 'aula', 'seminario']; // Agrega los tipos de espacios válidos aquí
        if (!validTipos.includes(tipo)) {
            throw new Error(`Tipo de espacio inválido: ${tipo}`);
        }
        this.tipo = tipo;
    }

    getTipo() {
        return this.tipo;
    }
}

module.exports = TipoEspacio;
