import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import productSlice from "./features/product/productSlice";
import { api } from "./features/api/apiSlice";

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    products: productSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

setupListeners(store.dispatch);

export default store;
