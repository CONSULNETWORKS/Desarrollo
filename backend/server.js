// server.js

// ----------------------------------------------------
// 1. Importar módulos y cargar variables de entorno
// ----------------------------------------------------
require('dotenv').config(); // Carga las variables de entorno al inicio
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http'); // Necesario para el servidor HTTP y Socket.IO
//const { Server } = require('socket.io'); // Para Socket.IO

// ----------------------------------------------------
// 2. Importar configuraciones y utilidades
// ----------------------------------------------------
const httpsAgent = require('./config/httpsAgent'); // Asegúrate de que este archivo exista
const { logEvent, initializeLogger } = require('./config/logging.config'); // Ruta ajustada


// ----------------------------------------------------
// 3. Importar modelos de la base de datos
// ----------------------------------------------------
// Importamos los modelos directamente si los necesitamos en el server.js (ej. para sensor-data endpoint)
// Ajusta las rutas según tu estructura real (ej. './models/SensorData' o './models/SensorData.model')


// ----------------------------------------------------
// 4. Configurar y crear instancias de servidor y Socket.IO
// ----------------------------------------------------
const app = express();
const server = http.createServer(app); // Creamos un servidor HTTP a partir de la aplicación Express

/*const io = new Server(server, { // Inicializamos Socket.IO con el servidor HTTP
  cors: {
    origin: '*', // Permite todas las conexiones, ajustar el frontend en producción
    methods: ['GET', 'POST'],
  },
});*/

// ----------------------------------------------------
// 5. Inicializar el Logger con la instancia de Socket.IO
// ----------------------------------------------------
//initializeLogger(io); // Pasa la instancia de io al logger para emitir eventos en tiempo real

// ----------------------------------------------------
// 6. Middlewares Globales
// ----------------------------------------------------
app.use(cors()); // Habilita CORS para todas las rutas
app.use(bodyParser.json({ limit: '500mb' })); // Para parsear application/json
app.use(express.json()); // Otra forma de parsear application/json
app.use(express.urlencoded({ limit: '500mb', extended: true })); // Para parsear application/x-www-form-urlencoded

// Pass the httpsAgent to the app's locals (if needed by other modules that don't import it directly)
// Although, it's better for modules to import it themselves if they need it.
app.set('httpsAgent', httpsAgent);

// Middleware para registrar logs de solicitudes (excluyendo rutas específicas)
app.use((req, res, next) => {
  const excludedPaths = ['/logs', '/sensor-data', '/sensor', '/canales', '/socket.io', '/api/test'];
  if (!excludedPaths.some(path => req.url.startsWith(path))) {
    logEvent(`Request: ${req.method} ${req.url}`);
  }
  next();
});

// Middleware para registrar logs de intentos de autenticación o solicitudes de usuario
app.use(async (req, res, next) => {
  if (req.path.startsWith('/auth')) {
    logEvent(`Intento de autenticación para el usuario ${req.body.username || 'desconocido'}`);
  } else {
    // Asume que 'req.user' es establecido por un middleware de autenticación (ej. JWT)
    const user = req.user;
    if (user && user.username && user.role) {
      logEvent(`Usuario ${user.username} (${user.role}) realizó la solicitud ${req.method} ${req.path}`);
    } else {
      // Opcional: loggear solicitudes no autenticadas, pero puede ser muy ruidoso
      // logEvent(`Solicitud no autenticada: ${req.method} ${req.path}`);
    }
  }
  next();
});

// ----------------------------------------------------
// 7. Conexión a MongoDB y limpieza inicial de datos
// ----------------------------------------------------
/*connectToMongoDB(); // Inicia la conexión a MongoDB
(async () => {
  const response = await cleanSensorData(); // Ejecuta la función de limpieza al inicio
  if (response.error) {
    console.error('Error en la limpieza automática al iniciar:', response.error);
    logEvent(`Error en la limpieza automática al iniciar: ${response.error}`);
  } else {
    console.log('Limpieza automática al iniciar completada:', response.message);
    logEvent(`Limpieza automática al iniciar completada: ${response.message}`);
  }
})();*/

