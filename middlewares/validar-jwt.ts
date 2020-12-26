import { Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";
import { SECRED_JWT_SEED } from "../config";

export const validarJWT = (req: any, res: Response, next: Function) => {
  // x-token
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({ ok: false, msg: "no hay token" });
  }

  try {
    const payload: any = jsonwebtoken.verify(token, SECRED_JWT_SEED);
    req.id = payload.id;
    req.name = payload.name;
    
  } catch (e) {
    return res.status(401).json({ ok: false, msg: "token no válido" });
  }

  next();
};
