import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  productsReducer,
  topProductsReducer,
  adminProductsReducer,
  productDetailReducer,
  createProductReducer,
  updateProductReducer,
  deleteProductReducer,
  createProductReviewReducer,
} from "./reducers/productReducer";
import { cartReducer } from "./reducers/cartReducer";
import {
  userLoginReducer,
  userSignupReducer,
  userDetailReducer,
  allUsersReducer,
  updateUserProfileReducer,
  changePasswordReducer,
  updateUserReducer,
  deleteUserReducer,
  forgotPasswordReducer,
  resetPasswordReducer,
} from "./reducers/userReducer";
import {
  createOrderReducer,
  orderDetailReducer,
  allOrdersReducer,
  myOrderListReducer,
  payOrderReducer,
  deliverOrderReducer,
} from "./reducers/orderReducer";

const reducer = combineReducers({
  products: productsReducer,
  topProducts: topProductsReducer,
  adminProducts: adminProductsReducer,
  productDetail: productDetailReducer,
  createProduct: createProductReducer,
  updateProduct: updateProductReducer,
  deleteProduct: deleteProductReducer,
  createProductReview: createProductReviewReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userSignup: userSignupReducer,
  userDetail: userDetailReducer,
  allUsers: allUsersReducer,
  updateUserProfile: updateUserProfileReducer,
  updateUser: updateUserReducer,
  changePassword: changePasswordReducer,
  deleteUser: deleteUserReducer,
  forgotPassword: forgotPasswordReducer,
  resetPassword: resetPasswordReducer,
  createOrder: createOrderReducer,
  allOrders: allOrdersReducer,
  orderDetail: orderDetailReducer,
  myOrderList: myOrderListReducer,
  payOrder: payOrderReducer,
  deliverOrder: deliverOrderReducer,
});

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;
const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};
const paymentMethodFomStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("paymentMethod"))
  : {};

const initialstate = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
    paymentMethod: paymentMethodFomStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];
const store = createStore(
  reducer,
  initialstate,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
