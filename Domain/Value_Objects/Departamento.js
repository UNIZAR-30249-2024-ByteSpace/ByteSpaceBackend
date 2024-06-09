// domain/value-objects/departamento.js

class Departamento {
    constructor(nombre) {
        const validDepartments = [
            'informática e ingeniería de sistemas',
            'ingeniería electrónica y comunicaciones'
        ]; // Agrega los departamentos válidos aquí
        
        if (nombre && !validDepartments.includes(nombre)) {
            throw new Error(`Departamento inválido: ${nombre}`);
        }
        this.nombre = nombre || null; // Permitir que el nombre sea nulo si no se proporciona
    }

    getNombre() {
        return this.nombre;
    }
}

module.exports = Departamento;
