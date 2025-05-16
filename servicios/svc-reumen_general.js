const express = require('express');
const router = express.Router();
const conexion = require('../dbConnection');

router.get('/', (req, res) => {
    const sqlTotalVentas = 'SELECT SUM(pago_total) AS total_ventas FROM factura';
    const sqlNumeroVentas = 'SELECT COUNT(*) AS numero_ventas FROM factura';
    const sqlNumeroClientes = 'SELECT COUNT(DISTINCT cc) AS numero_clientes FROM factura';
    const sqlVentasPorMes = `
        SELECT MONTH(fecha) AS mes, YEAR(fecha) AS anio, SUM(pago_total) AS total_mes
        FROM factura
        GROUP BY YEAR(fecha), MONTH(fecha)
        ORDER BY anio, mes
    `;

    // Realizar las consultas en paralelo
    Promise.all([
        new Promise((resolve, reject) => {
            conexion.query(sqlTotalVentas, (err, results) => {
                if (err) reject(err);
                else resolve(results[0].total_ventas || 0);
            });
        }),
        new Promise((resolve, reject) => {
            conexion.query(sqlNumeroVentas, (err, results) => {
                if (err) reject(err);
                else resolve(results[0].numero_ventas || 0);
            });
        }),
        new Promise((resolve, reject) => {
            conexion.query(sqlNumeroClientes, (err, results) => {
                if (err) reject(err);
                else resolve(results[0].numero_clientes || 0);
            });
        }),
        new Promise((resolve, reject) => {
            conexion.query(sqlVentasPorMes, (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        }),
    ])
        .then(([totalVentas, numeroVentas, numeroClientes, ventasPorMes]) => {
            res.json({ totalVentas, numeroVentas, numeroClientes, ventasPorMes });
        })
        .catch((error) => {
            console.error("Error al obtener el resumen de ventas:", error);
            res.status(500).send("Error al obtener el resumen de ventas");
        });
});

module.exports = router;