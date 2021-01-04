"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarEvento = exports.actualizarEvento = exports.crearEvento = exports.getEventos = void 0;
const evento_model_1 = require("../models/evento.model");
const getEventos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const eventos = yield evento_model_1.Evento.find().populate("user", "name");
        res.status(200).send({ ok: true, eventos });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            ok: false,
            msg: "hable con el administrador",
        });
    }
});
exports.getEventos = getEventos;
const crearEvento = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const evento = new evento_model_1.Evento(req.body);
    try {
        evento.user = req.id;
        const eventoGuardado = yield evento.save();
        res.status(201).json({ ok: true, evento: eventoGuardado });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            ok: false,
            msg: "hable con el administrador",
        });
    }
});
exports.crearEvento = crearEvento;
const actualizarEvento = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const eventoId = req.params.id;
    const userId = req.id;
    try {
        const evento = yield evento_model_1.Evento.findById(eventoId);
        if (!evento) {
            return res.status(404).json({ ok: false, msg: "evento no existe" });
        }
        if (evento.user.toString() !== userId) {
            return res
                .status(401)
                .json({ ok: false, msg: "no tiene privilegio de editar este evento" });
        }
        const nuevoEvento = Object.assign(Object.assign({}, req.body), { user: userId });
        const eventoActualizado = yield evento_model_1.Evento.findByIdAndUpdate(eventoId, nuevoEvento, { new: true });
        return res.status(200).json({ ok: true, evento: eventoActualizado });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({
            ok: false,
            msg: "hable con el administrador",
        });
    }
});
exports.actualizarEvento = actualizarEvento;
const eliminarEvento = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const eventoId = req.params.id;
    const userId = req.id;
    try {
        const evento = yield evento_model_1.Evento.findById(eventoId);
        if (!evento) {
            return res.status(404).json({ ok: false, msg: "evento no existe" });
        }
        if (evento.user.toString() !== userId) {
            return res
                .status(401)
                .json({ ok: false, msg: "no tiene privilegio de editar este evento" });
        }
        yield evento_model_1.Evento.findByIdAndDelete(eventoId);
        return res.status(200).json({ ok: true });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({
            ok: false,
            msg: "hable con el administrador",
        });
    }
});
exports.eliminarEvento = eliminarEvento;
