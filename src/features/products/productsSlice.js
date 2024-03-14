import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  arr: []
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    saveAllFromServer: (state, action) => {
      state.arr = action.payload;
      // localStorage.setItem('arr', JSON.stringify(state.arr));
    },
    deleteProductInState: (state, action) => {
      let index = state.arr.findIndex((item) => item.id === action.payload);
      state.arr.splice(index, 1);
    },
    addProductToState: (state, action) => {
      state.arr.push(action.payload);
    },
  },
});

export const { addProductToState, deleteProductInState, saveAllFromServer } = productSlice.actions;
export default productSlice.reducer;
