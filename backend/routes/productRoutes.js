import express from "express";
import {
  getProducts,
  getProductById,
  createProductReview,
  createProduct,
  updateProduct,
  deleteProduct,
  getTopProducts,
  adminProducts,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import upload from '../utils/multer.js';
import cloudinary from '../utils/cloudinary.js';
const router = express.Router();

router.post('/upload',  upload.single('image'), async(req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
    }, {folder: "eshop/product"});res.json(result);
  } catch(error){
console.log(error)
  }
})

router.route("/").get(getProducts).post(protect, admin, createProduct);
router.get('/top', getTopProducts)
router.get('/admin', protect, admin, adminProducts)
router
  .route("/:id")
  .get(protect,getProductById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);
router.route("/:id/reviews").post(protect, createProductReview);

export default router;
