const express = require('express');
const router = express.Router();
const conexion = require('../dbConnection');

router.get('/', (req, res) => {

    const offset = parseInt(req.query.offset) || 0;
    const limit = parseInt(req.query.limit) || 8;

    const sql = `
        SELECT pago_total, fecha, nombre_mesa, nombre_usuario, cc, numero 
        FROM factura 
        LIMIT ? OFFSET ?`;
    
        conexion.query(sql, [limit, offset], (err, resultados) => {
            if (err) {
                console.error("Error al obtener las facturas:", err);
                res.status(500).send("Error al obtener las facturas");
            } else {
                res.json(resultados);
            }
        });
    });

router.get('/total', (req, res) => {
    const sql = 'SELECT COUNT(*) AS total FROM factura';
    conexion.query(sql, (err, resultados) => {
        if (err) {
            console.error("Error al obtener el total de facturas:", err);
            res.status(500).send("Error al obtener el total de facturas");
        } else {
            res.json({ total: resultados[0].total });
        }
    });
});

module.exports = router;