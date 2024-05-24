import { Schema, model } from 'mongoose';

const productSchema = Schema(
  {
    productName: { type: String, required: true },
    productNumber: { type: String },
    brandName: { type: Schema.Types.ObjectId, ref: 'Brand' },
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    productImage: [],
    description: { type: String, required: true },
    price: { type: String, required: true, trim: true },
    selling: { type: String, required: true, trim: true },
    tag: String,
    status: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Product = model('Product', productSchema);

export default Product;
