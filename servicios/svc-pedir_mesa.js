// svc-pedir_mesa.js
const express = require('express');
const router = express.Router();
const { pool } = require('../dbConnection');  // Asegúrate de que la ruta es correcta
const fs = require('fs');

router.get('/pedir-mesa', (req, res) => {
    pool.query('SELECT id, nombre_mesa, cantidad_asiento, estado FROM mesa', (error, resultados) => {
        if (error) {
            console.error('Error en la consulta:', error);
            res.status(500).json({ error: 'Error en la consulta' });
            return;
        }

        fs.writeFile('mesas.json', JSON.stringify(resultados.rows, null, 2), (err) => {
            if (err) {
                console.error('Error al guardar el archivo:', err);
                res.status(500).json({ error: 'Error al guardar el archivo' });
                return;
            }
            console.log('Resultados guardados en mesas.json');

            res.json(resultados.rows);
        });
    });
});

module.exports = router;
