const express = require('express');
const cors = require('cors'); 
const path = require('path');
const app = express();
const PORT = 3001; 

app.use(cors());
app.use(express.json());

// Middleware para habilitar CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Servir archivos estáticos (HTML, CSS, JS, imágenes, etc.) de la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Importar y usar rutas de servicios
const pedirPlato = require('./servicios/svc-pedir_plato');
const pedirMesas = require('./servicios/svc-pedir_mesa');
const guardarPedido = require('./servicios/svc-guardar_pedido');
const enviarRegistro = require('./servicios/svc-enviar_registro');
const panelControl = require('./servicios/svc-panel_control-1');
const verificarPermiso = require('./servicios/svc-verificar_permiso');
const actualizarEstado = require('./servicios/svc-actualizar_estado');
const eleminarSolicitud = require('./servicios/svc-eliminar_solicitud');
const obtenerPedidos = require('./servicios/svc-obtener_pedido');
const gestionarPlatos = require('./servicios/svc-administrar_platos');
const svcAdministrarMesas = require('./servicios/svc-administrar_mesas');
const svcObtenerfacturas = require('./servicios/svc-obtener_facturas');
const svcResumenGeneral = require('./servicios/svc-resumen_general');



app.use('/servicios', pedirPlato);
app.use('/servicios', pedirMesas);
app.use('/servicios', guardarPedido);
app.use('/servicios', enviarRegistro);
app.use('/servicios', panelControl);
app.use('/servicios', verificarPermiso);
app.use('/servicios', actualizarEstado);
app.use('/servicios', eleminarSolicitud);
app.use('/servicios', obtenerPedidos);
app.use('/servicios', gestionarPlatos);
app.use('/servicios/administrar-mesa', svcAdministrarMesas);
app.use('/servicios/obtener-factura', svcObtenerfacturas);
app.use('/servicios/resumen-general', svcResumenGeneral);




// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor en funcionamiento en http://localhost:${PORT}`);
});
