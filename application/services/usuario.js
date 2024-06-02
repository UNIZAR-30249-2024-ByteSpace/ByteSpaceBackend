// /application/services/usuario.js

const jwt = require('jsonwebtoken');
const Usuario = require('../infrastructure/database/models/usuario.js');
const Email = require('../domain/value_objects/email.js');

class UsuarioService {
  async iniciarSesion(username, password) {
    // Crea un objeto Email para validar y manipular la dirección de correo electrónico
    const email = new Email(username);

    // Busca un usuario en la base de datos con la dirección de correo electrónico proporcionada
    const usuario = await Usuario.findOne({ email: email.toString() });

    // Verifica si se encontró un usuario y si la contraseña coincide
    if (!usuario || usuario.password !== password) {
      throw new Error('El email o la contraseña no son correctas');
    }

    // Genera un token JWT con la información del usuario para la autenticación
    const token = jwt.sign(
      { idUsuario: usuario.id, email: usuario.email },
      'clavesecreta',
      { expiresIn: '1h' }
    );

    // Devuelve la información del usuario junto con el token JWT
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
    // Busca un usuario en la base de datos por su dirección de correo electrónico
    const usuario = await Usuario.findOne({ email });

    // Verifica si se encontró un usuario
    if (!usuario) {
      throw new Error('Usuario no existente');
    }

    // Lógica para cambiar el rol y el departamento del usuario
    
    // Eliminar el valor de 'departamento' si el nuevo rol es 'estudiante', 'conserje', o 'gerente'
    if (['estudiante', 'conserje', 'gerente'].includes(nuevoRol)) {
        usuario.rol = nuevoRol;
        usuario.departamento = undefined;
      } else if (nuevoDepartamento !== undefined) {
        // Verificar que el nuevo departamento sea válido
        if (nuevoDepartamento !== 'informatica' && nuevoDepartamento !== 'ingenieria de sistemas') {
          throw new Error('El nuevo departamento es inválido.');
        }
        usuario.rol = nuevoRol;
        usuario.departamento = nuevoDepartamento;
      } else {
        throw new Error('Este cambio de rol requiere de un nuevo departamento.');
      }

    // Guarda los cambios en el usuario en la base de datos
    await usuario.save();

    // Devuelve un mensaje de éxito junto con la información actualizada del usuario
    return {
      message: 'Rol y departamento actualizados con éxito',
      email: usuario.email,
      nuevoRol: usuario.rol,
      nuevoDepartamento: usuario.departamento,
    };
  }
}

module.exports = UsuarioService;
