import Product from "../models/productModel.js";
import expressAsync from "express-async-handler";
import APIFeatures from "../utils/apiFeatures.js";

const getProducts = expressAsync(async (req, res) => {
  const resPerPage = 20;
  const productsCount = await Product.countDocuments();

  const apiFeatures = new APIFeatures(Product.find(), req.query)
      .search()
      .filter()

  let products = await apiFeatures.query.clone();
  let filteredProductsCount = products.length;

  apiFeatures.pagination(resPerPage)
  products = await apiFeatures.query;


  res.status(200).json({
      success: true,
      productsCount,
      resPerPage,
      filteredProductsCount,
      products
  })

})

const getProductById = expressAsync(async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
});

const createProduct = expressAsync(async (req, res) => {
  const { name, price, image, description, brand, category, countInStock } =
    req.body;
  try {
    const product = new Product({
      name,
      price,
      user: req.user._id,
      image:
        image ||
        "https://mamonimaternity.com/wp-content/uploads/2021/06/dummy-products-300x300.png",
      description,
      brand,
      category,
      countInStock,
      numOfReviews: 0,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(404);
    throw new Error("Product not created");
  }
});

const adminProducts = expressAsync(async (req, res) => {

  const products = await Product.find({});
  res.json(products)
})

const getTopProducts = expressAsync(async (req, res) => {

  const products = await Product.find({}).sort({ rating: -1 }).limit(10)
  res.json(products)
})


const updateProduct = expressAsync(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = req.body.name || product.name;
    product.price = req.body.price || product.price;
    product.description = req.body.description || product.description;
    product.image = req.body.image || product.image;
    product.brand = req.body.brand || product.brand;
    product.category = req.category || product.category;
    product.countInStock = req.body.countInStock || product.countInStock;
    const updatedProduct = product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

const deleteProduct = expressAsync(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("product not found");
  }
  product.remove();
  res.json({ message: "Product removed Successfully" });
});

const createProductReview = expressAsync(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);
  if (product) {
    const isReviewed = product.reviews.find(
      (review) => review.user._id === req.user._id
    );
    if (isReviewed) {
      throw new Error("Product is already reviewd!");
    }
    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };

    product.reviews.push(review);
    product.rating =
      product.reviews.reduce((acc, item) => acc + item.rating, 0) /
      product.reviews.length;

    product.numOfReviews = product.reviews.length;

    await product.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export {
  getProducts,
  getProductById,
  getTopProducts,
  adminProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
};
