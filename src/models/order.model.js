import { model, Schema, Types } from "mongoose";

const orderSchema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },

    orderItems: [
      {
        game: {
          type: Types.ObjectId,
          ref: "Game",
          required: true,
        },
        quantity: { type: Number },
        price: { type: Number },
      },
    ],

    totalOrderPrice: { type: Number },
    shoppingAddress: {
      city: { type: String, required: true },
      street: { type: String, required: true },
      phone: { type: String, required: true },
    },
    paymentMethod: {
      type: String,
      required: true,
      enum: ["card", "cash"],
      default: "cash",
    },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
    cancelledBy: { type: Types.ObjectId, ref: "User" },
  },

  { timestamps: true, versionKey: false }
);

const OrderModel = model("Order", orderSchema);

export default OrderModel;
