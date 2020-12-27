import { Router } from "express";
import { check } from 'express-validator'

import {
  CrearUsuario,
  LoginUsuario,
  RevalidarToken,
} from "../controllers/auth";
import { validarCampos } from "../middlewares/validar-campos";
import { validarJWT } from "../middlewares/validar-jwt";

/**
 * Rutas de usuarios / Auth
 * host + /api/auth
 */
const authRoutes = Router();

authRoutes.post("/", [
    check('email','El email es obligatorio').isEmail(),
    check('password','El password debe ser de 6 caracteres').isLength({min: 6}),
    validarCampos
], LoginUsuario);
authRoutes.post("/new", [
    check('name','El nombre es obligatorio').not().isEmpty(),
    check('email','El nombre es obligatorio').isEmail(),
    check('password','El password debe ser de 6 caracteres').isLength({min: 6}),
    validarCampos
], CrearUsuario);
authRoutes.get("/renew", validarJWT ,RevalidarToken);

export default authRoutes;
