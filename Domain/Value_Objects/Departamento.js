// domain/value-objects/departamento.js

class Departamento {
    constructor(nombre) {
        const validDepartments = [
            'informática e ingeniería de sistemas',
            'ingeniería electrónica y comunicaciones'
        ]; // Agrega los departamentos válidos aquí
        if (!validDepartments.includes(nombre)) {
            throw new Error(`Departamento inválido: ${nombre}`);
        }
        this.nombre = nombre;
    }

    getNombre() {
        return this.nombre;
    }
}

module.exports = Departamento;