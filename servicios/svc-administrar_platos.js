const express = require('express');
const router = express.Router();
const conexion = require('../dbConnection');

// Ruta para obtener todos los platos
router.get('/obtener-platos', (req, res) => {
    const sql = 'SELECT * FROM plato';
    conexion.query(sql, (err, resultados) => {
        if (err) {
            console.error("Error al obtener platos:", err);
            return res.status(500).send("Error al obtener platos");
        }
        res.json(resultados);
    });
});

// Ruta para agregar un nuevo plato
router.post('/agregar-plato', (req, res) => {
    const { nombre_plato, descripcion, img, nombre_tipocomida, precio } = req.body;
    const sql = 'INSERT INTO plato (nombre_plato, descripcion, img, nombre_tipocomida, precio) VALUES (?, ?, ?, ?, ?)';
    conexion.query(sql, [nombre_plato, descripcion, img, nombre_tipocomida, precio], (err, resultado) => {
        if (err) {
            console.error("Error al agregar plato:", err);
            return res.status(500).send("Error al agregar plato");
        }
        res.json({ mensaje: "Plato agregado exitosamente", id: resultado.insertId });
    });
});

// Ruta para eliminar un plato por su ID
router.delete('/eliminar-plato/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM plato WHERE id = ?';
    conexion.query(sql, [id], (err) => {
        if (err) {
            console.error("Error al eliminar plato:", err);
            return res.status(500).send("Error al eliminar plato");
        }
        res.json({ mensaje: "Plato eliminado exitosamente" });
    });
});

// Ruta para actualizar un plato
router.put('/actualizar-plato/:id', (req, res) => {
    const { id } = req.params;
    const { nombre_plato, descripcion, img, nombre_tipocomida, precio } = req.body;
    const sql = `
        UPDATE plato 
        SET nombre_plato = ?, descripcion = ?, img = ?, nombre_tipocomida = ?, precio = ?
        WHERE id = ?
    `;
    conexion.query(sql, [nombre_plato, descripcion, img, nombre_tipocomida, precio, id], (err) => {
        if (err) {
            console.error("Error al actualizar plato:", err);
            return res.status(500).send("Error al actualizar plato");
        }
        res.json({ mensaje: "Plato actualizado exitosamente" });
    });
});

module.exports = router;