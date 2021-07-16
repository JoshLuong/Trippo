import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Itinerary } from 'types/models';

const url = process.env.REACT_APP_BACKEND_URL!;

// Define a service using a base URL and expected endpoints
export const itineraryApi = createApi({
  reducerPath: 'itineraryApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${url}/itineraries` }),
  endpoints: (builder) => ({
    getItineraries: builder.query<Itinerary[], void>({
      query: () => '/',
    }),
    createItinerary: builder.mutation<Itinerary, Partial<Itinerary>>({
      query(body) {
        return {
          url: `/`,
          method: 'POST',
          body,
        }
      },
    }) 
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetItinerariesQuery, useCreateItineraryMutation } = itineraryApi;
