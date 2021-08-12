import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import qs from 'qs';
import { Itinerary, Activity } from 'types/models';

interface GetItinerariesRequest {
  offset: number;
  limit: number;
  name?: string;
}

interface GetItinerariesResponse {
  itineraries: Itinerary[];
  count: number;
}

export const itineraryApi = createApi({
  reducerPath: 'itineraryApi',
  baseQuery: fetchBaseQuery({ baseUrl: `/api/itineraries` }),
  endpoints: (builder) => ({
    getItineraries: builder.query<GetItinerariesResponse, GetItinerariesRequest>({
      query: (req: GetItinerariesRequest) => {
        return {
          url: `/?${qs.stringify(req)}`,
          credentials: 'include'
        }
      },
    }),
    getItineraryById: builder.query<Itinerary, string>({
      query: (id: string) => {
        return {
          url: `/${id}`,
          credentials: 'include'
        }
      },
    }),
    deleteItinerary: builder.mutation<{ success: boolean; id: string }, string>({
      query(id) {
        return {
          url: `/${id}`,
          method: 'DELETE',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      }
    }),
    createItinerary: builder.mutation<Itinerary, Partial<Itinerary>>({
      query(body) {
        return {
          url: `/`,
          credentials: 'include',
          method: 'POST',
          body,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      },
    }),
    updateItinerary: builder.mutation<Itinerary, Partial<Itinerary>>({
      query(body) {
        return {
          url: `/${body._id}`,
          credentials: 'include',
          method: 'PATCH',
          body,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      },
    }),
    createActivity: builder.mutation<Activity, Partial<Activity>>({
      query(body) {
        return {
          url: `/new-activity`,
          credentials: 'include',
          method: 'POST',
          body,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      },
    }),
  }),
});

export const {
  useGetItinerariesQuery,
  useLazyGetItinerariesQuery,
  useGetItineraryByIdQuery,
  useLazyGetItineraryByIdQuery,
  useCreateItineraryMutation,
  useDeleteItineraryMutation,
  useUpdateItineraryMutation,
  useCreateActivityMutation,
} = itineraryApi;
