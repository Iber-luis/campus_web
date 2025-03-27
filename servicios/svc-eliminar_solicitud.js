const express = require('express');
const router = express.Router();
const conexion = require('../dbConnection');

router.delete('/eliminar-solicitud/:nombreUsuario', (req, res) => {
    const nombreUsuario = req.params.nombreUsuario;
    const sqlDelete = 'DELETE FROM solicitudes WHERE nombre_usuario = ?';

    conexion.query(sqlDelete, [nombreUsuario], (err, resultados) => {
        if (err) {
            console.error("Error al eliminar la solicitud:", err);
            return res.status(500).send("Error al eliminar la solicitud");
        }
        res.send({ message: "Solicitud eliminada exitosamente." });
    });
});

module.exports = router;
