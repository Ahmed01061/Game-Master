import { model, Schema, Types } from "mongoose";

const wishListSchema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },

    games: [
      {
        type: Types.ObjectId,
        ref: "Game",
        required: true,
      },
    ],
    active: {
      type: Boolean,
      default: false,
    },
  },

  { timestamps: true, versionKey: false }
);

const wishListModel = model("WishList", wishListSchema);

export default wishListModel;
