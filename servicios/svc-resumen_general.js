const express = require('express');
const router = express.Router();
const { pool } = require('../dbConnection'); // Asegúrate de exportar pool desde tu archivo de conexión

router.get('/resumen_general', (req, res) => {
    const sqlTotalVentas = 'SELECT COALESCE(SUM(pago_total), 0) AS total_ventas FROM factura';
    const sqlNumeroVentas = 'SELECT COUNT(*) AS numero_ventas FROM factura';
    const sqlNumeroClientes = 'SELECT COUNT(DISTINCT cc) AS numero_clientes FROM factura';
    const sqlVentasPorMes = `
        SELECT 
            EXTRACT(MONTH FROM fecha) AS mes, 
            EXTRACT(YEAR FROM fecha) AS anio, 
            SUM(pago_total) AS total_mes
        FROM factura
        GROUP BY anio, mes
        ORDER BY anio, mes
    `;

    Promise.all([
        pool.query(sqlTotalVentas),
        pool.query(sqlNumeroVentas),
        pool.query(sqlNumeroClientes),
        pool.query(sqlVentasPorMes),
    ])
        .then(([totalVentasResult, numeroVentasResult, numeroClientesResult, ventasPorMesResult]) => {
            const totalVentas = totalVentasResult.rows[0]?.total_ventas || 0;
            const numeroVentas = numeroVentasResult.rows[0]?.numero_ventas || 0;
            const numeroClientes = numeroClientesResult.rows[0]?.numero_clientes || 0;
            const ventasPorMes = ventasPorMesResult.rows;

            res.json({ totalVentas, numeroVentas, numeroClientes, ventasPorMes });
        })
        .catch((error) => {
            console.error("Error al obtener el resumen de ventas:", error);
            res.status(500).send("Error al obtener el resumen de ventas");
        });
});

module.exports = router;
