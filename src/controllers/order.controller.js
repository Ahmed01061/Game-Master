import GameModel from "../models/gameModel.js";
import CartModel from "../models/cartModel.js";
import OrderModel from "../models/order.model.js";
import AppError from "../utils/appError.js";

const createOrder = async (req, res, next) => {
  const cartId = req.params.cartId;
  const cart = await CartModel.findById(cartId);
  if (!cart) {
    return next(new AppError("Cart not found", 404));
  }
  const totalCartPrice = cart.totalCartPrice;
  const games = cart.games;
  const { shoppingAddress, paymentMethod } = req.body;

  if (!orderItems || orderItems.length === 0) {
    return next(new AppError("No order items", 400));
  }
  // create new order
  const order = new OrderModel({
    user: req.user._id,
    orderItems: games,
    shoppingAddress,
    paymentMethod,
    totalOrderPrice: totalCartPrice,
  });

  const createdOrder = await order.save();
  // update stock in game model
  try {
    for (const item of createdOrder.orderItems) {
      await GameModel.findByIdAndUpdate(item.game, {
        $inc: { stock: -item.quantity },
      });
    }
  } catch (stockUpdateError) {
    console.error(
      `Critical: Order ${createdOrder._id} created, but failed to update stock. Error: ${stockUpdateError.message}`
    );
  }
  res.status(201).json(createdOrder);
};

const getLoggedUserOrder = async (req, res, next) => {
  try {
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
  } catch (error) {
    return next(
      new AppError("Failed to retrieve orders: " + error.message, 500)
    );
  }
};

export { createOrder, getLoggedUserOrder };
