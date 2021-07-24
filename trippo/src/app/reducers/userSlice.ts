import { createSlice } from "@reduxjs/toolkit";

export type User = {
  isLoggedIn: boolean,
  name: string,
  email: string,
  _id: string,
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
