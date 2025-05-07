const express = require('express');
const router = express.Router();
const { pool } = require('../dbConnection');
const bcrypt = require('bcrypt');

// Ruta para registrar un nuevo usuario
router.post('/register', async (req, res) => {
    const { nombre_usuario, userEmail, userPassword, userRole } = req.body;

    // Validar que los campos no estén vacíos
    if (!nombre_usuario || !userEmail || !userPassword || !userRole) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    // Validar que el rol esté dentro de los permitidos
    const rolesPermitidos = ['admin', 'trabajador', 'cocina'];
    if (!rolesPermitidos.includes(userRole)) {
        return res.status(400).json({ error: 'Rol inválido' });
    }

    try {
        // Hashear la contraseña antes de guardarla
        const hashedPassword = await bcrypt.hash(userPassword, 10);

        // Insertar usuario en la base de datos
        const query = 'INSERT INTO usuario (nombre_usuario, correo, contrasena, rol) VALUES ($1, $2, $3, $4)';
        await pool.query(query, [nombre_usuario, userEmail, hashedPassword, userRole]);

        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ error: 'Error al registrar usuario' });
    }
});

// Ruta para iniciar sesión
router.post('/login', async (req, res) => {
    const { userEmail, userPassword } = req.body;

    // Validar que el correo y la contraseña estén presentes
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
