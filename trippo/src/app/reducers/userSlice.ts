import { createSlice } from "@reduxjs/toolkit";
import { User } from 'types/models';

interface IUser extends User {
  isLoggedIn: boolean;
}

interface State {
  value: IUser | null;
}

interface Action {
  payload: any;
}

interface SliceReducers {
  [x: string]: (state: State, action: Action) => void;
}

export const user = createSlice<State, SliceReducers, "user">({
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

export const { setUser } = user.actions;

export default user.reducer;
