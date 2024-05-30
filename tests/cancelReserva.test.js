const { cancelReserva } = require('../controladores/controlador.reservas');
const ReservaModel = require('../modelos/modelo.reserva');

// Mock para simular una solicitud
const req = {
  params: {
    id: 'reserva-id',
  },
};

// Mock para simular una respuesta
const res = {
  status: jest.fn(() => res),
  json: jest.fn(),
};

// Mock para la función findOne de Mongoose (ReservaModel)
ReservaModel.findOne = jest.fn().mockResolvedValue({
  id: 'reserva-id',
});

// Mock para la función findOneAndDelete de Mongoose (ReservaModel)
ReservaModel.findOneAndDelete = jest.fn().mockResolvedValue({
  id: 'reserva-id',
});

describe('Pruebas para la función cancelReserva', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('debería cancelar una reserva correctamente', async () => {
    await cancelReserva(req, res);
    expect(ReservaModel.findOne).toHaveBeenCalledWith({ id: 'reserva-id' });
    expect(ReservaModel.findOneAndDelete).toHaveBeenCalledWith({ id: 'reserva-id' });
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.json).toHaveBeenCalledWith({ reserva: { id: 'reserva-id' } });
  });

  it('debería devolver un mensaje de error si la reserva no se encuentra', async () => {
    // Simular que la reserva no se encuentra en la base de datos
    ReservaModel.findOne = jest.fn().mockResolvedValue(null);
    await cancelReserva(req, res);
    expect(ReservaModel.findOne).toHaveBeenCalledWith({ id: 'reserva-id' });
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Reserva no encontrada' });
  });

  it('debería devolver un mensaje de error si ocurre un error interno del servidor', async () => {
    // Simular un error interno del servidor al buscar la reserva
    ReservaModel.findOne = jest.fn().mockRejectedValue(new Error('Error interno del servidor'));
    await cancelReserva(req, res);
    expect(ReservaModel.findOne).toHaveBeenCalledWith({ id: 'reserva-id' });
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Error interno del servidor' });
  });
});
