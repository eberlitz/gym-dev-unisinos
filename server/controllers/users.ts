import { User } from '../models/user';
import express = require('express');
const router = express.Router();

// users list
router.get('/', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

// get single user
router.get('/:id', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

// create user
router.post('/', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const { username, password } = req.body;
    const user = new User({
      local: {
        username
      }
    });
    if (password) {
      user.local.password = user.generateHash(password);
    }
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

// edit user
router.put('/:id', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const params = {
      local: req.body
    };
    if (params.local.password) {
      params.local.password = User.prototype.generateHash(params.local.password);
    }
    const user = await User.findOneAndUpdate({
      _id: req.params.id
    }, params, { new: true, runValidators: true });
    res.json(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

// delete user
router.delete('/:id', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const _id = req.params.id;
    if (req.user.id === _id) {
      throw 'Cannot delete logged user!';
    }
    await User.findOneAndRemove({ _id });
    res.status(204).send();
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
