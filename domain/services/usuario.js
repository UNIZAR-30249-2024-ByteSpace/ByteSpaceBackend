// servicios/usuarioService.js

const jwt = require('jsonwebtoken');
const UsuarioRepository = require('../repositories/usuario.js');
const Email = require('../value_objects/email.js');

class UsuarioService {
  constructor() {
    this.usuarioRepository = new UsuarioRepository();
  }

  async iniciarSesion(username, password) {
    const email = new Email(username);
    const usuario = await this.usuarioRepository.findByEmail(email.toString());

    if (!usuario || usuario.password !== password) {
      throw new Error('El email o la contraseña no son correctas');
    }

    const token = jwt.sign(
      { idUsuario: usuario.id, email: usuario.email },
      'clavesecreta',
      { expiresIn: '1h' }
    );

    return {
      username: usuario.username,
      email: usuario.email,
      id: usuario.id,
      rol: usuario.rol,
      departamento: usuario.departamento,
      token: token,
    };
  }

  async cambiarRol(email, nuevoRol, nuevoDepartamento) {
    const usuario = await this.usuarioRepository.findByEmail(email);

    if (!usuario) {
      throw new Error('Usuario no existente');
    }

    // Lógica para cambiar el rol y el departamento
    // ...

    await usuario.save();

    return {
      message: 'Rol y departamento actualizados con éxito',
      email: usuario.email,
      nuevoRol: usuario.rol,
      nuevoDepartamento: usuario.departamento,
    };
  }
}

module.exports = UsuarioService;
