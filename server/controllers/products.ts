import express = require('express');
const router = express.Router();

import { Product } from '../models/product';

router.get('/', async (req: express.Request, res: express.Response) => {
  try {
    const products = await Product.find(req.params || {});
    res.json(products);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post('/', async (req: express.Request, res: express.Response) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.json(product);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/:id', async (req: express.Request, res: express.Response) => {
  try {
    const _id = req.params.id;
    const product = await Product.findOne({ _id });
    res.json(product);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put('/:id', async (req: express.Request, res: express.Response) => {
  try {
    const _id = req.params.id;
    const product = await Product.findOne({ _id });
    const body = req.body || {};
    for (const key in body) {
      product[key] = body[key];
    }
    await product.save();
    res.json(product);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete('/:id', async (req: express.Request, res: express.Response) => {
  try {
    const _id = req.params.id;
    await Product.remove({ _id });
    res.status(204).json({});
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
