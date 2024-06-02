const http = require('http');
const app = require('./app');
const { connectToDatabase } = require('../database/MongoConnection');

const API_PORT = process.env.PORT || 3000;
app.set('port', API_PORT);

const server = http.Server(app);

connectToDatabase()
  .then(() => {
    console.log('Connected to the database');
    server.listen(API_PORT, () => {
      console.log(`Server listening on port ${API_PORT}`);
    });
    // agregarEspaciosDePrueba(); // Uncomment if needed
  })
  .catch((err) => {
    console.error('Cannot connect to the database!\n', err);
    process.exit();
  });
