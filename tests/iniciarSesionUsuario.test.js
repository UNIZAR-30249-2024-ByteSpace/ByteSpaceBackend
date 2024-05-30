const { iniciarSesion } = require('../controladores/controlador.usuario');
const UsuarioModel = require('../modelos/modelo.usuario');
const jwt = require('jsonwebtoken');

// Mock para simular una solicitud
const req = {
  body: {
    username: 'usuario@example.com', // Se cambió de 'email' a 'username' en el controlador
    password: 'password123',
  },
};

// Mock para simular una respuesta
const res = {
  status: jest.fn(() => res),
  send: jest.fn(),
  json: jest.fn(),
};

// Mock para la función findOne de Mongoose (UsuarioModel)
UsuarioModel.findOne = jest.fn().mockResolvedValue({
  id: 'usuario-id',
  username: 'usuario',
  email: 'usuario@example.com',
  password: 'password123',
  rol: 'usuario',
  departamento: 'departamento',
});

// Mock para la función sign de jwt
jwt.sign = jest.fn(() => 'token-de-prueba');

describe('Pruebas para la función iniciarSesion', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('debería iniciar sesión correctamente', async () => {
    await iniciarSesion(req, res);
    expect(UsuarioModel.findOne).toHaveBeenCalledWith({ email: 'usuario@example.com' });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      username: 'usuario',
      email: 'usuario@example.com',
      id: 'usuario-id',
      rol: 'usuario',
      departamento: 'departamento',
      token: 'token-de-prueba',
    });
  });

  it('debería devolver un mensaje de error si el email es inválido', async () => {

    req.body.username = 'email-invalido';
    await iniciarSesion(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith('Formato de email no válido.');
  });

  it('debería devolver un mensaje de error si el usuario no existe', async () => {
    // Simular que el usuario no existe en la base de datos
    req.body.username = 'mail@fakemail.es';
    UsuarioModel.findOne = jest.fn().mockResolvedValue(null);
    await iniciarSesion(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith('Usuario no existente');
  });

  it('debería devolver un mensaje de error si las credenciales son inválidas', async () => {
    // Simulate a scenario where the username is valid but the password is incorrect
    req.body.username = 'usuario@example.com';
    req.body.password = 'contrasena-incorrecta';
  
    // Mocking the user data returned from the database
    UsuarioModel.findOne = jest.fn().mockImplementation(({ email }) => {
      if (email === 'usuario@example.com') {
        // Mock user object with correct email but incorrect password
        return {
          id: 'usuario-id',
          username: 'usuario',
          email: 'usuario@example.com',
          password: 'password123', // Actual correct password
          rol: 'usuario',
          departamento: 'departamento',
        };
      } else {
        // Simulate user not found scenario
        return null;
      }
    });
  
    await iniciarSesion(req, res);
    
    // Expect a 400 status code with the correct error message
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith('El email o la contraseña no son correctas');
  });
  

  it('debería devolver un mensaje de error si ocurre un error interno del servidor', async () => {
    // Set a specific email for which the database query will throw an error
    const errorEmail = 'usuario@example.com';
    
    // Mocking the user data returned from the database
    UsuarioModel.findOne = jest.fn().mockImplementation(({ email }) => {
      if (email === errorEmail) {
        // Simulate an error when querying for this email
        throw new Error('Error interno del servidor al buscar el usuario');
      } else {
        // Return null for other emails to simulate user not found scenario
        return null;
      }
    });
    
    // Set a valid username for the test
    req.body.username = 'usuario@example.com';
    req.body.password = 'contrasena-incorrecta';
  
    await iniciarSesion(req, res);
  
    // Expect a 500 status code with the correct error message
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith('Error interno del servidor');
  });
  
});
