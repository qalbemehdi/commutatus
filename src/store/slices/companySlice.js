import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { COMPANY_DATA } from '@/utils/const';
import { company_db } from '@/data/company';

export const fetchCompanyData = createAsyncThunk('companyData/fetchCompanyData', async () => {
    const storedData = localStorage.getItem(COMPANY_DATA);
    if (!storedData) {
        localStorage.setItem(COMPANY_DATA, JSON.stringify(company_db));
        return company_db;
    }
    return JSON.parse(storedData);
});

const companyDataSlice = createSlice({
    name: 'company',
    initialState: {
        data: {},
        status: 'idle'
    },
    reducers: {
        addNewTeamRef: (state, action) => {
            const { departmentId, teamId } = action.payload;
            const depId = parseInt(departmentId);
            state.data.departments = state.data.departments.map(department => {
                if (department.id === depId) {
                    return {
                        ...department,
                        teams: [...department.teams, teamId],
                    };
                }
                return department;
            });
            localStorage.setItem(COMPANY_DATA, JSON.stringify(state.data));
        },
        deleteTeamRef: (state, action) => {
            const { departmentId, teamId } = action.payload;
            const depId = parseInt(departmentId);
            state.data.departments = state.data.departments.map(department => {
                if (department.id === depId) {
                    return {
                        ...department,
                        teams: department.teams.filter(team => team !== teamId),
                    };
                }
                return department;
            });
            localStorage.setItem(COMPANY_DATA, JSON.stringify(state.data));
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCompanyData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCompanyData.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = 'succeeded';
            })
            .addCase(fetchCompanyData.rejected, (state) => {
                state.status = 'failed';
            });
    }
});

export const { addNewTeamRef, deleteTeamRef } = companyDataSlice.actions;
export default companyDataSlice.reducer;
