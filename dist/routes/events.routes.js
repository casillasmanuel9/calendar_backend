"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventsRoutes = void 0;
const express_1 = require("express");
const events_1 = require("../controllers/events");
const validar_jwt_1 = require("../middlewares/validar-jwt");
const express_validator_1 = require("express-validator");
const validar_campos_1 = require("../middlewares/validar-campos");
const isDate_1 = require("../helpers/isDate");
/**
 * Rutas de usuarios / events
 * host + /api/events
 */
exports.eventsRoutes = express_1.Router();
exports.eventsRoutes.use(validar_jwt_1.validarJWT);
exports.eventsRoutes.get('/', events_1.getEventos);
exports.eventsRoutes.post('/', [
    express_validator_1.check("title", "el titulo es obligatorio").not().isEmpty(),
    express_validator_1.check("start", "fecha de inicio es obligatoria").custom(isDate_1.isDate),
    express_validator_1.check("end", "fecha de fin es obligatoria").custom(isDate_1.isDate),
    validar_campos_1.validarCampos
], events_1.crearEvento);
exports.eventsRoutes.put('/:id', [
    express_validator_1.check("title", "el titulo es obligatorio").not().isEmpty(),
    express_validator_1.check("start", "fecha de inicio es obligatoria").custom(isDate_1.isDate),
    express_validator_1.check("end", "fecha de fin es obligatoria").custom(isDate_1.isDate),
    validar_campos_1.validarCampos
], events_1.actualizarEvento);
exports.eventsRoutes.delete('/:id', events_1.eliminarEvento);
