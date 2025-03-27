const express = require('express');
const router = express.Router();
const conexion = require('../dbConnection');

router.get('/verificar-permiso/:nombreUsuario', (req, res) => {
    const nombreUsuario = req.params.nombreUsuario;

    const sql = 'SELECT estado FROM solicitudes WHERE nombre_usuario = ?';

    conexion.query(sql, [nombreUsuario], (err, resultados) => {
        if (err) {
            console.error("Error al verificar el permiso:", err);
            return res.status(500).send("Error al verificar el permiso");
        }

        if (resultados.length > 0) {
            const estado = resultados[0].estado;
            if (estado === 'permitido') {
                res.json({ permitido: true, denegado: false });
            } else if (estado === 'rechazado') {
                res.json({ permitido: false, denegado: true });
            } else {
                res.json({ permitido: false, denegado: false });
            }
            eliminarSolicitudes();
        } else {
            res.json({ permitido: false, denegado: false });
        }
    });
});

function eliminarSolicitudes() {
    const sqlDelete = 'DELETE FROM solicitudes WHERE estado IN (?, ?)';

    conexion.query(sqlDelete, ['rechazado', 'permitido'], (err, resultados) => {
        if (err) {
            console.error("Error al eliminar solicitudes:", err);
        } else {
            console.log(`Se han eliminado ${resultados.affectedRows} solicitudes.`);
        }
    });
}

module.exports = router;