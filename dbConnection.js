// dbConnection.js
const { Pool } = require('pg');

const pool = new Pool({
  host: 'dpg-d055bnje5dus738udd0g-a.oregon-postgres.render.com',
  port: 5432,
  user: 'root',
  password: 'TFTc4ZslBhUtsPCWAXTQ82s4zTKWH9yf',
  database: 'campus_meby',
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
