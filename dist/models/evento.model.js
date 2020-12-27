"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Evento = void 0;
const mongoose_1 = require("mongoose");
const EventoSchema = new mongoose_1.Schema({
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
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
});
exports.Evento = mongoose_1.model('Evento', EventoSchema);
