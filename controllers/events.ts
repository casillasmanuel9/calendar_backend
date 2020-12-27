import { Request, Response } from "express";
import { Evento } from "../models/evento.model";

export const getEventos = async (req: Request, res: Response) => {
  try {
    const eventos = await Evento.find().populate("user", "name");
    res.status(200).send({ ok: true, eventos });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      ok: false,
      msg: "hable con el administrador",
    });
  }
};

export const crearEvento = async (req: any, res: Response) => {
  const evento = new Evento(req.body);
  try {
    evento.user = req.id;
    const eventoGuardado = await evento.save();
    res.status(201).json({ ok: true, evento: eventoGuardado });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      ok: false,
      msg: "hable con el administrador",
    });
  }
};

export const actualizarEvento = async (req: any, res: Response) => {
  const eventoId = req.params.id;
  const userId = req.id;

  try {
    const evento = await Evento.findById(eventoId);

    if (!evento) {
      return res.status(404).json({ ok: false, msg: "evento no existe" });
    }

    if (evento.user.toString() !== userId) {
      return res
        .status(401)
        .json({ ok: false, msg: "no tiene privilegio de editar este evento" });
    }

    const nuevoEvento = {
      ...req.body,
      user: userId,
    };

    const eventoActualizado = await Evento.findByIdAndUpdate(
      eventoId,
      nuevoEvento,
      { new: true }
    );
    return res.status(200).json({ ok: false, evento: eventoActualizado });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      ok: false,
      msg: "hable con el administrador",
    });
  }
};

export const eliminarEvento = async (req: any, res: Response) => {
  const eventoId = req.params.id;
  const userId = req.id;

  try {
    const evento = await Evento.findById(eventoId);

    if (!evento) {
      return res.status(404).json({ ok: false, msg: "evento no existe" });
    }

    if (evento.user.toString() !== userId) {
      return res
        .status(401)
        .json({ ok: false, msg: "no tiene privilegio de editar este evento" });
    }

    await Evento.findByIdAndDelete(eventoId);
    return res.status(200).json({ ok: false });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      ok: false,
      msg: "hable con el administrador",
    });
  }
};
