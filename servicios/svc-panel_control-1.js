const express = require('express');
const router = express.Router();
const { pool } = require('../dbConnection');  // Asegúrate de importar 'pool' correctamente desde la conexión

// Obtener solicitudes pendientes
router.get('/obtener-solicitudes', (req, res) => {
    const sql = `SELECT * FROM solicitudes WHERE estado = 'pendiente'`;
    pool.query(sql, (err, resultados) => {  // Usamos 'pool.query' en lugar de 'conexion.query'
        if (err) {
            console.error("Error al obtener las solicitudes:", err);
            res.status(500).send("Error al obtener las solicitudes");
        } else {
            res.json(resultados.rows);  // Utilizamos 'resultados.rows' en lugar de 'resultados'
        }
    });
});

// Actualizar estado de solicitud
router.put('/actualizar-estado/:id', (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;

    // Usamos parámetros de consulta para evitar inyecciones SQL
    const sql = `UPDATE solicitudes SET estado = $1 WHERE id = $2`;

    pool.query(sql, [estado, id], (err, resultado) => {  // Usamos 'pool.query' en lugar de 'conexion.query'
        if (err) {
            console.error("Error al actualizar el estado de la solicitud:", err);
            res.status(500).send("Error al actualizar el estado");
        } else {
            res.send("Estado actualizado con éxito");
        }
    });
});

module.exports = router;
