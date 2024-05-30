const { getReservasByUserId } = require('../controladores/controlador.reservas');
const UserModel = require('../modelos/modelo.usuario');
const ReservaModel = require('../modelos/modelo.reserva');

// Mock para simular una solicitud
const req = {
  params: {
    id: 'usuario-id',
  },
};

// Mock para simular una respuesta
const res = {
  status: jest.fn(() => res),
  json: jest.fn(),
};

// Mock para la función findOne de Mongoose (UserModel)
UserModel.findOne = jest.fn().mockResolvedValue({
  id: 'usuario-id',
});

// Mock para la función find de Mongoose (ReservaModel)
ReservaModel.find = jest.fn().mockResolvedValue([
  { id: 'reserva-1', idPersona: 'usuario-id' },
  { id: 'reserva-2', idPersona: 'usuario-id' },
]);

describe('Pruebas para la función getReservasByUserId', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('debería obtener las reservas asociadas al usuario correctamente', async () => {
    await getReservasByUserId(req, res);
    expect(UserModel.findOne).toHaveBeenCalledWith({ id: 'usuario-id' });
    expect(ReservaModel.find).toHaveBeenCalledWith({ idPersona: 'usuario-id' });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([
      { id: 'reserva-1', idPersona: 'usuario-id' },
      { id: 'reserva-2', idPersona: 'usuario-id' },
    ]);
  });

  it('debería devolver un mensaje de error si el usuario no se encuentra', async () => {
    // Simular que el usuario no se encuentra en la base de datos
    UserModel.findOne = jest.fn().mockResolvedValue(null);
    await getReservasByUserId(req, res);
    expect(UserModel.findOne).toHaveBeenCalledWith({ id: 'usuario-id' });
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Usuario no encontrado' });
  });

  it('debería devolver un mensaje de error si ocurre un error interno del servidor', async () => {
    // Simular un error interno del servidor al buscar el usuario
    UserModel.findOne = jest.fn().mockRejectedValue(new Error('Error interno del servidor'));
    await getReservasByUserId(req, res);
    expect(UserModel.findOne).toHaveBeenCalledWith({ id: 'usuario-id' });
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Error interno del servidor' });
  });
});
