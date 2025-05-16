const express = require('express');
const router = express.Router();
const { pool } = require('../dbConnection'); // Asegúrate que el pool esté correctamente exportado

// Obtener facturas con paginación
router.get('/', (req, res) => {
    const offset = parseInt(req.query.offset) || 0;
    const limit = parseInt(req.query.limit) || 8;

    const sql = `
        SELECT pago_total, fecha, nombre_mesa, nombre_usuario, cc, numero 
        FROM factura 
        LIMIT $1 OFFSET $2
    `;

    pool.query(sql, [limit, offset], (err, resultados) => {
        if (err) {
            console.error("Error al obtener las facturas:", err);
            res.status(500).send("Error al obtener las facturas");
        } else {
            res.json(resultados.rows);  // PostgreSQL usa .rows
        }
    });
});

// Obtener total de facturas
router.get('/total', (req, res) => {
    const sql = 'SELECT COUNT(*) AS total FROM factura';

    pool.query(sql, (err, resultados) => {
        if (err) {
            console.error("Error al obtener el total de facturas:", err);
            res.status(500).send("Error al obtener el total de facturas");
        } else {
            res.json({ total: parseInt(resultados.rows[0].total, 10) }); // convertir a número
        }
    });
});

module.exports = router;
