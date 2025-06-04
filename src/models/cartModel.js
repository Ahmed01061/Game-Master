import { model, Schema, Types } from "mongoose";

const cartSchema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },

    games: [
      {
        game: {
          type: Types.ObjectId,
          ref: "Game",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
          //   min: [1, "min quantity is 1"],
        },
        price: {
          type: Number,
        },
      },
    ],

    totalCartPrice: {
      type: Number,
    },
  },

  { timestamps: true, versionKey: false }
);

const CartModel = model("Cart", cartSchema);

export default CartModel;
