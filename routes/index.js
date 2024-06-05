import express from 'express';
import imageRoutes from './image/index.js';
import UserRoutes from './user/index.js';
import CategoryRoutes from './category/index.js';
import SliderRouter from './slider/index.js';
import locationRouter from './location/index.js';
import BrandRouter from './brand/index.js';
import ProductRouter from './product/index.js';
import cartRouter from './cart/index.js';
import orderRoute from './order/index.js';

const router = express.Router();
router.use('/upload', imageRoutes);
router.use('/user', UserRoutes);
router.use('/slider', SliderRouter);
router.use('/location', locationRouter);
router.use('/category', CategoryRoutes);
router.use('/brand', BrandRouter);
router.use('/product', ProductRouter);
router.use('/addtocart', cartRouter);
router.use('/order', orderRoute);

export default router;
