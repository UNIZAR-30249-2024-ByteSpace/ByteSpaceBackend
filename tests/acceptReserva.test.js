const { acceptReserva } = require('../controladores/controlador.reservas');
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

// Mock para la función findOne de Mongoose
ReservaModel.findOne = jest.fn().mockResolvedValue({
  id: 'reserva-id',
  potencialInvalida: true,
});

// Mock para la función findOneAndUpdate de Mongoose
ReservaModel.findOneAndUpdate = jest.fn().mockResolvedValue({
  id: 'reserva-id',
  potencialInvalida: false,
});

describe('Pruebas para la función acceptReserva', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('debería aceptar una reserva correctamente', async () => {
    await acceptReserva(req, res);
    expect(ReservaModel.findOne).toHaveBeenCalledWith({ id: 'reserva-id' });
    expect(ReservaModel.findOneAndUpdate).toHaveBeenCalledWith({ id: 'reserva-id' }, { potencialInvalida: false });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Reserva aceptada', reserva: { id: 'reserva-id', potencialInvalida: true } });
  });
});
