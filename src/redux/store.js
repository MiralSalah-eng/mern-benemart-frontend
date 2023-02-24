import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/cartSlice";
import orderSlice from "./slices/orderSlice";
import productSlice from "./slices/productSlice";
import userSlice from "./slices/userSlice";
import wishListSlice from "./slices/wishListSlice";

export const store = configureStore ({
    reducer : {
        cart : cartSlice,
        user : userSlice,
        products : productSlice,
        orders : orderSlice,
        wishlist : wishListSlice,
    }
})

