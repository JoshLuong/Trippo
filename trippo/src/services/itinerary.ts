import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import qs from 'qs';
import { Itinerary } from 'types/models';

const url = process.env.REACT_APP_BACKEND_URL!;

interface GetItinerariesRequest {
  offset: number;
  limit: number;
}

interface GetItinerariesResponse {
  itineraries: Itinerary[];
  count: number;
}

// Define a service using a base URL and expected endpoints
export const itineraryApi = createApi({
  reducerPath: 'itineraryApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${url}/itineraries` }),
  endpoints: (builder) => ({
    getItineraries: builder.query<GetItinerariesResponse, GetItinerariesRequest>({
      query: (req: GetItinerariesRequest) => `/?${qs.stringify(req)}`,
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
export const {
  useGetItinerariesQuery,
  useLazyGetItinerariesQuery,
  useCreateItineraryMutation,
} = itineraryApi;
