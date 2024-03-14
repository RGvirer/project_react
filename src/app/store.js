import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/user/userSlice";
import productsSlice from "../features/products/productsSlice";
import PhotosSlice from "../features/photo/PhotosSlice";
import orderSlice from "../features/order/OrderSlice";

export const store = configureStore({
  reducer: {
    order: orderSlice,
    user: userSlice,
    product: productsSlice,
    photo: PhotosSlice
  },
});
