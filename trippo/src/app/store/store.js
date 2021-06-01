import { configureStore } from '@reduxjs/toolkit'
import exampleReducer from '../reducers/exampleComp1Slice'

export default configureStore({
  // add reducers to the store
  reducer: {
    exampleState: exampleReducer,
  },
})