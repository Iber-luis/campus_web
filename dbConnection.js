// dbConnection.js
const { Pool } = require('pg');

const pool = new Pool({
  host: 'dpg-cveo6tbv2p9s73dosh5g-a.oregon-postgres.render.com',
  port: 5432,
  user: 'root',
  password: 'CVzQIR70nChKa9ovRb1Vom3NFo5GrvQ3',
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
