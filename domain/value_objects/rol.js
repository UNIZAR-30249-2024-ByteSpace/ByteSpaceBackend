// domain/value-objects/rol.js

class Rol {
    constructor(nombre) {
        const validRoles = ['estudiante', 'docente-investigador', 'investigador contratado', 'conserje', 'tecnico de laboratorio', 'gerente', 'gerente-docente-investigador']; // Agrega los roles válidos aquí
        if (!validRoles.includes(nombre)) {
            throw new Error(`Rol inválido: ${nombre}`);
        }
        this.nombre = nombre;
    }

    getNombre() {
        return this.nombre;
    }
}

module.exports = Rol;
