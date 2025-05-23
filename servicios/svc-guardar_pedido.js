const express = require('express');
const router = express.Router();
const { pool } = require('../dbConnection');  // Usar 'pool' desde el archivo de conexión
app.use(express.json());

router.post('/guardar-pedido', (req, res) => {
    const { platos, precios, nombreMesa, nombreUsuario } = req.body;

    // Consulta para insertar el pedido
    const sql = `INSERT INTO pedido (platos, precios, nombre_mesa, nombre_usuario) 
                 VALUES ($1, $2, $3, $4)`;  // Usar parámetros $1, $2, $3, $4
    
    pool.query(sql, [platos, precios, nombreMesa, nombreUsuario], (err, resultado) => {  // Usar 'pool.query'
        if (err) {
            console.error("Error al guardar el pedido:", err);
            return res.status(500).send("Error al guardar el pedido");
        }

        // Actualizar el estado de la mesa
        const sqlUpdateMesa = `UPDATE mesa SET estado = true WHERE nombre_mesa = $1`;  // Usar parámetro $1
        
        pool.query(sqlUpdateMesa, [nombreMesa], (err, resultado) => {  // Usar 'pool.query'
            if (err) {
                console.error("Error al actualizar el estado de la mesa:", err);
                return res.status(500).send("Error al actualizar el estado de la mesa");
            }
            res.send("Pedido guardado y mesa marcada como ocupada con éxito");
        });
    });
});

module.exports = router;
