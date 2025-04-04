const express = require('express');
const router = express.Router();
const { pool } = require('../dbConnection');  // Importa el 'pool' correctamente

router.post('/enviar-registro', (req, res) => {
    const { nombre_mesa, nombre_usuario, cc, telefono } = req.body;
    const sql = `INSERT INTO solicitudes (nombre_mesa, nombre_usuario, cc, telefono, estado) VALUES ($1, $2, $3, $4, 'pendiente')`;  // Usar parámetros $1, $2, $3, $4

    pool.query(sql, [nombre_mesa, nombre_usuario, cc, telefono], (err, resultado) => {  // Cambié conexion.query por pool.query
        if (err) {
            console.error("Error al guardar la solicitud:", err);
            return res.status(500).send("Error al guardar la solicitud");
        }
        res.send("Solicitud guardada para revisión");
    });
});

module.exports = router;

