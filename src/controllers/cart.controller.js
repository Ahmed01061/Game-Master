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

  return res.json({
    message: "Success Add To Cart",
    cart: cartIsExist,
    success: true,
  });
};

/* ============ Update Quantity ============ */

const updateQuantity = async (req, res, next) => {
  const userId = req.user._id;
  const gameId = req.params.id;
  const { quantity } = req.body;

  /* Check if user has cart */
  const cart = await CartModel.findOne({ user: userId });
  if (!cart) {
    return next(new AppError(messages.cart.notFound, 404));
  }

  /* Check if game  */
  const game = await GameModel.findOne({ _id: gameId });
  if (!game) {
    return next(new AppError("Game Not Found", 404));
  }

  console.log(cart);

  /* Check if Game is in cart */
  const cartProduct = cart.games.find(
    (item) => item.game.toString() === gameId
  );
  if (!cartProduct) {
    return next(new AppError("Game Not Found", 404));
  }

  /* Check if quantity is valid */
  const newQuantity = quantity;
  if (newQuantity <= 0) {
    return next(new AppError("Invalid Quantity", 400));
  }

  /* Update quantity */
  cartProduct.quantity += Number(newQuantity);

  /* Recalculate totalCartPrice */
  calcTotalPrice(cart);

  await cart.save();

  const cartItems = await CartModel.findOne({ user: userId }).populate(
    "games.game"
  );

  return res.json({ message: "Updated Success", cart: cartItems });
};

/* ============ Delete Cart Game ============ */

const deleteCartGame = async (req, res, next) => {
  const userId = req.user._id;
  const gameId = req.params.id;

  /* Check if the cart exists */
  let cart = await CartModel.findOne({ user: userId });
  if (!cart) {
    return next(new AppError("Cart Not Found", 404));
  }

  /* Check if the game exists in the cart */
  const gameIn = cart.games.find((item) => item.game.toString() === gameId);
  if (!gameIn) {
    return next(new AppError("Game Not In Cart", 404));
  }

  /* Remove product from cart */
  cart = await CartModel.findOneAndUpdate(
    { user: userId },
    { $pull: { games: { game: gameId } } },
    { new: true }
  );

  /* Check if the cart is empty after removal */
  if (cart.games.length === 0) {
    cart.totalCartPrice = 0;
  } else {
    /* Recalculate totalCartPrice */
    calcTotalPrice(cart);
  }

  /* Save the updated cart */
  await cart.save();

  const cartItems = await CartModel.findOne({ user: userId }).populate(
    "games.game"
  );

  return res.json({ message: "Success Update Cart", cart: cartItems });
};

/* ============ Clear Cart ============ */

const clearCart = async (req, res, next) => {
  const userId = req.user._id;
  const cart = await CartModel.findOneAndUpdate(
    { user: userId },
    { $set: { games: [], totalCartPrice: 0 } },
    { new: true }
  );
  if (!cart) {
    return next(new AppError("Cart Not Found", 404));
  }

  const cartItems = await CartModel.findOne({ user: userId }).populate(
    "games.game"
  );
  return res.json({ message: "Success Clear Cart", cart: cartItems });
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

export {
  addToCart,
  clearCart,
  deleteCartGame,
  getLoggedUserCart,
  updateQuantity,
};
