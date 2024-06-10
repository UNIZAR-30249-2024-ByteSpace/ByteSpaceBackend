class PoliticaReserva {
    
    esReservaPotencialmenteInvalida(usuario, espacio) {
        if (usuario.rol === 'estudiante' && espacio.categoria !== 'salacomun') {
            return true;
        }
        if ((usuario.rol === 'investigador contratado' || usuario.rol === 'docente investigador') &&
            (!usuario.departamento || !espacio.asignadoA || !usuario.departamento.includes(espacio.asignadoA))) {
            return true;
        }
        if (usuario.rol === 'conserje' && espacio.categoria === 'despacho') {
            return true;
        }
        if (usuario.rol === 'técnico de laboratorio' &&
            ((espacio.categoria !== 'salacomun' && espacio.categoria !== 'laboratorio') ||
            (!usuario.departamento || !espacio.asignadoA || !usuario.departamento.includes(espacio.asignadoA)))) {
            return true;
        }
        return false;
    }
}

module.exports = PoliticaReserva;
