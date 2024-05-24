import { Schema, model } from 'mongoose';

const brandSchema = Schema(
  {
    name: { type: String, trim: true, required: true },
    image: { type: String, trim: true },
    description: { type: String, trim: true, required: true },
    status: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Brand = model('Brand', brandSchema);

export default Brand;
