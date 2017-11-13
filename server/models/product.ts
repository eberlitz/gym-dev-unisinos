import mongoose = require('mongoose');

export interface IProductSchema extends mongoose.Document {
  name: string;
  description: string;
  price: number;
  stock: number;
  enabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}

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
  enabled: {
    type: Boolean
  },
}, { timestamps: true });

export const Product = mongoose.model<IProductSchema>('Product', productSchema);
