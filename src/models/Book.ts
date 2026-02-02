import mongoose, { Schema, Document } from 'mongoose';

export interface IBook extends Document {
    title: string;
    author: string;
    genre: string;
    price: number;
    publicationYear: number;
    stock: number;
}

const BookSchema: Schema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    publicationYear: { type: Number, required: true },
    stock: { type: Number, required: true, min: 0, default: 0 },
}, { timestamps: true });

BookSchema.index({ title: 'text', author: 'text', genre: 'text' });

export default mongoose.model<IBook>('Book', BookSchema);
