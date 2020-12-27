"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pruebaRoutes = express_1.Router();
pruebaRoutes.get('/prueba', (req, res) => {
    res.json({ ok: true });
});
exports.default = pruebaRoutes;
