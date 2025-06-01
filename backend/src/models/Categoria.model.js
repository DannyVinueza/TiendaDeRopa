import mongoose, { Schema, model } from 'mongoose';

const CategoriaSchema = new Schema({
    nombre: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

export default model('Categoria', CategoriaSchema);