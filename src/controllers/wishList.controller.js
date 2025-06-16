import GameModel from "../models/gameModel.js";
import wishListModel from "../models/wishList.model.js";
import AppError from "../utils/appError.js";

/* =============== Create WishList ===============  */

const addToWishlist = async (req, res, next) => {
  const userId = req.user._id;
  const { gameId } = req.body;

  /* Check if game exists */
  const game = await GameModel.findById({ _id: gameId });
  if (!game) {
    return next(new AppError("Game Not Found", 404));
  }

  /* Find or create wishlist */
  let wishlist = await wishListModel.findOne({ user: userId });
  if (!wishlist) {
    wishlist = new wishListModel({
      user: userId,
      games: [gameId],
      active: true,
    });
    await wishlist.save();
    return res.json({
      message: "Success Add To Wish list",
      wishlist,
      success: true,
    });
  }

  /* Add product to wishlist */
  await wishListModel.updateOne(
    { user: userId },
    { $addToSet: { games: gameId } }
  );

  wishlist = await wishListModel.findOne({ user: userId }).populate("games");

  return res.json({
    message: "Success Add To Wish List",
    wishlist,
    success: true,
  });
};

/* =============== Delete Product From WishList ===============  */

const deleteProductFromWishlist = async (req, res, next) => {
  const userId = req.user._id;
  const gameId = req.params.id;

  /* Find wishlist */
  let wishlist = await wishListModel.findOne({ user: userId });
  if (!wishlist) {
    return next(new AppError("wishlist Not Found", 404));
  }

  /* Remove product from wishlist */
  await wishListModel.updateOne({ user: userId }, { $pull: { games: gameId } });

  wishlist = await wishListModel.findOne({ user: userId }).populate("games");

  return res.json({
    message: "Success Delete",
    wishlist,
    success: true,
  });
};

/* =============== Clear Logged User WishList ===============  */

const clearLoggedUserWishlist = async (req, res, next) => {
  const userId = req.user._id;

  await wishListModel.updateOne({ user: userId }, { $set: { games: [] } });

  await wishListModel.findOne({ user: userId });

  return res.json({
    message: "Success Clear Wish List",

    success: true,
  });
};

/* =============== Get Logged User WishList ===============  */

const getLoggedUserWishList = async (req, res, next) => {
  const userId = req.user._id;

  const wishlist = await wishListModel
    .findOne({ user: userId })
    .populate("games");

  if (!wishlist) {
    return res.json({
      message: messages.wishlist.notFound,
      wishlist: {
        user: userId,
        games: [],
      },
      success: true,
    });
  }

  const count = await wishlist.games.length;
  return res.json({
    message: "Success",
    count,
    wishlist,
    success: true,
  });
};

export {
  addToWishlist,
  clearLoggedUserWishlist,
  deleteProductFromWishlist,
  getLoggedUserWishList,
};
