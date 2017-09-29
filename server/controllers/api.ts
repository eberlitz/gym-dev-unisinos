import express = require('express');
const router = express.Router();
import { router as userRouter } from './users';

router.use('/users', userRouter);
router.use('/products', require('./products'));

module.exports = router;
