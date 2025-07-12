// store/slices/cartSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Food } from "../../app/(main)/restaurants/[id]/_types/food";

interface CartState {
  items: Food[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Food>) => {
      const itemExists = state.items.find(
        (item) => item.foodId === String(action.payload.foodId)
      );

      if (itemExists) {
        itemExists.quantity += 1;
      } else {
        state.items.push({
          ...action.payload,
          foodId: String(action.payload.foodId),
          menuId: String(action.payload.menuId),
          quantity: 1,
          price: Number(action.payload.price),
          spiceLevel: Number(action.payload.spiceLevel)
        });
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      const itemIndex = state.items.findIndex(
        (item: Food) => item.foodId === String(action.payload)
      );

      if (itemIndex !== -1) {
        const item = state.items[itemIndex];
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.items.splice(itemIndex, 1);
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
