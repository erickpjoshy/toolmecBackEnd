import express from 'express';
import Category from '../../DB/models/categorySchema.js';
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (e) {
    res.status(403).json(e);
  }
});

router.post('/', async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(200).json(category);
  } catch (e) {
    res.status(403).json(e);
  }
});

export default router;
