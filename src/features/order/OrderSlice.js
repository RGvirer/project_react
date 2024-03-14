import { createSlice } from "@reduxjs/toolkit";

const initial = {
  cart: [],
  numProductsInCart: 0,
  amountToPay: 0
}
export const orderSlice = createSlice({
  name: "order",
  initialState: initial,
  reducers: {
    addProductToCart: (state, action) => {
      let newProduct = {
        ...action.payload,
        amount: 1
      };
      let newArr = JSON.parse(JSON.stringify(state.cart));
      let index = newArr.findIndex(item => item._id === newProduct._id);
      if (index === -1) {
        newArr.push(newProduct);
      }
      else {
        newArr[index].amount += 1
      }
      state.cart = [...newArr];
      state.numProductsInCart += 1;
      state.amountToPay += newProduct.price;
      localStorage.setItem('cart', JSON.stringify(state.cart));
      localStorage.setItem('numProductsInCart', JSON.stringify(state.numProductsInCart));
      localStorage.setItem('amountToPay', JSON.stringify(state.amountToPay));
    },
    changeAmount: (state, action) => {
      const { index, amount } = action.payload;
      let newArr = JSON.parse(JSON.stringify(state.cart));
      newArr[index].amount += amount;
      state.numProductsInCart += amount;
      state.amountToPay += newArr[index].price * amount;
      if (newArr[index].amount === 0)
        newArr.splice(index, 1);
      state.cart = [...newArr];
      localStorage.setItem('cart', JSON.stringify(state.cart));
      localStorage.setItem('numProductsInCart', JSON.stringify(state.numProductsInCart));
      localStorage.setItem('amountToPay', JSON.stringify(state.amountToPay));
    },

    deleteProductFromCart: (state, action) => {
      let index = action.payload;
      state.cart = JSON.parse(JSON.stringify(state.cart));
      state.numProductsInCart -= state.cart[index].amount;
      state.amountToPay -= state.cart[index].amount * state.cart[index].price;
      state.cart.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(state.cart));
      localStorage.setItem('numProductsInCart', JSON.stringify(state.numProductsInCart));
      localStorage.setItem('amountToPay', JSON.stringify(state.amountToPay));
    },
    deleteCart: (state) => {
      state.cart = [];
      state.numProductsInCart = 0;
      state.amountToPay = 0;
      localStorage.setItem('cart', JSON.stringify(state.cart));
      localStorage.setItem('numProductsInCart', JSON.stringify(state.numProductsInCart));
      localStorage.setItem('amountToPay', JSON.stringify(state.amountToPay));
    },
    getCartFromStorage: (state) => {
      state.cart = JSON.parse(localStorage.getItem('cart'));
      state.numProductsInCart = JSON.parse(localStorage.getItem('numProductsInCart'));
      state.amountToPay = JSON.parse(localStorage.getItem('amountToPay'));
    }
  }
})
export const { addProductToCart, changeAmount, deleteProductFromCart, getCartFromStorage } = orderSlice.actions;
export default orderSlice.reducer;