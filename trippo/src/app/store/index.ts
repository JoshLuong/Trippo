import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import userReducer from "../reducers/userSlice";
import itineraryReducer from "../reducers/itinerarySlice";
import { itineraryApi } from 'services/itinerary';
import { userApi } from 'services/user';

const store = configureStore({
  // add reducers to the store
  reducer: {
    itinerary: itineraryReducer,
    user: userReducer,
    [itineraryApi.reducerPath]: itineraryApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(itineraryApi.middleware, userApi.middleware)
});

// Infer the `RootState` and `AppDispatch` types from the store itself
type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
