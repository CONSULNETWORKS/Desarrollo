// config/logging.config.js
const winston = require('winston');
const path = require('path');
const fs = require('fs'); // Necesario para crear el directorio de logs

// Directorio para almacenar los archivos de logs
const logDirectory = path.join(__dirname, '../logs'); // Apunta a la carpeta 'logs' en la raíz del proyecto
const logFilePath = path.join(logDirectory, 'app.log'); // Nombre del archivo de log

// Asegúrate de que el directorio de logs exista. Si no, créalo.
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory, { recursive: true }); // 'recursive: true' crea directorios anidados si no existen
}

// Configuración de Winston para los logs
const logger = winston.createLogger({
  level: 'info', // Nivel mínimo de log a registrar (info, warn, error, debug, etc.)
  format: winston.format.json(), // Formato de los logs en JSON para fácil parseo
  transports: [
    // Transporte para escribir logs en un archivo
    new winston.transports.File({
      filename: logFilePath,
      maxsize: 5 * 1024 * 1024, // 5MB, rota el archivo si excede este tamaño
      maxFiles: 5, // Mantener un máximo de 5 archivos de log rotados
      handleExceptions: true, // Captura excepciones no manejadas
    }),
    // Transporte para mostrar logs en la consola (útil para desarrollo)
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(), // Añade colores a los logs en la consola
        winston.format.simple() // Formato simple para la consola
      ),
      handleExceptions: true, // Captura excepciones no manejadas
    }),
  ],
  // Evitar que la aplicación se cierre al detectar una excepción no manejada si no se desea ese comportamiento
  // exitOnError: false,
});

// Variable para almacenar la instancia de Socket.IO
let ioInstance = null;

/**
 * Inicializa el logger con la instancia de Socket.IO.
 * Esto es crucial para poder emitir logs en tiempo real a través de WebSockets.
 * Debe llamarse una vez al inicio del servidor (en server.js).
 * @param {SocketIO.Server} io - La instancia del servidor Socket.IO.
 */
const initializeLogger = (io) => {
  ioInstance = io;
  logger.info('Logger inicializado con la instancia de Socket.IO.');
};

/**
 * Registra un evento en los logs y lo emite a través de Socket.IO.
 * Esta es la función principal que usarás para loggear eventos en tu aplicación.
 * @param {string} message - El mensaje del log.
 * @param {string} [level='info'] - El nivel del log (info, warn, error, debug, etc.). Por defecto es 'info'.
 * @param {object} [meta={}] - Metadatos adicionales para el log (opcional).
 */
const logEvent = (message, level = 'info', meta = {}) => {
  const logEntry = {
    message,
    timestamp: new Date().toISOString(), // Usar ISO 8601 para consistencia
    ...meta, // Añadir metadatos adicionales si se proporcionan
  };

  // Registrar el log usando Winston
  logger.log(level, logEntry);

  // Emitir el log a través de Socket.IO si la instancia está disponible
  if (ioInstance) {
    ioInstance.emit('log', logEntry); // 'log' es el nombre del evento que el frontend escuchará
  }
};

module.exports = {
  logger, // Puedes exportar el logger directamente si necesitas acceder a sus métodos de bajo nivel
  logEvent, // La función principal para registrar eventos
  initializeLogger, // Función para inicializar la conexión con Socket.IO
};