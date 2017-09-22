import express = require('express');
// import request = require('request-promise');
import bluebird = require('bluebird');
const jwt = require('jsonwebtoken');

const router = express.Router();
module.exports = router;

import { config } from '../config';
import { User, IUserSchema } from '../models/user';


declare module 'express' {
  interface Request {
    user: { id: string };
  }
}

router.post('/local', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const { username, password } = req.body;
  const user = await User.findOne({ 'local.username': username });
  if (!user || !user.validPassword(password)) {
    res.sendStatus(401);
  } else {
    const token = createJWT(user);
    res.send({ access_token: token });
  }
});

function createJWT(user: IUserSchema) {
  return jwt.sign({ id: user.id }, config.JWT_SECRET, { expiresIn: '24h' });
}
