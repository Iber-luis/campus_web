const express = require('express');
const router = express.Router();
const { pool } = require('../dbConnection');
const bcrypt = require('bcrypt');

router.post('/login', async (req, res) => {
    const { userEmail, userPassword } = req.body;

    if (!userEmail || !userPassword) {
        return res.status(400).json({ error: 'Correo y contraseña son obligatorios' });
    }

    try {
        const result = await pool.query('SELECT * FROM usuario WHERE correo = $1', [userEmail]);

        if (result.rows.length === 0) {
            return res.status(401).json({ error: 'Usuario no encontrado' });
        }

        const user = result.rows[0];
        const isMatch = await bcrypt.compare(userPassword, user.contrasena);

        if (!isMatch) {
            return res.status(401).json({ error: 'Contraseña incorrecta' });
        }

        // Si pasa la validación
        res.status(200).json({
            message: 'Login exitoso',
            nombre_usuario: user.nombre_usuario,
            rol: user.rol
        });

    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({ error: 'Error del servidor' });
    }
});

module.exports = router;
