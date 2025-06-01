import { Schema, model } from 'mongoose';

const PagoSchema = new Schema({
    pedidoId: {
        type: Schema.Types.ObjectId,
        ref: 'Pedido',
        required: true
    },
    metodo: {
        type: String
    },
    monto: {
        type: Number,
        required: true
    },
    fechaPago: {
        type: Date
    }
}, {
    timestamps: true
});

export default model('Pago', PagoSchema);