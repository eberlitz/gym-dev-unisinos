import express = require('express');
const router = express.Router();

router.get('/', (req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.json({
    message: 'ok',
    user: req.user
  });
});

// users routes
router.use('/users', require('./users'));

module.exports = router;
