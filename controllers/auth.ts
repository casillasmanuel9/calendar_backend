import { Request, Response } from "express";
import { Usuario } from "../models/usuario.model";
import bcryptjs from "bcryptjs";
import { generarJWT } from "../helpers/jwt";

export const CrearUsuario = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    let usuario = await Usuario.findOne({ email });
    console.log(usuario);
    if (usuario) {
      return res
        .status(500)
        .json({ ok: false, msg: "Un usuario ya existe con ese correo" });
    }

    usuario = new Usuario(req.body);

    //Encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);
    await usuario.save();

    const token = await generarJWT(usuario._id, usuario.name);
    return res
      .status(201)
      .json({ ok: true, id: usuario.id, name: usuario.name, token });
  } catch (e) {
    return res
      .status(500)
      .json({ ok: false, msg: "Por favor hable con el adminsitrador" });
  }
};

export const LoginUsuario = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    let usuario = await Usuario.findOne({ email });
    console.log(usuario);
    if (!usuario) {
      return res
        .status(500)
        .json({ ok: false, msg: "Un usuario no existe con este correo" });
    }

    // verificar contraseña
    const validPassword = bcryptjs.compareSync(password, usuario.password);
    if (!validPassword)
      return res.status(400).json({ ok: false, msg: "password incorrecto" });
    
    // Crear json web token
    const token = await generarJWT(usuario._id, usuario.name);
    return res.json({ ok: true, id: usuario.id, name: usuario.name, token})

  } catch (e) {
    return res
      .status(500)
      .json({ ok: false, msg: "Por favor hable con el adminsitrador" });
  }
  res.json({ ok: true, msg: "login", email, password });
};

export const RevalidarToken = async (req: any, res: Response) => {
    const id = req.id;
    const name = req.name;
    const token = await generarJWT(id, name);
  res.json({ ok: true, msg: "renew", token });
};
