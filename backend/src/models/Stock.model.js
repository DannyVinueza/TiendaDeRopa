import mongoose, { Schema, model } from 'mongoose';

const StockSchema = new Schema({
    productoId: {
        type: Schema.Types.ObjectId,
        ref: 'Producto',
        required: true
    },
    talla: {
        type: String
    },
    color: {
        type: String
    },
    cantidad: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

export default model('Stock', StockSchema);