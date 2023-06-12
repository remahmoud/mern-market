import { IProduct } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface IExtraProduct extends IProduct {
    count: number;
}

interface ICartState {
    items: IExtraProduct[];
}

const initialState: ICartState = {
    items: localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart")!)
        : [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<IProduct>) => {
            const product = action.payload;
            const isExist = state.items.find((item) => item.id === product.id);
            if (isExist) {
                state.items = state.items.map((item) => {
                    if (item.id === product.id) {
                        return { ...item, count: item.count + 1 };
                    }
                    return item;
                });
            } else {
                state.items.push({ ...action.payload, count: 1 });
            }
            localStorage.setItem("cart", JSON.stringify(state.items));
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(
                (item) => item.id !== action.payload
            );
            localStorage.setItem("cart", JSON.stringify(state.items));
        },

        updateCount: (
            state,
            action: PayloadAction<{ id: string; count: number }>
        ) => {
            const { id, count } = action.payload;
            const isExist = state.items.find((item) => item.id === id);
            if (isExist) {
                state.items = state.items.map((item) => {
                    if (item.id === id) {
                        return { ...item, count: count };
                    }
                    return item;
                });
            }
            localStorage.setItem("cart", JSON.stringify(state.items));
        },
    },
});

export const { addToCart, removeFromCart, updateCount } = cartSlice.actions;

export default cartSlice.reducer;
