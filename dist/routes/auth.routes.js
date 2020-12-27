"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const auth_1 = require("../controllers/auth");
const validar_campos_1 = require("../middlewares/validar-campos");
const validar_jwt_1 = require("../middlewares/validar-jwt");
/**
 * Rutas de usuarios / Auth
 * host + /api/auth
 */
const authRoutes = express_1.Router();
authRoutes.post("/", [
    express_validator_1.check('email', 'El email es obligatorio').isEmail(),
    express_validator_1.check('password', 'El password debe ser de 6 caracteres').isLength({ min: 6 }),
    validar_campos_1.validarCampos
], auth_1.LoginUsuario);
authRoutes.post("/new", [
    express_validator_1.check('name', 'El nombre es obligatorio').not().isEmpty(),
    express_validator_1.check('email', 'El nombre es obligatorio').isEmail(),
    express_validator_1.check('password', 'El password debe ser de 6 caracteres').isLength({ min: 6 }),
    validar_campos_1.validarCampos
], auth_1.CrearUsuario);
authRoutes.get("/renew", validar_jwt_1.validarJWT, auth_1.RevalidarToken);
exports.default = authRoutes;
