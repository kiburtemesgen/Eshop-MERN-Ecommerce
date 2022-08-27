import axios from "axios";
import { ADD_TO_CART, EMPTY_CART, REMOVE_FROM_CART, SAVE_CART_PAYMENT_METHOD, SAVE_CART_SHIPPING_ADDRESS } from '../constants/cartConstants'
export const addToCart = (id, quantity) => async(dispatch, getState) =>{
    const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

    const {data} = await axios.get(`/products/${id}`, config);
    dispatch({
        type: ADD_TO_CART,
        payload: {
            product:data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            quantity
        }
    });
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));

}

export const removeFromCart = (id) => async(dispatch, getState) => {
    dispatch({
        type: REMOVE_FROM_CART,
        payload: id
    });

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
}

export const emptyCart = () => async(dispatch, getState) => {
    dispatch({
        type: EMPTY_CART,
    });
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
} 

export const saveShippingAddress = (data) => async(dispatch) => {
    dispatch({
        type: SAVE_CART_SHIPPING_ADDRESS,
        payload: data
    });
    localStorage.setItem('shippingAddress', JSON.stringify(data));
}

export const savePaymentMethod = (data) => async(dispatch) => {
    dispatch({
        type: SAVE_CART_PAYMENT_METHOD,
        payload: data
    });
    localStorage.setItem('paymentMethod', JSON.stringify(data));
}

