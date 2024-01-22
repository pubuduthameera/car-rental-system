// store.js
import { createStore } from 'redux'


// Define action types
const SET_FORM_DATA = 'SET_FORM_DATA';
const SET_PAYMENT_DETAILS = 'SET_PAYMENT_DETAILS';
const SET_CONFIRMATION = 'SET_CONFIRMATION';

// Define action creators
export const setFormData = (formData) => ({
  type: SET_FORM_DATA,
  payload: formData,
});

export const setPaymentDetails = (paymentDetails) => ({
  type: SET_PAYMENT_DETAILS,
  payload: paymentDetails,
});

export const setConfirmation = (confirmation) => ({
  type: SET_CONFIRMATION,
  payload: confirmation,
});

// Define initial state
const initialState = {
  formData: {},
  paymentDetails: {},
  confirmation: {},
};

// Define reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FORM_DATA:
      return {
        ...state,
        formData: action.payload,
      };
    case SET_PAYMENT_DETAILS:
      return {
        ...state,
        paymentDetails: action.payload,
      };
    case SET_CONFIRMATION:
      return {
        ...state,
        confirmation: action.payload,
      };
    default:
      return state;
  }
};

// Create the Redux store
const store = createStore(reducer);

export default store;
