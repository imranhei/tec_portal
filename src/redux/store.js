import { configureStore } from '@reduxjs/toolkit'
import userData from './auth'
import currentJobs from './currentJobs'
// import operatorData from './operator'

export const store = configureStore({
  reducer: {
    userData: userData,
    currentJobs: currentJobs,
    // operatorData: operatorData,
  },
})