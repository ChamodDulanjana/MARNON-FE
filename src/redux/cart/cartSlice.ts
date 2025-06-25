import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const existingIndex = state.items.findIndex(
                item =>
                    item.productId === action.payload.productId &&
                    item.size === action.payload.size
            );

            if (existingIndex >= 0) {
                state.items[existingIndex].quantity += action.payload.quantity;
            } else {
                state.items.push(action.payload);
            }
        },
        removeFromCart: (state, action: PayloadAction<{ productId: number; size: string }>) => {
            state.items = state.items.filter(
                item =>
                    item.productId !== action.payload.productId ||
                    item.size !== action.payload.size
            );
        },
        clearCart: state => {
            state.items = [];
        },
    },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
