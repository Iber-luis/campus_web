const express = require('express');
const router = express.Router();
const conexion = require('../dbConnection');

// Obtener solicitudes pendientes
router.get('/obtener-solicitudes', (req, res) => {
    const sql = `SELECT * FROM solicitudes WHERE estado = 'pendiente'`;
    conexion.query(sql, (err, resultados) => {
        if (err) {
            console.error("Error al obtener las solicitudes:", err);
            res.status(500).send("Error al obtener las solicitudes");
        } else {
            res.json(resultados);
        }
    });
});

// Actualizar estado de solicitud
router.put('/actualizar-estado/:id', (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;
    const sql = `UPDATE solicitudes SET estado = ? WHERE id = ?`;

    conexion.query(sql, [estado, id], (err, resultado) => {
        if (err) {
            console.error("Error al actualizar el estado de la solicitud:", err);
            res.status(500).send("Error al actualizar el estado");
        } else {
            res.send("Estado actualizado con éxito");
        }
    });
});

module.exports = router;
