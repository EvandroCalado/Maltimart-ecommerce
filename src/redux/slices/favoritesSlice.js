import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favoritesItems: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      state.favoritesItems.push({
        id: newItem.id,
        title: newItem.productName,
        imgUrl: newItem.imgUrl,
        price: newItem.price,
      });
    },

    deleteItem: (state, action) => {
      const id = action.payload;
      const existingItem = state?.favoritesItems.find((item) => item.id === id);

      if (existingItem) {
        state.favoritesItems = state.favoritesItems?.filter(
          (item) => item.id !== id
        );
      }
    },
  },
});

export const favoritesActions = favoritesSlice.actions;

export default favoritesSlice.reducer;
