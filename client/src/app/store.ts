import { configureStore } from "@reduxjs/toolkit";
import { productApi } from "@/api/productApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "@/api/authApi";
import { dashboardApi } from "@/api/dashboardApi";
import cartReducer from "./cartSlice";

export const store = configureStore({
    reducer: {
        [productApi.reducerPath]: productApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [dashboardApi.reducerPath]: dashboardApi.reducer,
        cart: cartReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([
            productApi.middleware,
            authApi.middleware,
            dashboardApi.middleware,
        ]),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
