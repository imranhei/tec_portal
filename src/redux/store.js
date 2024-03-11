import { configureStore } from '@reduxjs/toolkit'
import userData from './auth'
// import operatorData from './operator'

export const store = configureStore({
  reducer: {
    userData: userData,
    // operatorData: operatorData,
  },
})