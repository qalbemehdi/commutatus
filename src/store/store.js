import { configureStore } from '@reduxjs/toolkit'
import employeeSlice from './slices/employeeSlice'
import teamSlice from './slices/teamSlice'
import companySlice from './slices/companySlice'

export const store = configureStore({
    reducer: {
        company: companySlice,
        teams: teamSlice,
        employees: employeeSlice,
    },
})