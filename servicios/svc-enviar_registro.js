const express = require('express');
const router = express.Router();
const conexion = require('../dbConnection');

router.post('/enviar-registro', (req, res) => {
    const { nombre_mesa, nombre_usuario, cc, telefono } = req.body;
    const sql = `INSERT INTO solicitudes (nombre_mesa, nombre_usuario, cc, telefono, estado) VALUES (?, ?, ?, ?, 'pendiente')`;

    conexion.query(sql, [nombre_mesa, nombre_usuario, cc, telefono], (err, resultado) => {
        if (err) {
            console.error("Error al guardar la solicitud:", err);
            res.status(500).send("Error al guardar la solicitud");
        } else {
            res.send("Solicitud guardada para revisión");
        }
    });
});

module.exports = router;
