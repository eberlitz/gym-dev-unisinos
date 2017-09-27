import express = require('express');
const router = express.Router();

import { User } from '../models/user';

// users list
router.get('/', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

// create user
router.post('/', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const user = new User(req.body);
    if (user.local.password) {
      user.local.password = user.generateHash(user.local.password);
    }
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

// get user by id
router.get('/:id', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const _id = req.params.id;
    const user = await User.findOne({ _id });
    res.json(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

// edit user
router.put('/:id', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    // find user
    const _id = req.params.id;
    const user = await User.findOne({ _id });
    // put request params on user
    const params = req.body || {};
    const local = params.local;
    if (local) {
      if (local.username) {
        user.local.username = local.username;
      }
      if (local.password) {
        user.local.password = user.generateHash(local.password);
      }
    }
    delete params.local;
    for (const key in params) {
      user[key] = params[key];
    }
    // save and return
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

// delete user
router.delete('/:id', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const _id = req.params.id;
    await User.remove({ _id });
    res.status(204).send();
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
