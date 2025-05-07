const express = require('express');
const router = express.Router();
const { pool } = require('../dbConnection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Registro
router.post('/register', async (req, res) => {
  const { nombre_usuario, userEmail, userPassword } = req.body;

  if (!nombre_usuario || !userEmail || !userPassword) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  try {
    // Verificar si el correo ya existe
    const check = await pool.query('SELECT * FROM usuario WHERE correo = $1', [userEmail]);
    if (check.rows.length > 0) {
      return res.status(400).json({ error: 'El correo ya está registrado' });
    }

    const hashedPassword = await bcrypt.hash(userPassword, 10);
    await pool.query(
      'INSERT INTO usuario (nombre_usuario, correo, contrasena) VALUES ($1, $2, $3)',
      [nombre_usuario, userEmail, hashedPassword]
    );

    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    console.error('Error en el registro:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { userEmail, userPassword } = req.body;

  if (!userEmail || !userPassword) {
    return res.status(400).json({ error: 'Correo y contraseña son obligatorios' });
  }

  try {
    const result = await pool.query('SELECT * FROM usuario WHERE correo = $1 LIMIT 1', [userEmail]);
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(userPassword, user.contrasena);
    if (!isMatch) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const token = jwt.sign({ id: user.id, rol: user.rol }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
      message: 'Login exitoso',
      token,
      nombre_usuario: user.nombre_usuario,
      rol: user.rol
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

module.exports = router;

