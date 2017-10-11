import express = require('express');
const router = express.Router();

import { router as me } from './me';
import { router as users } from './users';
import { router as products } from './products';

router.use('/me', me);
router.use('/users', users);
router.use('/products', products);

module.exports = router;
