import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "types/models";

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

export const {
  useLazyGetUserByEmailQuery,
  useGetUserByIdQuery
} = userApi;
