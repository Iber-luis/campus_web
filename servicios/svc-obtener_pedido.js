const express = require('express');
const router = express.Router();
const conexion = require('../dbConnection');

// Ruta para obtener todos los pedidos
router.get('/obtener-pedidos', (req, res) => {
    const sql = 'SELECT platos, precios, nombre_mesa, nombre_usuario FROM pedido';
    conexion.query(sql, (err, resultados) => {
        if (err) {
            console.error("Error al obtener pedidos:", err);
            return res.status(500).send("Error al obtener pedidos");
        }
        res.json(resultados);
    });
});

// Ruta para finalizar un pedido
router.post('/finalizar-pedido', (req, res) => {
    const { nombre_mesa, nombre_usuario, cc, numero } = req.body;

    // Primero obtenemos los precios del pedido correspondiente
    const sqlObtenerPedido = `SELECT precios FROM pedido WHERE nombre_mesa = ? AND nombre_usuario = ?`;
    conexion.query(sqlObtenerPedido, [nombre_mesa, nombre_usuario], (err, resultados) => {
        if (err) {
            console.error("Error al obtener precios del pedido:", err);
            return res.status(500).send("Error al obtener precios del pedido");
        }
        
        if (resultados.length > 0) {
            // Procesamos el campo `precios`
            const precios = resultados[0].precios; // Obtenemos el campo `precios` de la consulta
            const preciosArray = precios ? precios.split(',').map(Number) : []; // Validación condicional
            const pagoTotal = preciosArray.reduce((acc, val) => acc + val, 0);
            const fecha = new Date();

            // Consulta para insertar en la tabla factura
            const sqlInsertFactura = `
                INSERT INTO factura (pago_total, fecha, nombre_mesa, nombre_usuario, cc, numero)
                VALUES (?, ?, ?, ?, ?, ?)
            `;

            // Consulta para eliminar el pedido
            const sqlDeletePedido = `
                DELETE FROM pedido WHERE nombre_mesa = ? AND nombre_usuario = ?
            `;

            // Insertar en factura
            conexion.query(sqlInsertFactura, [pagoTotal, fecha, nombre_mesa, nombre_usuario, cc, numero], (err) => {
                if (err) {
                    console.error("Error al insertar en factura:", err);
                    return res.status(500).send("Error al finalizar el pedido");
                }

                // Luego de insertar en factura, eliminar el pedido
                conexion.query(sqlDeletePedido, [nombre_mesa, nombre_usuario], (err) => {
                    if (err) {
                        console.error("Error al eliminar el pedido:", err);
                        return res.status(500).send("Error al eliminar el pedido");
                    }
                    
                    // Actualizar el estado de la mesa a disponible (0)
                    const sqlUpdateMesa = `UPDATE mesa SET estado = 0 WHERE nombre_mesa = ?`;

                    conexion.query(sqlUpdateMesa, [nombre_mesa], (err) => {
                        if (err) {
                            console.error("Error al actualizar el estado de la mesa:", err);
                            return res.status(500).send("Error al actualizar el estado de la mesa");
                        }

                        res.json({ mensaje: "Pedido finalizado y guardado en factura correctamente, mesa marcada como disponible" });
                    });
                });
            });
        } else {
            return res.status(404).send("Pedido no encontrado");
        }
    });
});

module.exports = router;