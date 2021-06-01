import { createSlice } from '@reduxjs/toolkit'

export const exampleComp1Slice = createSlice({
  // reducer uses the actions
  name: 'exampleState',
  initialState: {
    value: []
    },
  reducers: {
    // reducer receives data from the payload
    add: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value = [...state.value, (JSON.parse(action.payload))];
    },
    deleteAll: (state) => {
      state.value = [];
    },
  },
})

// Action creators are generated for each case reducer function
export const { deleteIdx ,add, deleteAll } = exampleComp1Slice.actions

export default exampleComp1Slice.reducer