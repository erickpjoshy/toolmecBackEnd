import express from 'express';
import Cart from '../../DB/models/cartSchema.js';
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const order = await Cart.create(req.body);
    res.status(203).json({ order });
  } catch (e) {
    res.status(403).json(e);
  }
});

router.get('/', async (req, res) => {
  try {
    const orders = await Cart.find(req.body);
    res.status(201).json({ orders });
  } catch (e) {
    res.status(403).json(e);
  }
});

export default router;
