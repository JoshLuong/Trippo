import { createSlice } from "@reduxjs/toolkit";
import { Itinerary } from 'types/models';

interface State {
  value: Itinerary | null;
}

interface Action {
  payload: any;
}

interface SliceReducers {
  [x: string]: (state: State, action: Action) => void;
}

export const itinerary = createSlice<State, SliceReducers, "itinerary">({
  // reducer uses the actions
  name: "itinerary",
  initialState: {
    value: null,
  },
  reducers: {
    setItinerary: (state: State, action: Action) => {
      if (action?.payload) {
        state.value = action.payload;
      }
    }
  },
});

// Action creators are generated for each case reducer function
export const {
  setItinerary,
} = itinerary.actions;

export default itinerary.reducer;
