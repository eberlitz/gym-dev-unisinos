import { IProduct } from '../../interfaces/product';
import mongoose = require('mongoose');

export interface IProductSchema extends IProduct, mongoose.Document {}

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    required: true
  },
}, { timestamps: true });

export const Product = mongoose.model<IProductSchema>('Product', productSchema);
