import { Schema, model } from 'mongoose';

const categorySchema = Schema(
  {
    name: String,
    status: Boolean,
    image: String,
  },
  { timestamps: true }
);

const Category = model('Category', categorySchema);

export default Category;
