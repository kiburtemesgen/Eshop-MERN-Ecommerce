import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import ProductDetail from "./components/Products/ProductDetail";
import Cart from './components/Cart/Cart';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Shipping from "./components/Cart/Shipping";
import Payment from "./components/Cart/Payment";
import PlaceOrder from "./components/Order/PlaceOrder";
import Order from "./components/Order/Order";
import UserList from "./components/Admin/UserList";
import EditUser from "./components/Admin/EditUser";
import ProductList from "./components/Admin/ProductList";
import EditProduct from "./components/Admin/EditProduct";
import CreateProduct from "./components/Admin/CreateProduct";
import OrderList from "./components/Admin/OrderList";
import Header from './components/common/Header';
import UserProfile from "./components/User/UserProfile";
import ChangePassword from "./components/User/ChangePassword";
import UserOrder from "./components/Order/UserOrder";
import ForgotPassword from "./components/Auth/ForgotPassword";
import ResetPassword from "./components/Auth/ResetPassword";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header/>
        <Routes>
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order/:id" element={<Order />} />
          <Route path="/myorders" element={<UserOrder />} />
          <Route path="/login/shipping" element={<Shipping />} />
          <Route path="/payment" element={<Payment/>} />
          <Route path="/placeorder" element={<PlaceOrder/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/changepassword" element={<ChangePassword />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/resetpassword/:token" element={<ResetPassword />} />
          <Route path="/admin/productlist" element={<ProductList />} />
          <Route path="/admin/product/create" element={<CreateProduct />} />
          <Route path="/admin/product/:id/edit" element={<EditProduct />} />
          <Route path="/admin/userlist" element={<UserList />} />
          <Route path="/admin/user/:id/edit" element={<EditUser />} />
          <Route path="/admin/orderlist" element={<OrderList />} />
          <Route path="/search/:keyword" element={<Home />} />
          <Route path="/" element={<Home />} exact/>

        </Routes>
   
      </BrowserRouter>
    </div>
  );
}

export default App;
