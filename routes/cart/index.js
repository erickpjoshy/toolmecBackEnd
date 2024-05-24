import express from 'express';
import Cart from '../../DB/models/cartSchema.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    console.log(req.body);
    const body = { ...req.body };
    console.log(body);
    const productId = body.product;
    console.log(productId);
    const findProduct = await Cart.findOne({ product: productId });
    if (findProduct) {
      console.log('already');
      return res.status(403).json('Already exist in the cart');
    }
    const cart = await Cart.create(body);
    res.status(200).json('product added to the cart');
  } catch (e) {
    res.status(403).json(e);
  }
});

router.get('/count/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const count = await Cart.countDocuments({ user: id });
    res.status(200).json(count);
  } catch (e) {
    res.status(403).json(e);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const count = await Cart.find({ user: id }).populate(['product']);
    res.status(200).json(count);
  } catch (e) {
    res.status(403).json(e);
  }
});

router.patch('/quantity', async (req, res) => {
  try {
    const product = req.body.id;
    const qty = req.body.quantity;
    const productResponse = await Cart.findByIdAndUpdate(product, {
      ...(qty && { quantity: qty }),
    });
    res.status(201).json(productResponse);
  } catch (e) {
    res.status(403).json(e);
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Cart.findByIdAndDelete(id);
    res.status(201).json(product);
  } catch (e) {
    res.status(403).json(e);
  }
});
export default router;
