const express = require('express');
const router = express.Router();
const conexion = require('../dbConnection');

router.post('/guardar-pedido', (req, res) => {
    const { platos, precios, nombreMesa, nombreUsuario } = req.body;
    const sql = `INSERT INTO pedido (platos, precios, nombre_mesa, nombre_usuario) VALUES (?, ?, ?, ?)`;
    
    conexion.query(sql, [platos, precios, nombreMesa, nombreUsuario], (err, resultado) => {
        if (err) {
            console.error("Error al guardar el pedido:", err);
            res.status(500).send("Error al guardar el pedido");
        } 

        const sqlUpdateMesa = `UPDATE mesa SET estado = 1 WHERE nombre_mesa = ?`;

        conexion.query(sqlUpdateMesa, [nombreMesa], (err, resultado) => {
            if (err) {
                console.error("Error al actualizar el estado de la mesa:", err);
                return res.status(500).send("Error al actualizar el estado de la mesa");
            }
            res.send("Pedido guardado y mesa marcada como ocupada con éxito");
        });
    });
});

module.exports = router;