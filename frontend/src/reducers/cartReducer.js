import { ADD_TO_CART, EMPTY_CART, REMOVE_FROM_CART, SAVE_CART_PAYMENT_METHOD, SAVE_CART_SHIPPING_ADDRESS } from "../constants/cartConstants";
export const cartReducer = (
  state = { },
  action
) => {
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload;
      const isItemExist = state.cartItems.find(
        (el) => el.product === item.product
      );
      if (isItemExist) {
        return {
          ...state,
          cartItems: state.cartItems.map((el) =>
            el.product === isItemExist.product ? item : el
          ),
        };
      } else {
        return { ...state, cartItems: [...state.cartItems, item] };
      }
    case REMOVE_FROM_CART:
     return {
        ...state, cartItems: state.cartItems.filter(el => el.product !== action.payload)
     }

     case EMPTY_CART:
        return {
            ...state, cartItems: []
        }
    case SAVE_CART_SHIPPING_ADDRESS:
        return {
            ...state, shippingAddress: action.payload
        }
    case SAVE_CART_PAYMENT_METHOD:
        return {
            ...state, paymentMethod: action.payload
        }
    default:
      return state;
  }
};
