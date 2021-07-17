import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import locationReducer from "../reducers/locationSlice";
import dayReducer from "../reducers/daySlice";
import itineraryReducer from "../reducers/itinerarySlice";
import { itineraryApi } from 'services/itinerary';

const store = configureStore({
  // add reducers to the store
  reducer: {
    location: locationReducer,
    day: dayReducer,
    itinerary: itineraryReducer,
    [itineraryApi.reducerPath]: itineraryApi.reducer,
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(itineraryApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
