import express = require('express');
import jwt = require('express-jwt');

import { config } from './config';

export default {

  admin: (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (!req.user.admin) {
      const error = 'Without admin permission';
      res.status(401).send(error);
    } else {
      next();
    }
  },

  jwt: jwt({ secret: config.JWT_SECRET })

};
