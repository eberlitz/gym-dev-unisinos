import express = require('express');
const meRouter = express.Router();

import { User } from '../models/user';
import { update } from './users';

meRouter.get('/', async (req: express.Request, res: express.Response) => {
  try {
    const _id = req.user.id;
    const user = await User.findOne({ _id });
    res.json(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

meRouter.put('/', async (req: express.Request, res: express.Response) => {
  try {
    const _id = req.user.id;
    const user = await User.findOne({ _id });
    update(user, req.body);
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

meRouter.delete('/', async (req: express.Request, res: express.Response) => {
  try {
    const _id = req.user.id;
    await User.remove({ _id });
    res.status(204).send();
  } catch (error) {
    res.status(500).send(error);
  }
});

export { meRouter };
