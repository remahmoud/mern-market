import { IUser } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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
    endpoints: (builder) => ({
        usersData: builder.query<IUser[], void>({
            query: () => "/dashboard/users",
        }),
    }),
});

export const { useUsersDataQuery } = dashboardApi;
