import express = require('express');
const router = express.Router();

import authorize from './../authorize';
import { Product } from '../models/product';

router.get('/', async (req: express.Request, res: express.Response) => {
  try {
    const query = searchQuery(req.query);
    const products = await Product.find(query);
    res.json(products);
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

router.use(authorize.jwt);
router.use(authorize.admin);

router.post('/', async (req: express.Request, res: express.Response) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.json(product);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.patch('/:id', async (req: express.Request, res: express.Response) => {
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

function searchQuery(params) {
  const query = [];
  if (params.name) {
    query.push({
      name: { $regex: new RegExp(params.name, 'i') }
    });
  }
  if (params.price_greater) {
    query.push({
      price: { $gt: params.price_greater }
    });
  }
  if (params.price_less) {
    query.push({
      price: { $lt: params.price_less }
    });
  }
  if (query.length > 0) {
    return { $and: query };
  } else {
    return {};
  }
}

export { router };
