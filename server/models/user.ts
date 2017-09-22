import mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

export interface IUserSchema extends mongoose.Document {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  local: {
    username: string;
    password: string;
  };
  generateHash(password: string): string;
  validPassword(password: string): boolean;
}

const userSchema = new mongoose.Schema({
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
