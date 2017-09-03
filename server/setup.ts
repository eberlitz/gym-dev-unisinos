import { User } from './models/user';
import mongoose = require('mongoose');



async function init() {
  let adminUser = await User.findById('59ac3b3736adff29536e9ed9');
  if (!adminUser) {
    adminUser = new User({
      _id: new mongoose.Types.ObjectId('59ac3b3736adff29536e9ed9'),
      local: {
        username: 'admin'
      }
    });
    adminUser.local.password = adminUser.generateHash('admin');
  }
  return await adminUser.save();
}


init();
