import { Schema, model } from 'mongoose';

const sliderSchema = Schema(
  {
    name: String,
    image: String,
    status: Boolean,
  },
  { timestamps: true }
);

const Slider = model('Slider', sliderSchema);

export default Slider;
