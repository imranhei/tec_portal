import { createSlice } from '@reduxjs/toolkit'

// const initialState = {
//   loggedIn: false,
//   user: null
// }

export const userData = createSlice({
  name: 'userData',
  initialState : {
    loggedIn: false,
    user: null
  },
  reducers: {
    setLoggedIn: (state, action) => {
      state.loggedIn = action.payload
      state.user = null
    },
    setUser: (state, action) => {
      state.loggedIn = true
      state.user = action.payload
    },
  }
})

// Action creators are generated for each case reducer function
export const { setLoggedIn, setUser } = userData.actions

export default userData.reducer