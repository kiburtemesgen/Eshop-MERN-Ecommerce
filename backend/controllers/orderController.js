import expressAsync from "express-async-handler";
import Order from "../models/orderModel.js";

const createOrder = expressAsync(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = new Order({
    user: req.user._id,
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  });

  const createdOrder = await order.save();
  res.status(201).json(createdOrder);
});

const myOrders = expressAsync(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  if (!orders) {
    res.status(404);
    throw new Error("Order not found");
  }
  res.json(orders);
});

const getOrderDetail = expressAsync(async (req, res) => {
  const orderId = req.params.id;
  const order = await Order.findById(orderId);
  if (!order) {
    res.status(404);
    throw new Error("order not found");
  }
  res.status(200).json({
    order,
  });
});

const payOrder = expressAsync(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    (order.isPaid = true), (order.paidAt = Date.now());
    order.paymentResult = req.body;
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// --------------ADMIN---------------

const getAllOrders = expressAsync(async (req, res) => {
  const allOrders = await Order.find({});
  if (!allOrders) {
    res.status(404);
    throw new Error("Orders not found");
  }
  res.json(allOrders);
});

const deliverOrder = expressAsync(async (req, res) => {
  const order = await Order.findById(req.body._id);

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }
  (order.isDelivered = true), (order.deliveredAt = Date.now());

  const updatedOrder = await order.save();
  res.json(updatedOrder);
});

export {
  createOrder,
  myOrders,
  getOrderDetail,
  payOrder,
  deliverOrder,
  getAllOrders,
};
