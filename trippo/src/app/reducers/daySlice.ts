import { createSlice } from "@reduxjs/toolkit";
import { getMockTimeSlots } from 'app/states';
import { Location } from './locationSlice';

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

export interface State {
  value: TimeSlot[];
  day_id: number;
  highlighted: TimeSlot | null;
}

interface Action {
  payload: any;
}

interface TimeSlotAction extends Action {
  payload: TimeSlot;
}

interface IdAction extends Action {
  payload: number;
}

interface dateAction extends Action {
  payload: Date;
}

interface SliceReducers {
  [x: string]: (state: State, action: Action) => void;
}

export const day = createSlice<State, SliceReducers, "day">({
  // reducer uses the actions
  name: "day",
  initialState: {
    value: [],
    day_id: -1,
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
    setTimeSlots: (state: State, action: TimeSlotAction) => {
      if (action?.payload) {
        state.value = [action.payload]; // idk abt this
      }
    },
    setHighlighted: (state: State, action: IdAction) => {
      if (action?.payload) {
        state.highlighted = state.value.find((slot) => slot.id === action.payload) || null;
      }
    },
    setDayState: (state: State, action: dateAction) => {
      state = Object.assign(state, getMockTimeSlots(action.payload));
    }
  },
});

// Action creators are generated for each case reducer function
export const {
  clearTimeSlots,
  setTimeSlots,
  setHighlighted,
  setDayState,
} = day.actions;

export default day.reducer;
