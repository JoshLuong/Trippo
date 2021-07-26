import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from 'types/models';

const url = process.env.REACT_APP_BACKEND_URL!;

// Define a service using a base URL and expected endpoints
export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${url}/users` }),
    endpoints: (builder) => ({
        getUserByEmail: builder.query<User, string>({
            query: (email: string) => {
                return {
                    url: `/${email}`,
                    credentials: 'include'
                }
            },
        }),
    }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
    useLazyGetUserByEmailQuery,
} = userApi;
