const mongoose = require('mongoose')
// URL de conexión a la base de datos
const uri = 'mongodb+srv://bytespace:oWhNJuKouGNocXLS@cluster0.gvk8lx8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const espacios = require('./modelo.espacio.js');
const usuarios = require('./modelo.usuario.js');
const reservas = require('./modelo.reserva.js');


mongoose.Promise = global.Promise

const db = {
    uri : uri,
    espacios : espacios,
    usuarios : usuarios,
    reservas: reservas,
    mongoose: mongoose
}

module.exports = db