import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "/products",
    }),
    getProduct: builder.query({
      query: (id) => `/products/${id}`,
    }),
    updateProduct: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/products/${id}`,
        method: "PATCH",
        body: patch,
      }),
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = api;

// Export the API slice
// export const { reducer: apiReducer } = api;
// export const { useLazyQuery, usePrefetch } = api;
