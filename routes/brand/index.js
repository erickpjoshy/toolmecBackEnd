import express from 'express';
import Brand from '../../DB/models/brandSchema.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const body = { ...req.body };
    const brand = await Brand.create(body);
    res.status(201).json({ message: 'brand added successfully', brand: brand });
  } catch (e) {
    res.status(400).json(e);
  }
});

router.get('/', async (req, res) => {
  try {
    const brands = await Brand.find();
    res.status(200).json(brands);
  } catch (e) {
    res.status(400).json(e);
  }
});

export default router;
