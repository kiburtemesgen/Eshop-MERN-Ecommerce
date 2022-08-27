import expressAsync from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import sendEmail from "../utils/sendEmail.js";
import crypto from "crypto";

const signup = expressAsync(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exist");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (!user) {
    throw new Error("can not create a user");
  }

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token: generateToken(user._id),
  });
});
const login = expressAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

const getUserById = expressAsync(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("user not found");
  }
  res.json(user);
});

const getUserProfile = expressAsync(async (req, res) => {
  const user = req.user;
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  res.json(user);
});

const updateProfile = expressAsync(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.avatar = req.body.avatar || user.avatar;

    const updatedUser = await user.save();
    res.status(201).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      avatar: updateUser.avatar,
      role: updatedUser.role,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("user not found");
  }
});

const forgotPassword = expressAsync(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    res.status(404);
    throw new Error("Email not found");
  }

  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/resetpassword/${resetToken}`;
  const message = `please request your new password to ${resetUrl}`;

  try {
    await sendEmail({
      email: user.email,
      subject: "password reset token",
      message,
      html: `<button><a href=${message}">Reset Password</a></button>`,
    });
    res.status(200).json({
      status: "success",
      message: "Token sent Successfully",
    });
  } catch (error) {
    user.createPasswordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    res.status(500);
    throw new Error("error happened while sending email");
  }
});

const resetPassword = expressAsync(async (req, res) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (user) {
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    res.status(200).json({
      message: "password reset successfully",
    });
  } else {
    res.status(404);
    throw new Error("Invalid reset password token");
  }
});

//   -----------Admin-------------//

const getAllUsers = expressAsync(async (req, res) => {
  const users = await User.find();
  res.json(users);
});

const updateUser = expressAsync(async (req, res) => {
  const user = await User.findById(req.body._id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  user.role = req.body.role || user.role;
  const updatedUser = await user.save();
  res.json(updatedUser);
});

const deleteUser = expressAsync(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  await user.remove();
  res.json({ message: "User removed Successfully" });
});

const changePassword = expressAsync(async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      res.status(400);
      throw new Error("Please enter both your new and old password");
    }

    const user = await User.findById(req.user.id);

    const isCorrectPassword = await user.matchPassword(oldPassword);

    if (!isCorrectPassword) {
      throw new Error("Your old password is not correct");
    }

    user.password = newPassword;
    await user.save();
    res.status(200).json({
      message: "Password changed!",
    });
  } catch (error) {
    res.status(400);
    throw new Error("Unable to change password");
  }
});



export {
  signup,
  login,
  getAllUsers,
  getUserById,
  getUserProfile,
  updateProfile,
  updateUser,
  deleteUser,
  changePassword,
  forgotPassword,
  resetPassword,
};
