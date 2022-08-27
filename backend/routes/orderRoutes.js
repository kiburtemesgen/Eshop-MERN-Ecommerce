import express from "express";
import {
  createOrder,
  deliverOrder,
  getAllOrders,
  getOrderDetail,
  myOrders,
  payOrder,
} from "../controllers/orderController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/myorders").get(protect, myOrders);
router.route("/:id").get(protect, getOrderDetail);
router.route("/:id/deliver").put(protect,admin, deliverOrder);
router.route("/:id/payment").put(protect, payOrder);
router.route("/").get(protect, admin, getAllOrders).post(protect, createOrder);

export default router;
