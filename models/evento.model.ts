import { Schema, model, Document } from 'mongoose';
import { IUsuario } from './usuario.model'

const EventoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    notes: {
        type: String
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
});

export interface IEvento extends Document {
    title : string;
    notes : string;
    start : Date;
    end : Date;
    user : IUsuario;
}

export const Evento = model<IEvento>('Evento', EventoSchema);