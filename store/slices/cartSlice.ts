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
      console.log('Adding item to cart:', action.payload);
      const itemExists = state.items.find(
        (item) => item.foodId === String(action.payload.foodId)
      );

      if (itemExists) {
        if(itemExists.quantity<5) {

          itemExists.quantity += 1;
          console.log('Item exists, updated quantity:', itemExists);
        } else{
          console.log('Item quantity limit reached');
        }
        
      } else {
        const newItem = {
          ...action.payload,
          foodId: String(action.payload.foodId),
          menuId: String(action.payload.menuId),
          quantity: 1,
          price: Number(action.payload.price),
          spiceLevel: Number(action.payload.spiceLevel)
        };
        console.log('Adding new item to cart:', newItem);
        state.items.push(newItem);
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
          console.log('Item quantity cannot go below 1');
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
    deleteSelectedItems: (state, action: PayloadAction<string[]>) => {
      console.log("Deleting selected items:", action.payload);
      state.items = state.items.filter(
        (item) => !action.payload.includes(item.foodId)
      );
    },
  },
});

export const { addItem, removeItem, clearCart, deleteSelectedItems } = cartSlice.actions;
export default cartSlice.reducer;
