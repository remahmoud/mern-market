import { ICreateProduct, IProduct, IUser } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type ICreateUser = Pick<IUser, "name" | "email" | "isAdmin"> & {
    password: string;
};

type IUpdateUser = Pick<IUser, "name" | "email" | "isAdmin" | "id">;

export const dashboardApi = createApi({
    reducerPath: "dashboardApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "/api",
        prepareHeaders: (headers, _) => {
            const token = localStorage.getItem("token");
            if (token) {
                headers.set("authorization", token);
            }
            return headers;
        },
    }),
    tagTypes: ["Users", "Products"],
    endpoints: (builder) => ({
        usersData: builder.query<IUser[], void>({
            query: () => "/dashboard/users",
            providesTags: ["Users"],
        }),
        userById: builder.query<IUser, string>({
            query: (id) => `/dashboard/users/${id}`,
        }),

        createUser: builder.mutation<IUser, ICreateUser>({
            query: (body) => ({
                url: "/dashboard/users",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Users"],
        }),
        updateUser: builder.mutation<IUser, IUpdateUser>({
            query: (body) => ({
                url: `/dashboard/users/${body.id}`,
                method: "PUT",
                body: {
                    name: body.name,
                    email: body.email,
                    isAdmin: body.isAdmin,
                },
            }),
            invalidatesTags: ["Users"],
        }),

        deleteUser: builder.mutation<IUser, string>({
            query: (id) => ({
                url: `/dashboard/users/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Users"],
        }),

        getProducts: builder.query<IProduct[], void>({
            query: () => "/dashboard/products",
            providesTags: ["Products"],
        }),
        createProduct: builder.mutation<IProduct, ICreateProduct>({
            query: (body) => ({
                url: "/dashboard/products",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Products"],
        }),
        deleteProduct: builder.mutation<IProduct, string>({
            query: (id) => ({
                url: `/dashboard/products/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Products"],
        }),
    }),
});

export const {
    useUsersDataQuery,
    useGetProductsQuery,
    useUserByIdQuery,
    useCreateUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
    useCreateProductMutation,
    useDeleteProductMutation,
} = dashboardApi;
