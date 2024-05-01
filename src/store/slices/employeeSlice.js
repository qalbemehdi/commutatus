import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { EMPLOYEE_KEY } from '@/utils/const';
import { employee_db } from '@/data/company';

export const fetchEmployees = createAsyncThunk('employees/fetchEmployees', async () => {
    const storedEmployees = localStorage.getItem(EMPLOYEE_KEY);
    if (!storedEmployees) {
        localStorage.setItem(EMPLOYEE_KEY, JSON.stringify(employee_db));
        return employee_db;
    }
    return JSON.parse(storedEmployees);
});

const employeeSlice = createSlice({
    name: 'employees',
    initialState: {
        list: [],
        status: 'idle',
    },
    reducers: {
        addEmployee: (state, action) => {
            state.list.push(action.payload);
            localStorage.setItem(EMPLOYEE_KEY, JSON.stringify(state.list));
        },
        deleteEmployee: (state, action) => {
            const newList = state.list.filter(employee => employee.employee_id !== action.payload);
            state.list = newList;
            localStorage.setItem(EMPLOYEE_KEY, JSON.stringify(newList));
        },
        editEmployee: (state, action) => {
            const newList = state.list.map(employee => {
                if (employee.employee_id === action.payload.employee_id) {
                    return action.payload;
                }
                return employee;
            });
            state.list = newList;
            localStorage.setItem(EMPLOYEE_KEY, JSON.stringify(newList));
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmployees.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchEmployees.fulfilled, (state, action) => {
                state.list = action.payload;
                state.status = 'succeeded';
            })
            .addCase(fetchEmployees.rejected, (state, action) => {
                state.status = 'failed';
            });
    }
});

export const { addEmployee, deleteEmployee, editEmployee } = employeeSlice.actions;

export default employeeSlice.reducer;