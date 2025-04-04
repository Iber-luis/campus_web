const express = require('express');
const router = express.Router();  // Usar el router de Express
const { pool } = require('../dbConnection');  // Importar el 'pool' correctamente
const fs = require('fs');

router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // Permite solicitudes desde cualquier origen
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

router.get('/pedir-plato', (req, res) => {
    // Ejemplo de consulta a la base de datos usando 'pool.query'
    pool.query('SELECT * FROM plato', (error, resultados) => {
        if (error) {
            console.error('Error en la consulta:', error);
            res.status(500).json({ error: 'Error en la consulta' });
            return;
        }

        // Guardar los resultados en un archivo JSON
        fs.writeFile('resultados.json', JSON.stringify(resultados.rows, null, 2), (err) => {  // Asegúrate de acceder a 'resultados.rows'
            if (err) {
                console.error('Error al guardar el archivo:', err);
                res.status(500).json({ error: 'Error al guardar el archivo' });
                return;
            }
            console.log('Resultados guardados en resultados.json');

            // Enviar los resultados como respuesta
            res.json(resultados.rows);  // Devolver solo los resultados de la consulta
        });
    });
});

module.exports = router;  // Exportar el router
