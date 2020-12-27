"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Server_1 = __importDefault(require("./classes/Server"));
const express_1 = __importDefault(require("express"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const config_1 = require("./database/config");
const cors_1 = __importDefault(require("cors"));
const events_routes_1 = require("./routes/events.routes");
const server = new Server_1.default();
/**
 * Directorio Publico
*/
server.app.use(express_1.default.static('public'));
/**
 * Base de datos
 */
config_1.dbConnection();
/**
 * CORS
 */
server.app.use(cors_1.default());
/**
 * Lectura y parseo del body
 */
server.app.use(express_1.default.json());
/**
 * Rutas
 */
server.app.use('/api/auth', auth_routes_1.default);
server.app.use('/api/events', events_routes_1.eventsRoutes);
/**
 * Iniciar Servidor
 */
server.start(() => console.log(`Servidor corriendo en ${server.port}`));
