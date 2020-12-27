import { Router } from "express";
import { actualizarEvento, crearEvento, eliminarEvento, getEventos } from "../controllers/events";
import { validarJWT } from "../middlewares/validar-jwt";
import { check } from 'express-validator'
import { validarCampos } from '../middlewares/validar-campos'
import { isDate } from "../helpers/isDate";

/**
 * Rutas de usuarios / events
 * host + /api/events
 */

export const eventsRoutes = Router();

eventsRoutes.use( validarJWT );


eventsRoutes.get('/', getEventos);
eventsRoutes.post('/', [
    check("title", "el titulo es obligatorio").not().isEmpty(),
    check("start", "fecha de inicio es obligatoria").custom(isDate),
    check("end", "fecha de fin es obligatoria").custom(isDate),
    validarCampos
] ,crearEvento);
eventsRoutes.put('/:id', [
    check("title", "el titulo es obligatorio").not().isEmpty(),
    check("start", "fecha de inicio es obligatoria").custom(isDate),
    check("end", "fecha de fin es obligatoria").custom(isDate),
    validarCampos
] ,actualizarEvento);
eventsRoutes.delete('/:id', eliminarEvento);
