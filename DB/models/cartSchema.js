import { Schema, model } from 'mongoose';

const cartSchema = Schema(
  {
    product: { type: Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, default: 1 },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
  }
);

const Cart = model('Cart', cartSchema);

export default Cart;
