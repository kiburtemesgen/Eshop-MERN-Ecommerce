import express from "express";
const router = express.Router();
import { protect, admin } from "../middleware/authMiddleware.js";
import {
  login,
  getAllUsers,
  getUserById,
  signup,
  getUserProfile,
  updateProfile,
  updateUser,
  deleteUser,
  forgotPassword,
  resetPassword,
  changePassword,
} from "../controllers/userController.js";

import upload from '../utils/multer.js';
import cloudinary from '../utils/cloudinary.js';


router.post('/upload',  upload.single('image'), async(req, res) => {
  try {
const result = await cloudinary.uploader.upload(req.file.path, {
}, {folder: "eshop/users"});
res.json(result);
  } catch(error){
console.log(error)
  }
})

router.route('/forgotpassword').post(forgotPassword);
router.route('/resetpassword/:token').put(resetPassword)

router.route("/profile").get(protect, getUserProfile);
router.route("/updateprofile").put(protect, updateProfile);
router.route("/changepassword").put(protect, changePassword);
router
  .route("/:id")
  .get(protect, getUserById)
  .put(protect, admin, updateUser)
  .delete(protect, admin, deleteUser);
router.post("/login", login);
router.route("/").get(protect, admin, getAllUsers).post(signup);

export default router;
