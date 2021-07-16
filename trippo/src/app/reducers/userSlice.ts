import { createSlice } from "@reduxjs/toolkit";

export type Itinerary = {
    itinerary_id: string;
    name: string;
    budget?: number;
    current_cost?: number;
    collaborators: {
        id: string;
        name: string;
    }[];
    comments?: string;
    tags?: [];
    start_date: Date;
    end_date: Date;
}
export type User = {
  id: string;
  name: string;
  password: string;
  itineraries: Itinerary[];
} | null

interface State {
  value: User;
}

interface Action {
  payload: any;
}

interface SliceReducers {
  [x: string]: (state: State, action: Action) => void;
}

export const user = createSlice<State, SliceReducers, "user">({
  // reducer uses the actions
  name: "user",
  initialState: {
    value: null
  },
  reducers: {
    setUser: (state: State, action: Action) => {
      if (action?.payload) {
        state.value = action.payload;
      }
    }
  },
});

// Action creators are generated for each case reducer function
export const {
  setUser
} = user.actions;

export default user.reducer;
