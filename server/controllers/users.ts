import express = require('express');
const router = express.Router();
import { User } from '../models/user';

router.get('/', async (req: express.Request, res: express.Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post('/', create);

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

router.get('/me', async (req: express.Request, res: express.Response) => {
  try {
    const _id = req.user.id;
    const user = await User.findOne({ _id });
    res.json(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put('/:id', async (req: express.Request, res: express.Response) => {
  try {
    const _id = req.params.id;
    const user = await User.findOne({ _id });
    const body = Object.assign({}, req.body);
    const local = body.local;
    if (local) {
      if (local.username) {
        user.local.username = local.username;
      }
      if (local.password) {
        user.local.password = user.generateHash(local.password);
      }
    }
    delete body.local;
    for (const key in body) {
      user[key] = body[key];
    }
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

export async function create(req: express.Request, res: express.Response) {
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

export { router };
