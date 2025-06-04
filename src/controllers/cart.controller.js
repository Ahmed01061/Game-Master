import CartModel from "../models/cartModel.js";
import GameModel from "../models/gameModel.js";
import AppError from "../utils/appError.js";
import { calcTotalPrice } from "../utils/calcTotalCartPrice.js";

/* =============== Add To Cart ===============  */

const addToCart = async (req, res, next) => {
  const userId = req.user._id;
  const { gameId, quantity = 1 } = req.body;

  const game = await GameModel.findOne({ _id: gameId });

  if (!game) {
    return next(new AppError("Game not found", 404));
  }

  /* Check if quantity is valid */

  if (game.stock < quantity) {
    return next(new AppError("Out of stock", 400));
  }
  const cartIsExist = await CartModel.findOne({ user: userId });

  /* Create Cart If Not Exist */

  if (!cartIsExist) {
    const cart = new CartModel({
      user: userId,
      games: [
        {
          game: gameId,
          quantity,
          price: game.price,
        },
      ],
    });
    game.stock -= quantity;
    await game.save();
    calcTotalPrice(cart);

    await cart.save();
    return res.json({
      message: "Success Create Cart",
      cart,
      success: true,
    });
  }

  /* Check if Cart Exist  */

  let flag = false;

  /* Update Cart If Exist */
  for (let cartGame of cartIsExist.games) {
    if (cartGame.game.toString() === gameId) {
      const oldQuantity = cartGame.quantity;
      const newQuantity = oldQuantity + (quantity || 1);

      if (game.stock < newQuantity - oldQuantity) {
        return next(new AppError("Out of stock", 400));
      }
      game.stock -= newQuantity - oldQuantity;
      cartGame.quantity = newQuantity;
      flag = true;
    }
  }

  /* Create game If Not Exist */
  if (!flag) {
    cartIsExist.games.push({
      game: gameId,
      quantity: quantity || 1,
      price: game.price,
    });
  }

  /* Recalculate totalCartPrice */

  calcTotalPrice(cartIsExist);

  await cartIsExist.save();
  await game.save();

  return res.json({
    message: "Success Add To Cart",
    cart: cartIsExist,
    success: true,
  });
};

/* =========== Get User Cart ============ */

const getLoggedUserCart = async (req, res, next) => {
  const userId = req.user._id;
  const cart = await CartModel.findOne({ user: userId }).populate("games.game");

  const count = cart.games.length;
  if (!cart) {
    return next(new AppError("Cart Is Empty", 404));
  }

  return res.json({ message: "Cart Get Logged User", count, cart });
};

export { addToCart, getLoggedUserCart };
