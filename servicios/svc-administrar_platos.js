const express = require('express');
const router = express.Router();
const { pool } = require('../dbConnection');  // Asegúrate de importar correctamente el pool

// Ruta para obtener todos los platos
router.get('/obtener-platos', (req, res) => {
    const sql = 'SELECT * FROM plato';
    pool.query(sql, (err, resultados) => {  // Cambié conexion.query por pool.query
        if (err) {
            console.error("Error al obtener platos:", err);
            return res.status(500).send("Error al obtener platos");
        }
        res.json(resultados.rows);  // Acceder a los datos con 'rows'
    });
});

// Ruta para agregar un nuevo plato
router.post('/agregar-plato', (req, res) => {
    const { nombre_plato, descripcion, img, nombre_tipocomida, precio } = req.body;
    const sql = 'INSERT INTO plato (nombre_plato, descripcion, img, nombre_tipocomida, precio) VALUES ($1, $2, $3, $4, $5)';  // Usar parámetros $1, $2...
    pool.query(sql, [nombre_plato, descripcion, img, nombre_tipocomida, precio], (err, resultado) => {  // Cambié conexion.query por pool.query
        if (err) {
            console.error("Error al agregar plato:", err);
            return res.status(500).send("Error al agregar plato");
        }
        res.json({ mensaje: "Plato agregado exitosamente", id: resultado.rows[0].id });  // Usar 'rows' para acceder al id
    });
});

// Ruta para eliminar un plato por su ID
router.delete('/eliminar-plato/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM plato WHERE id = $1';  // Usar parámetros $1
    pool.query(sql, [id], (err) => {  // Cambié conexion.query por pool.query
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
        SET nombre_plato = $1, descripcion = $2, img = $3, nombre_tipocomida = $4, precio = $5
        WHERE id = $6
    `;  // Usar parámetros $1, $2, etc.
    pool.query(sql, [nombre_plato, descripcion, img, nombre_tipocomida, precio, id], (err) => {  // Cambié conexion.query por pool.query
        if (err) {
            console.error("Error al actualizar plato:", err);
            return res.status(500).send("Error al actualizar plato");
        }
        res.json({ mensaje: "Plato actualizado exitosamente" });
    });
});

module.exports = router;
