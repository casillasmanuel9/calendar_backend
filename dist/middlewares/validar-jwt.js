"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const validarJWT = (req, res, next) => {
    // x-token
    const token = req.header("x-token");
    if (!token) {
        return res.status(401).json({ ok: false, msg: "no hay token" });
    }
    try {
        const payload = jsonwebtoken_1.default.verify(token, config_1.SECRED_JWT_SEED);
        req.id = payload.id;
        req.name = payload.name;
    }
    catch (e) {
        return res.status(401).json({ ok: false, msg: "token no válido" });
    }
    next();
};
exports.validarJWT = validarJWT;
