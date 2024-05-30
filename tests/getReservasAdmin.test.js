const { getReservasAdmin } = require('../controladores/controlador.reservas');
const ReservaModel = require('../modelos/modelo.reserva');

// Mock para simular una solicitud
const req = {};
// Mock para simular una respuesta
const res = {
  status: jest.fn(() => res),
  json: jest.fn(),
};

// Mock para las reservas de ejemplo
const reservasEjemplo = [
  { id: 'reserva-1', horaInicio: 10, horaFin: 12, fecha: new Date(), idPersona: 'usuario-1', idEspacio: 'espacio-1', potencialInvalida: false, asistentes: 5, timestamp: new Date() },
  { id: 'reserva-2', horaInicio: 14, horaFin: 16, fecha: new Date(), idPersona: 'usuario-2', idEspacio: 'espacio-2', potencialInvalida: true, asistentes: 3, timestamp: new Date() },
];

// Mock para la función find de Mongoose (ReservaModel)
ReservaModel.find = jest.fn().mockResolvedValue(reservasEjemplo);

describe('Pruebas para la función getReservasAdmin', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('debería obtener las reservas del administrador correctamente', async () => {
    await getReservasAdmin(req, res);
    expect(ReservaModel.find).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(reservasEjemplo);
  });

  it('debería devolver un mensaje de error si ocurre un error interno del servidor', async () => {
    // Simular un error interno del servidor al obtener las reservas
    ReservaModel.find = jest.fn().mockRejectedValue(new Error('Error interno del servidor'));
    await getReservasAdmin(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Error interno del servidor' });
  });
});
