import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/cartSlice";
import favoritesSlice from "./slices/favoritesSlice";

const store = configureStore({
  reducer: {
    cart: cartSlice,
    favorites: favoritesSlice,
  },
});

export default store;
