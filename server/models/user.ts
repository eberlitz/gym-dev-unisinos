import mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

export interface IUserSchema extends mongoose.Document {
  id: string;
  name: string;
  admin: boolean;
  local: {
    username: string;
    password: string;
  };
  createdAt: Date;
  updatedAt: Date;
  generateHash(password: string): string;
  validPassword(password: string): boolean;
}

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  admin: { type: Boolean, default: false },
  local: {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
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
