// domain/entities/usuario.js
const Departamento = require('../Value_Objects/Departamento');
const Rol = require('../Value_Objects/Rol');
  
class Usuario {
    constructor({ id, username, email, password, rol, departamento }) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.rol = new Rol(rol).getNombre();
        // Si el departamento no se proporciona, se establece como null
        this.departamento = departamento !== undefined ? new Departamento(departamento).getNombre() : null;
    }
}
  
  module.exports = Usuario;