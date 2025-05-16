const express = require('express');
const router = express.Router();
const conexion = require('../dbConnection');

// Ruta para obtener todas las mesas
router.get('/obtener-mesas', (req, res) => {
    const sql = 'SELECT * FROM mesa';
    conexion.query(sql, (err, resultados) => {
        if (err) {
            console.error('Error al obtener las mesas:', err);
            res.status(500).send('Error al obtener las mesas');
        } else {
            res.json(resultados);
        }
    });
});

// Ruta para agregar una nueva mesa
router.post('/agregar-mesa', (req, res) => {
    const { nombre_mesa, cantidad_asiento } = req.body;
    const sql = 'INSERT INTO mesa (nombre_mesa, cantidad_asiento, estado) VALUES (?, ?, 0)';

    conexion.query(sql, [nombre_mesa, cantidad_asiento], (err, resultado) => {
        if (err) {
            console.error('Error al agregar la mesa:', err);
            res.status(500).send('Error al agregar la mesa');
        } else {
            res.status(201).send('Mesa agregada con éxito');
        }
    });
});

// Ruta para actualizar una mesa
router.put('/actualizar-mesa/:id', (req, res) => {
    const { id } = req.params;
    const { nombre_mesa, cantidad_asiento } = req.body;
    const sql = 'UPDATE mesa SET nombre_mesa = ?, cantidad_asiento = ? WHERE id = ?';

    conexion.query(sql, [nombre_mesa, cantidad_asiento, id], (err, resultado) => {
        if (err) {
            console.error('Error al actualizar la mesa:', err);
            res.status(500).send('Error al actualizar la mesa');
        } else {
            res.send('Mesa actualizada con éxito');
        }
    });
});

// Ruta para eliminar una mesa
router.delete('/eliminar-mesa/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM mesa WHERE id = ?';

    conexion.query(sql, [id], (err, resultado) => {
        if (err) {
            console.error('Error al eliminar la mesa:', err);
            res.status(500).send('Error al eliminar la mesa');
        } else {
            res.send('Mesa eliminada con éxito');
        }
    });
});

module.exports = router;