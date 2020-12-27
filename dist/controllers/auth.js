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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RevalidarToken = exports.LoginUsuario = exports.CrearUsuario = void 0;
const usuario_model_1 = require("../models/usuario.model");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt_1 = require("../helpers/jwt");
const CrearUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        let usuario = yield usuario_model_1.Usuario.findOne({ email });
        console.log(usuario);
        if (usuario) {
            return res
                .status(500)
                .json({ ok: false, msg: "Un usuario ya existe con ese correo" });
        }
        usuario = new usuario_model_1.Usuario(req.body);
        //Encriptar contraseña
        const salt = bcryptjs_1.default.genSaltSync();
        usuario.password = bcryptjs_1.default.hashSync(password, salt);
        yield usuario.save();
        const token = yield jwt_1.generarJWT(usuario._id, usuario.name);
        return res
            .status(201)
            .json({ ok: true, id: usuario.id, name: usuario.name, token });
    }
    catch (e) {
        return res
            .status(500)
            .json({ ok: false, msg: "Por favor hable con el adminsitrador" });
    }
});
exports.CrearUsuario = CrearUsuario;
const LoginUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        let usuario = yield usuario_model_1.Usuario.findOne({ email });
        console.log(usuario);
        if (!usuario) {
            return res
                .status(500)
                .json({ ok: false, msg: "Un usuario no existe con este correo" });
        }
        // verificar contraseña
        const validPassword = bcryptjs_1.default.compareSync(password, usuario.password);
        if (!validPassword)
            return res.status(400).json({ ok: false, msg: "password incorrecto" });
        // Crear json web token
        const token = yield jwt_1.generarJWT(usuario._id, usuario.name);
        return res.json({ ok: true, id: usuario.id, name: usuario.name, token });
    }
    catch (e) {
        return res
            .status(500)
            .json({ ok: false, msg: "Por favor hable con el adminsitrador" });
    }
    res.json({ ok: true, msg: "login", email, password });
});
exports.LoginUsuario = LoginUsuario;
const RevalidarToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.id;
    const name = req.name;
    const token = yield jwt_1.generarJWT(id, name);
    res.json({ ok: true, msg: "renew", token });
});
exports.RevalidarToken = RevalidarToken;
