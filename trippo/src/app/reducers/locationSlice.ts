import { createSlice } from "@reduxjs/toolkit";

export interface Location {
  lng: number;
  lat: number;
}

interface State {
  value: Location[];
}

interface Action {
  payload: Location[];
}

interface SliceReducers {
  [x: string]: (state: State, action: Action) => void;
}

export const location = createSlice<State, SliceReducers, "location">({
  // reducer uses the actions
  name: "location",
  initialState: {
    value: [],
  },
  reducers: {
    // reducer receives data from the payload
    // add: (state: State, action: Action) => {
    //   // Redux Toolkit allows us to write "mutating" logic in reducers. It
    //   // doesn't actually mutate the state because it uses the Immer library,
    //   // which detects changes to a "draft state" and produces a brand new
    //   // immutable state based off those changes
    //   state.value = [...state.value, JSON.parse(action.payload)];
    // },
    // deleteAll: (state) => {
    //   state.value = [];
    // },
    setLocations: (state: State, action: Action) => {
      state.value = action.payload;
    }
  },
});

// Action creators are generated for each case reducer function
export const {
  // deleteIdx,
  // add,
  // deleteAll,
  setLocations
} = location.actions;

export default location.reducer;
