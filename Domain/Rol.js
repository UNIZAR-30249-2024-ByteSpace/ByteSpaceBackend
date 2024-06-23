// Value object

class Rol {
    constructor(nombre) {
        const validRoles = ['estudiante', 'docente-investigador', 'investigador contratado', 'conserje', 'técnico de laboratorio', 'gerente', 'gerente-docente-investigador'];
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
