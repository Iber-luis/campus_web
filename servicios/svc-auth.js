const express = require('express');
const router = express.Router();
const { pool } = require('../dbConnection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authRoutes = require('./servicios/svc-auth');
app.use(express.json());
app.use('/api/auth', authRoutes);


// Ruta para registrar un nuevo usuario
router.post('/register', async (req, res) => {
  const { nombre_usuario, userEmail, userPassword } = req.body;

  if (!nombre_usuario || !userEmail || !userPassword) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  try {
    const hashedPassword = await bcrypt.hash(userPassword, 10);
    const query = 'INSERT INTO usuario (nombre_usuario, correo, contrasena) VALUES ($1, $2, $3)';
    await pool.query(query, [nombre_usuario, userEmail, hashedPassword]);
    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
});

// Ruta para iniciar sesión
router.post('/login', async (req, res) => {
  const { userEmail, userPassword } = req.body;

  if (!userEmail || !userPassword) {
    return res.status(400).json({ error: 'Correo y contraseña son obligatorios' });
  }

  try {
    const query = 'SELECT id, nombre_usuario, contrasena, rol FROM usuario WHERE correo = $1';
    const result = await pool.query(query, [userEmail]);
    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const isMatch = await bcrypt.compare(userPassword, user.contrasena);
    if (!isMatch) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const token = jwt.sign({ id: user.id, rol: user.rol }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Inicio de sesión exitoso', token });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
});

module.exports = router;
