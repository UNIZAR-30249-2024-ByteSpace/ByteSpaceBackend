const jwt = require('jsonwebtoken');
const MongoUsuarioRepository = require('../../Infrastructure/Repositories/MongoUsuarioRepository'); // Asegúrate de tener este repositorio implementado
const UsuarioRepository = require('../../Domain/Repositories/UsuarioRepository');

class UsuarioService {
    constructor(usuarioRepository = new MongoUsuarioRepository()) {
        if (!(usuarioRepository instanceof UsuarioRepository)) {
            throw new Error('usuarioRepository debe ser una instancia de UsuarioRepository');
        }
        console.log("Contructor UsuarioService")
        this.usuarioRepository = usuarioRepository;
    }

    validarEmail(email) {
        console.log('Validando email:', email);
        return email.match(
            /^(([^<>()\[\]\.,;:\s@"]+(.[^<>()\[\]\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    }

    async iniciarSesion(username, password) {
        console.log('Iniciando sesión para:', username);
        if (!this.validarEmail(username)) {
            console.log('Formato de email no válido:', username);
            throw new Error('Formato de email no válido.');
        }

        const usuario = await this.usuarioRepository.findByEmail(username);
        if (!usuario) {
            console.log('Usuario no encontrado:', username);
            throw new Error('Usuario no encontrado');
        }

        if (usuario.password !== password) {
            console.log('Contraseña incorrecta para el usuario:', username);
            throw new Error('El email o la contraseña no son correctas');
        }

        const jwtToken = jwt.sign(
            { idUsuario: usuario.id, email: usuario.email },
            'clavesecreta',
            { expiresIn: '1h' }
        );

        console.log('Sesión iniciada correctamente para:', username);

        return {
            username: usuario.username,
            email: usuario.email,
            id: usuario.id,
            rol: usuario.rol,
            departamento: usuario.departamento,
            token: jwtToken,
        };
    }

    async cambiarRol(email, nuevoRol, nuevoDepartamento) {
        console.log('Cambiando rol para:', email, 'Nuevo rol:', nuevoRol, 'Nuevo departamento:', nuevoDepartamento);
        if (!this.validarEmail(email)) {
            console.log('Formato de email no válido:', email);
            throw new Error('Formato de email no válido.');
        }

        const usuario = await this.usuarioRepository.findByEmail(email);
        if (!usuario) {
            console.log('Usuario no encontrado:', email);
            throw new Error('Usuario no encontrado');
        }

        if (['estudiante', 'conserje', 'gerente'].includes(nuevoRol)) {
            usuario.rol = nuevoRol;
            usuario.departamento = undefined;
        } else if (nuevoDepartamento !== undefined) {
            if (nuevoDepartamento !== 'informatica' && nuevoDepartamento !== 'ingenieria de sistemas') {
                console.log('Nuevo departamento inválido:', nuevoDepartamento);
                throw new Error('El nuevo departamento es invalido.');
            }
            usuario.rol = nuevoRol;
            usuario.departamento = nuevoDepartamento;
        } else {
            console.log('Cambio de rol requiere nuevo departamento');
            throw new Error('Este cambio de rol requiere de un nuevo departamento.');
        }

        await this.usuarioRepository.update(usuario);

        console.log('Rol y departamento actualizados con éxito para:', email);

        return {
            message: 'Rol y departamento actualizados con éxito',
            email: usuario.email,
            nuevoRol: usuario.rol,
            nuevoDepartamento: usuario.departamento,
        };
    }
}

module.exports = UsuarioService;
