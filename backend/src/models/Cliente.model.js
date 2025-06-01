import { Schema, model } from 'mongoose';

const ClienteSchema = new Schema({
    clienteId: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,
        unique: true
    },
    categoria: {
        type: String,
        enum: ['Cobre', 'Plata', 'Oro']
    },
    preferencias: [{
        type: String
    }]
}, {
    timestamps: true
});

export default model('Cliente', ClienteSchema);