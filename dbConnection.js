const { Client } = require('pg');

// Datos de conexión
const client = new Client({
  host: 'dpg-cveo6tbv2p9s73dosh5g-a.oregon-postgres.render.com',   // O la IP de tu servidor de base de datos
  port: 5432,          // El puerto predeterminado de PostgreSQL
  user: 'root',  // Reemplázalo con tu usuario de PostgreSQL
  password: 'CVzQIR70nChKa9ovRb1Vom3NFo5GrvQ3',  // Reemplázalo con tu contraseña
  database: 'campus_89ds',  // El nombre de la base de datos
  ssl: {
    rejectUnauthorized: false, // Asegura que la conexión sea segura
  }

});


// Función para conectar a la base de datos
async function conectar() {
  try {
    await client.connect();
    console.log("Conexión exitosa a la base de datos");

  } catch (error) {
    console.error('Error de conexión:', error);
  } finally {
    // Cerrar la conexión cuando termines
    await client.end();
  }
}

// Llamamos a la función de conexión
conectar();
