const express = require('express');
const router = express.Router();
const { pool } = require('../dbConnection');  // Importar correctamente el 'pool'

router.delete('/eliminar-solicitud/:nombreUsuario', (req, res) => {
    const nombreUsuario = req.params.nombreUsuario;
    const sqlDelete = 'DELETE FROM solicitudes WHERE nombre_usuario = $1';  // Usar parámetro $1

    pool.query(sqlDelete, [nombreUsuario], (err, resultados) => {  // Usar 'pool.query'
        if (err) {
            console.error("Error al eliminar la solicitud:", err);
            return res.status(500).send("Error al eliminar la solicitud");
        }

        // Verificar si alguna fila fue eliminada
        if (resultados.rowCount === 0) {
            return res.status(404).send("No se encontró la solicitud para eliminar");
        }

        res.send({ message: "Solicitud eliminada exitosamente." });
    });
});

module.exports = router;

