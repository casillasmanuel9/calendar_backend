import mongoose from "mongoose";
import { DB_CNN } from "../config";

export const dbConnection = async () => {
  try {
    await mongoose.connect(DB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });

    console.log('Base de Datos Online')
  } catch (e) {
    console.log(e);
    throw new Error("Error al iniciar la base de datos");
  }
};
