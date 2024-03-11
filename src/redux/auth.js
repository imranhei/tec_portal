import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loggedIn: false,
}

export const userData = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setLoggedIn: (state, action) => {
      state.loggedIn = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setLoggedIn } = userData.actions

export default userData.reducer