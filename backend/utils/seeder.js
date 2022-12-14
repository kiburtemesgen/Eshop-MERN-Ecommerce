import mongoose from "mongoose";

import dotenv from "dotenv";

import colors from "colors";
import users from "../dev-data/users.js";
import products from "../dev-data/products.js";
import User from "../models/userModel.js";
import Product from "../models/productModel.js";
import Order from "../models/orderModel.js";

import connectDatabase from "../config/database.js";

dotenv.config();

connectDatabase();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProducts);
    console.log("Data Imported Successfully".green.bold.inverse);
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};
const deleteData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log("Data deleted Successfully".red.bold.inverse);
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};

if(process.argv[2] === '-delete'){
    deleteData()
}
else if(process.argv[2] === '-import'){
    importData()
}
