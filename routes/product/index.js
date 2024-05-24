import express, { response } from 'express';
import Product from '../../DB/models/productSchema.js';
import Category from '../../DB/models/categorySchema.js';
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const body = { ...req.body };
    const product = await Product.create(body);
    res
      .status(201)
      .json({ message: 'product added successfully', product: product });
  } catch (e) {
    res.status(400).json(e);
  }
});

router.get('/', async (req, res) => {
  try {
    const products = await Product.find().populate(['brandName', 'category']);
    res.status(200).json(products);
  } catch (e) {
    res.status(400).json(e);
  }
});

router.post('/categoryfilter', async (req, res) => {
  try {
    const categories = req.body;
    console.log(categories);
    const products = await Product.find({
      category: {
        $in: categories,
      },
    }).populate(['brandName', 'category']);
    res.status(200).json(products);
  } catch (e) {
    res.status(400).json(e);
  }
});

// router.get('/searchproduct', async (req, res) => {
//   try {
//     const query = req.query.q;
//     const regex = new RegExp(query, 'i', 'g');
//     const product = await Product.find({
//       $or: [{ productName: regex }, { category: regex }],
//     });
//     res.status(200).json(product);
//   } catch (e) {
//     res.status(400).json(e);
//   }
// });

router.get('/searchproduct', async (req, res) => {
  try {
    const query = req.query.q;
    const regex = new RegExp(query, 'i', 'g');
    const categories = await Category.find({ name: regex });
    const categoryIds = categories.map(category => category._id);
    const product = await Product.find({
      $or: [{ productName: regex }, { category: { $in: categoryIds } }],
    });
    res.status(200).json(product);
  } catch (e) {
    res.status(400).json(e);
  }
});

router.get('/filter', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 8;
    const products = await Product.find()
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .populate(['brandName', 'category']);
    res.status(200).json(products);
  } catch (e) {
    res.status(400).json(e);
  }
});

router.get('/all', async (req, res) => {
  try {
    const products = await Product.find().populate(['brandName', 'category']);
    res.status(200).json(products);
  } catch (e) {
    res.status(400).json(e);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id).populate([
      'brandName',
      'category',
    ]);
    res.status(200).json(product);
  } catch (e) {
    res.status(400).json(e);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const product = await Product.findByIdAndDelete(id);
    res.status(201).json({ message: 'Product deleted' });
  } catch (e) {
    res.status(400).json(e);
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const body = { ...req.body };
    // console.log(id);
    const product = await Product.findByIdAndUpdate(id, body);
    res.status(201).json({ message: 'Product updated', product: product });
  } catch (e) {
    res.status(400).json(e);
  }
});

export default router;
