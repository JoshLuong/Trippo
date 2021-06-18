import { createSlice } from "@reduxjs/toolkit";
import { getMockTimeSlots } from "app/states";
import { Location } from "./locationSlice";

export interface TimeSlot {
  id: number;
  location: Location;
  time?: Date;
  destination?: string;
  comments?: string[];
  type?: string;
  suggested?: {
    destination?: string;
    comments?: string;
    type?: string;
  }[];
  cost?: number;
}

interface State {
  value: TimeSlot[];
  highlighted: TimeSlot | null;
}

interface Action {
  payload: any;
}

interface DateAction extends Action {
  payload: Date;
}

interface IdAction extends Action {
  payload: number;
}

interface SliceReducers {
  [x: string]: (state: State, action: Action) => void;
}

export const timeSlot = createSlice<State, SliceReducers, "timeSlot">({
  // reducer uses the actions
  name: "timeSlot",
  initialState: {
    value: [],
    highlighted: null,
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
    clearTimeSlots: (state: State) => {
      state.value = [];
    },
    setTimeSlots: (state: State, action: DateAction) => {
      if (action?.payload) {
        state.value = getMockTimeSlots(action.payload);
      }
    },
    setHighlighted: (state: State, action: IdAction) => {
      if (action?.payload) {
        state.highlighted =
          state.value.find((slot) => slot.id === action.payload) || null;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { clearTimeSlots, setTimeSlots, setHighlighted } =
  timeSlot.actions;

export default timeSlot.reducer;