// ----------------------------------------------------
// 8. Sincronización de la base de datos (Sequelize) e inicialización de roles
// ----------------------------------------------------
const db = require('./models'); // Asume que './models/index.js' configura Sequelize
const Role = db.role; // Asume que tienes un modelo Role definido en Sequelize

db.sequelize.sync().then(() => {
  console.log('Base de datos Sequelize sincronizada.');
  logEvent('Base de datos Sequelize sincronizada.');
  initial(); // Llama a la función para inicializar los roles
}).catch(err => {
  console.error('Error al sincronizar la base de datos Sequelize:', err);
  logEvent(`Error al sincronizar la base de datos Sequelize: ${err.message}`);
});

// Función para inicializar los roles en la base de datos
function initial() {
  Role.findAll()
    .then(roles => {
      if (roles.length === 0) {
        console.log('Inicializando roles...');
        Role.bulkCreate([ // Usar bulkCreate para insertar múltiples en una sola llamada
          { id: 1, name: 'usuario' },
          { id: 2, name: 'moderador' },
          { id: 3, name: 'administrador' },
          { id: 4, name: 'administrador-CNW' }
        ]).then(() => {
          console.log('Roles de base de datos inicializados.');
          logEvent('Roles de base de datos inicializados.');
        }).catch(err => {
          console.error('Error al crear los roles:', err);
          logEvent(`Error al crear los roles: ${err.message}`);
        });
      } else {
        console.log('Roles ya existentes.');
        logEvent('Roles de base de datos ya existentes.');
      }
    })
    .catch(err => {
      console.error('Error al revisar los roles:', err);
      logEvent(`Error al revisar los roles: ${err.message}`);
    });
}

// ----------------------------------------------------
// 9. Rutas de la aplicación
// ----------------------------------------------------

// Ruta de bienvenida
app.get('/', (req, res) => {
  res.json({ message: 'Bienvenido esta es la aplicación CONSULNETWORKS.' });
  logEvent('Ruta raíz accedida: /');
});

// Endpoint para obtener logs del archivo (no en tiempo real, solo contenido del archivo)
/*app.get('/logs', (req, res) => {
  const fs = require('fs');
  const logFilePath = path.join(__dirname, 'logs/app.log'); // Ruta completa al archivo de logs
  fs.readFile(logFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error al leer el archivo de logs:', err.message);
      res.status(500).send('Error al leer los logs');
    } else {
      // Parsear cada línea como un objeto JSON
      const logs = data.split('\n')
        .filter(line => line.trim() !== '') // Filtrar líneas vacías
        .map(line => {
          try {
            return JSON.parse(line);
          } catch (e) {
            // Manejar líneas que no son JSON válidas (ej. la última línea incompleta)
            console.warn('Could not parse log line:', line);
            return { message: `Malformed log entry: ${line.substring(0, 100)}...`, timestamp: new Date().toISOString() };
          }
        });
      res.json(logs);
    }
  });
});*/

// ----------------------------------------------------
// 10. Cargar las rutas modulares
// ----------------------------------------------------
// Asegúrate de que estas rutas existan en tu estructura de carpetas
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/auth2fa.routes')(app); // Rutas de autenticación de 2 factores

// ----------------------------------------------------
// 11. Configuración del puerto y arranque del servidor
// ----------------------------------------------------
const PORT = process.env.PORT || 8083;
server.listen(PORT, () => { // Usa 'server.listen' en lugar de 'app.listen' cuando usas Socket.IO
  console.log(`El servidor se está ejecutando en el puerto ${PORT}.`);
  logEvent(`El servidor se está ejecutando en el puerto ${PORT}.`); // Log del inicio del servidor
});

// ----------------------------------------------------
// 12. Manejo de conexiones de Socket.IO
// ----------------------------------------------------
/*io.on('connection', (socket) => {
  console.log('Un usuario se ha conectado al WebSocket.');
  logEvent('Un usuario se ha conectado al WebSocket.');

  socket.on('disconnect', () => {
    console.log('Un usuario se ha desconectado del WebSocket.');
    logEvent('Un usuario se ha desconectado del WebSocket.');
  });

  // Puedes añadir más oyentes de eventos de socket aquí si es necesario
});*/

// Codigo disponible para nuevas funciones.