import {
  ALL_ORDERS_FAIL,
  ALL_ORDERS_REQUEST,
  ALL_ORDERS_SUCCESS,
  CREATE_ORDER_FAIL,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  DELIVER_ORDER_CLEAR,
  DELIVER_ORDER_FAIL,
  DELIVER_ORDER_REQUEST,
  DELIVER_ORDER_SUCCESS,
  MY_ORDER_LIST_FAIL,
  MY_ORDER_LIST_REQUEST,
  MY_ORDER_LIST_SUCCESS,
  ORDER_DETAIL_FAIL,
  ORDER_DETAIL_REQUEST,
  ORDER_DETAIL_SUCCESS,
  PAY_ORDER_CLEAR,
  PAY_ORDER_FAIL,
  PAY_ORDER_REQUEST,
  PAY_ORDER_SUCCESS,
} from "../constants/orderConstants";

export const createOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return {
        loading: true,
      };
    case CREATE_ORDER_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };
    case CREATE_ORDER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const allOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ALL_ORDERS_REQUEST:
      return {
        loading: true,
      }
    case ALL_ORDERS_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      }
    case ALL_ORDERS_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const myOrderListReducer = (state = { orders: []}, action) => {
  switch (action.type) {
    case MY_ORDER_LIST_REQUEST:
      return {
        loading: true,
      };
    case MY_ORDER_LIST_SUCCESS:
      return { loading: false, orders: action.payload, result: true };
    case MY_ORDER_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
        result: true,
      };
    default:
      return state;
  }
};

export const orderDetailReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case ORDER_DETAIL_REQUEST:
      return {
        loading: true,
      };
    case ORDER_DETAIL_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };
    case ORDER_DETAIL_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const payOrderReducer = (state = { paid: false }, action) => {
  switch (action.type) {
    case PAY_ORDER_REQUEST:
      return {
        loading: true,
      };
    case PAY_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        paid: true,
      };
    case PAY_ORDER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case PAY_ORDER_CLEAR:
      return { paid: false };
    default:
      return state;
  }
};

export const deliverOrderReducer = (state = { delivered: false }, action) => {
  switch (action.type) {
    case DELIVER_ORDER_REQUEST:
      return {
        loading: true,
      };
    case DELIVER_ORDER_SUCCESS:
      return {
        loading: false,
        delivered: true,
      };
    case DELIVER_ORDER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case DELIVER_ORDER_CLEAR:
      return {delivered: false};
    default:
      return state;
  }
};
