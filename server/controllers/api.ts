import express = require('express');
const router = express.Router();
import { router as userRouter } from './users';
import { meRouter } from './me';

router.use('/users', userRouter);
router.use('/products', require('./products'));
// current user routes
router.use('/me', meRouter);

module.exports = router;
