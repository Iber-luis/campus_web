const express = require('express');
const router = express.Router();
const { pool } = require('../dbConnection');  // Asegúrate de importar correctamente el pool

// Ruta para actualizar el estado de una solicitud
router.put('/actualizar-estado/:id', (req, res) => {
    const id = req.params.id;
    const { estado } = req.body;  // 'permitido' o 'rechazado'

    // Convertir el estado en un valor adecuado para la base de datos
    let valorEstado;
    if (estado === 'permitido') {
        valorEstado = 1;  // Suponiendo que 1 es permitido
    } else if (estado === 'rechazado') {
        valorEstado = 0;  // Suponiendo que 0 es rechazado
    } else {
        return res.status(400).send("Estado no válido");
    }

    const sql = 'UPDATE solicitudes SET estado = $1 WHERE id = $2';

    // Usar pool.query en lugar de conexion.query
    pool.query(sql, [valorEstado, id], (err) => {
        if (err) {
            console.error("Error al actualizar el estado:", err);
            res.status(500).send("Error al actualizar el estado");
        } else {
            res.send("Estado actualizado correctamente");
        }
    });
});

module.exports = router;
