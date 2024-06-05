import { Schema, model } from 'mongoose';

const orderSchema = Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    cartProducts: [{ type: Schema.Types.ObjectId, ref: 'Cart' }],
    // deliveryDate: { type: Date },
    deliveryType: { type: String },
    bookingDate: { type: Date },
    deliveryDate: { type: Date, default: Date.now() + 4 * 24 * 60 * 60 * 1000 },
    status: {
      type: String,
      enum: ['CONFIRMED', 'SHIPPED', 'OUT FOR DELIVERY', 'DELIVERED'],
    },
    deliveryAddress: {
      type: String,
      required: true,
    },
    deliveryPlace: {
      type: String,
      required: true,
    },
    District: {
      type: Schema.Types.ObjectId,
      ref: 'District',
      required: true,
    },
    State: {
      type: Schema.Types.ObjectId,
      ref: 'State',
      required: true,
    },
  },
  { timestamps: true }
);

const Order = model('Order', orderSchema);

export default Order;
