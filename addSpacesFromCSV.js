const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const EspacioModelo = require('./modelos/modelo.espacio.js');

async function addSpacesFromCSV() {
    try {
        const spaces = [];
        const csvFilePath = path.join(__dirname, 'Espacios_LABIS_actualizados3.csv');

        // Leer y parsear el archivo CSV
        fs.createReadStream(csvFilePath)
            .pipe(csv())
            .on('data', (row) => {
                const space = {
                    id: row.id,
                    tamanio: parseInt(row.tamanio, 10),
                    tipo: row.tipo,
                    maxOcupantes: parseInt(row.maxOcupantes, 10),
                    informacion: row.informacion,
                    reservable: true,
                    categoria: row.categoria,
                    porcentajeOcupacion: parseFloat(row.porcentajeOcupacion),
                    planta: parseInt(row.planta, 10),
                    asignadoA: row.asignadoA
                };
                spaces.push(space);
            })
            .on('end', async () => {
                try {
                    await Promise.all(spaces.map(async (space) => {
                        const espacioModelo = new EspacioModelo(space);
                        await espacioModelo.save();
                    }));
                    console.log('Espacios añadidos exitosamente');
                } catch (error) {
                    console.error('Error al añadir espacios:', error);
                }
            });
    } catch (error) {
        console.error('Error al procesar el archivo CSV:', error);
        throw error;
    }
}

// Ejecutar la función para añadir los espacios desde el CSV
addSpacesFromCSV().catch(console.error);


module.exports = { addSpacesFromCSV };

