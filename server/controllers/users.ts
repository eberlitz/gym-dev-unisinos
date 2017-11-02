import express = require('express');
const router = express.Router();

import authorize from './../authorize';
import { User } from '../models/user';

router.use(authorize.jwt);
router.use(authorize.admin);

router.get('/', async (req: express.Request, res: express.Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post('/', async (req: express.Request, res: express.Response) => {
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

router.get('/:id', async (req: express.Request, res: express.Response) => {
  try {
    const _id = req.params.id;
    const user = await User.findOne({ _id });
    delete user.local.password;
    res.json(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.patch('/:id', async (req: express.Request, res: express.Response) => {
  try {
    const _id = req.params.id;
    const user = await User.findOne({ _id });
    update(user, req.body);
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete('/:id', async (req: express.Request, res: express.Response) => {
  try {
    const _id = req.params.id;
    await User.remove({ _id });
    res.status(204).send();
  } catch (error) {
    res.status(500).send(error);
  }
});

// register user
export async function register(req: express.Request, res: express.Response) {
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
}

// assign params as user attributes
export function update(user, params) {
  if (!params) {
    return user;
  }
  if (params.local) {
    if (params.local.password) {
      params.local.password = user.generateHash(params.local.password);
    }
    Object.assign(user.local, params.local);
    delete params.local;
  }
  if (params.address) {
    Object.assign(user.address, params.address);
    delete params.address;
  }
  Object.assign(user, params);
  return user;
}

export { router };
