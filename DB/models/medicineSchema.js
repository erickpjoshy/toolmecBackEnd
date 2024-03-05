import { Schema, model } from 'mongoose';

const medicineSchema = Schema(
  {
    name: { type: String, trim: true, required: true },
    image: { type: String, trim: true, required: true },
    description: { type: String, trim: true, required: true },
    expiryDate: { type: Date, required: true },
  },
  { timestamps: true }
);

const Medicine = model('Medicine', medicineSchema);

export default Medicine;
