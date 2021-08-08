import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "types/models";

// Define a service using a base URL and expected endpoints
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: `/api/users` }),
  endpoints: (builder) => ({
    getUserByEmail: builder.query<User, string>({
      query: (email: string) => {
        return {
          url: `/email/${email}`,
          credentials: "include",
        };
      },
    }),
    getUserById: builder.query<User, string>({
      query: (id: string) => {
        return {
          url: `/${id}`,
          credentials: "include",
        };
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLazyGetUserByEmailQuery, useGetUserByIdQuery } = userApi;
