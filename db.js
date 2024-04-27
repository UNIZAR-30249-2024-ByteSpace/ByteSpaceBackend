const mongoose = require('mongoose');

// URL de conexión a la base de datos
const uri = 'mongodb+srv://bytespace:oWhNJuKouGNocXLS@cluster0.gvk8lx8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Conectar a la base de datos
mongoose.connect(uri)
  .then(() => console.log('Conexión exitosa a la base de datos'))
  .catch(err => console.error('Error al conectar a la base de datos:', err));

// Definir un esquema (schema)
const Schema = mongoose.Schema;
const miSchema = new Schema({
  campo1: String,
  campo2: Number
});

// Crear un modelo
const MiModelo = mongoose.model('MiModelo', miSchema);

module.exports = MiModelo;
