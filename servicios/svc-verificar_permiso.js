const express = require('express');
const router = express.Router();
const { pool } = require('../dbConnection'); // Usar pool para la conexión

router.get('/verificar-permiso/:nombreUsuario', (req, res) => {
    const nombreUsuario = req.params.nombreUsuario;

    const sql = 'SELECT estado FROM solicitudes WHERE nombre_usuario = $1';

    pool.query(sql, [nombreUsuario], (err, resultados) => {
        if (err) {
            console.error("Error al verificar el permiso:", err);
            return res.status(500).send("Error al verificar el permiso");
        }

        if (resultados.rows.length > 0) {
            const estado = resultados.rows[0].estado;
            if (estado === 'permitido') {
                res.json({ permitido: true, denegado: false });
            } else if (estado === 'rechazado') {
                res.json({ permitido: false, denegado: true });
            } else {
                res.json({ permitido: false, denegado: false });
            }
            // Llamamos a eliminarSolicitudes después de responder al cliente
            eliminarSolicitudes();
        } else {
            res.json({ permitido: false, denegado: false });
        }
    });
});

function eliminarSolicitudes() {
    const sqlDelete = 'DELETE FROM solicitudes WHERE estado IN ($1, $2)';

    pool.query(sqlDelete, ['rechazado', 'permitido'], (err, resultados) => {
        if (err) {
            console.error("Error al eliminar solicitudes:", err);
        } else {
            console.log(`Se han eliminado ${resultados.rowCount} solicitudes.`);
        }
    });
}

module.exports = router;
