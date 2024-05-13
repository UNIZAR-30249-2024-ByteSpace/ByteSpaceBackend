const  mongoose = require('mongoose')

const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const UsusarioEsquema = mongoose.Schema({
    _id: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: emailRegex,
            message: () => 'El correo electronico no es valido'
        }
    },
    password: {
        type: String,
        required: true,
    },
    rol: {
        type: String,
        required: true,
    },
    departamento: {
        type: String,
        required: true,
    },
})


const ModeloUsuario = mongoose.model('Usuario', UsusarioEsquema)

module.exports = ModeloUsuario