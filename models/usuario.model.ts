import { Schema, model, Document } from 'mongoose';

const UsuarioShema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

export interface IUsuario extends Document {
    name: string,
    email: string,
    password: string
}

export const Usuario = model<IUsuario>('Usuario', UsuarioShema);