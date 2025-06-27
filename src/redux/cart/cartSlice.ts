import { createSlice } from '@reduxjs/toolkit';
import { CartItem } from './types';

type CartState = {
    items: CartItem[];
};

const initialState: CartState = {
    items: [],
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const { productId, size, quantity } = action.payload;
            const existingItem = state.items.find(
                (item) => item.productId === productId && item.size === size
            );

            if (existingItem) {
                existingItem.quantity += quantity; // update quantity if item already exists
            } else {
                state.items.push({ ...action.payload }); // add new item
            }
        },
        updateQuantity: (state, action) => {
            const { productId, size, quantity } = action.payload;
            const item = state.items.find(
                (item) => item.productId === productId && item.size === size
            );
            if (item && quantity > 0) {
                item.quantity = quantity;
            }
        },
        removeFromCart: (state, action) => {
            const { productId, size } = action.payload;
            state.items = state.items.filter(
                (item) => !(item.productId === productId && item.size === size)
            );
        },
        clearCart: state => {
            state.items = [];
        },
    },
});

export const { addToCart, removeFromCart, clearCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
