const { Pool } = require('pg');  // Usamos Pool para manejar múltiples conexiones

// Datos de conexión
const pool = new Pool({
  host: 'dpg-cveo6tbv2p9s73dosh5g-a.oregon-postgres.render.com',   // O la IP de tu servidor de base de datos
  port: 5432,          // El puerto predeterminado de PostgreSQL
  user: 'root',        // Reemplázalo con tu usuario de PostgreSQL
  password: 'CVzQIR70nChKa9ovRb1Vom3NFo5GrvQ3',  // Reemplázalo con tu contraseña
  database: 'campus_89ds',  // El nombre de la base de datos
  ssl: {
    rejectUnauthorized: false,  // Asegura que la conexión sea segura
  }
});

// Función para ejecutar una consulta SQL
async function ejecutarConsulta() {
  try {
    // Obtener una conexión del pool
    const client = await pool.connect();
    console.log("Conexión exitosa a la base de datos");

    // Ejecutar la consulta SQL
    const result = await client.query('SELECT id, nombre_mesa, cantidad_asiento, estado FROM mesa');

    console.log(result.rows);  // Mostrar los resultados
    client.release();  // Liberar la conexión

  } catch (error) {
    console.error('Error de consulta:', error);
  }
}

// Llamar a la función para ejecutar la consulta
ejecutarConsulta();

// Asegúrate de cerrar el pool cuando la aplicación termine
process.on('exit', () => {
  pool.end();
});

