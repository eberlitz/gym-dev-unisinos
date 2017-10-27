import mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

export interface IUserSchema extends mongoose.Document {
  id: string;
  name: string;
  email: string;
  admin: boolean;
  local: {
    username: string;
    password: string;
  };
  address: {
    country: string;
    state: string;
    city: string;
    street: string;
    number: number;
  };
  createdAt: Date;
  updatedAt: Date;
  generateHash(password: string): string;
  validPassword(password: string): boolean;
}

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  admin: { type: Boolean, default: false },
  local: {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
  },
  address: {
    country: { type: String },
    state: { type: String },
    city: { type: String },
    street: { type: String },
    number: { type: Number },
  }
}, { timestamps: true });

// generating a hash
userSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.local.password);
};

export const User = mongoose.model<IUserSchema>('User', userSchema);
