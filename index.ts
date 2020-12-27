import Server from "./classes/Server";
import express from 'express'
import authRoutes from "./routes/auth.routes";
import { dbConnection } from "./database/config";
import cors from 'cors';
import { eventsRoutes } from "./routes/events.routes";

const server = new Server();
/**
 * Directorio Publico
*/
server.app.use( express.static('public') )

/**
 * Base de datos
 */
dbConnection();

/**
 * CORS
 */
server.app.use(cors());

/**
 * Lectura y parseo del body
 */
server.app.use( express.json() );

/**
 * Rutas
 */
server.app.use('/api/auth', authRoutes );
server.app.use('/api/events', eventsRoutes );

/**
 * Iniciar Servidor
 */
server.start( () => console.log(`Servidor corriendo en ${server.port}`) );
