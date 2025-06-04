// dbConnection.js
const { Pool } = require('pg');

const pool = new Pool({
  host: 'dpg-d0u9adm3jp1c73flu3g0-a.oregon-postgres.render.com',
  port: 5432,
  user: 'root',
  password: 'O9KoZ8Hiba6NnRdWNLDd69jRj0CYQVpY',
  database: 'campus_k8ai',
  ssl: { rejectUnauthorized: false },
});

pool.connect()
  .then(() => {
    console.log('Conexión exitosa a la base de datos');
  })
  .catch((error) => {
    console.error('Error de conexión:', error);
  });

// Exporta el pool para usarlo en otros archivos
module.exports = { pool };
