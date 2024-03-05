import { Schema, model } from 'mongoose';

const orderSchema = Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    medcines: [{ type: Schema.Types.ObjectId, ref: 'Medcine' }],
    deliveryDate: { type: Date },
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
  },
  { timestamps: true }
);

const Order = model('Order', orderSchema);

export default Order;
