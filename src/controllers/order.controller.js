import CartModel from "../models/cartModel.js";
import GameModel from "../models/gameModel.js";
import OrderModel from "../models/order.model.js";
import AppError from "../utils/appError.js";

/* ====================== Create Order ======================= */

const createOrder = async (req, res, next) => {
  const { cartId } = req.params;
  const { shoppingAddress, paymentMethod } = req.body;

  const cart = await CartModel.findById(cartId);
  if (!cart) {
    return next(new AppError("Cart not found", 404));
  }

  if (!cart.games || cart.games.length === 0) {
    return next(new AppError("Cart is empty", 400));
  }

  const totalCartPrice = cart.totalCartPrice;
  const games = cart.games;

  const order = new OrderModel({
    user: req.user._id,
    orderItems: games,
    shoppingAddress,
    paymentMethod,
    totalOrderPrice: totalCartPrice,
  });

  const createdOrder = await order.save();

  for (const item of createdOrder.orderItems) {
    await GameModel.findByIdAndUpdate(item.game, {
      $inc: { stock: -item.quantity },
    });
  }

  await CartModel.findByIdAndUpdate(cartId, {
    $set: {
      games: [],
      totalCartPrice: 0,
      totalCartPriceAfterDiscount: 0,
    },
  });

  return res.status(201).json({
    message: "Order created successfully",
    order: createdOrder,
  });
};

/* ======================= Get Logged User Order ======================= */
const getLoggedUserOrder = async (req, res, next) => {
  const userId = req.user._id;
  const orders = await OrderModel.find({ user: userId })
    .populate({
      path: "orderItems.game",
      select: "title coverImage price platform",
    })
    .sort({ createdAt: -1 });
  if (!orders || orders.length === 0) {
    return res.status(200).json({
      message: "You have no orders yet.",
      count: 0,
      data: [],
    });
  }
  return res.status(200).json({
    message: "Successfully retrieved your orders.",
    count: orders.length,
    data: orders,
  });
};

export { createOrder, getLoggedUserOrder };
