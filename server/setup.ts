import mongoose = require('mongoose');
import { User } from './models/user';

async function init() {
  const _id = '59ac3b3736adff29536e9ed9';
  let adminUser = await User.findOne({ _id });
  if (!adminUser) {
    adminUser = new User({
      _id: new mongoose.Types.ObjectId(_id),
      name: 'admin',
      email: 'admin@admin.com',
      admin: true,
      local: {
        username: 'admin'
      }
    });
    adminUser.local.password = adminUser.generateHash('admin');
  }
  return await adminUser.save();
}

init();
