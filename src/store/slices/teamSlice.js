import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TEAM_KEY } from '@/utils/const';
import { teams_db } from '@/data/company';

export const fetchTeams = createAsyncThunk('teams/fetchTeams', async () => {
    const storedTeams = localStorage.getItem(TEAM_KEY);
    if (!storedTeams) {
        localStorage.setItem(TEAM_KEY, JSON.stringify(teams_db));
        return teams_db;
    }
    return JSON.parse(storedTeams);
});

const teamSlice = createSlice({
    name: 'teamsData',
    initialState: {
        teams: [],
        status: 'idle',
    },
    reducers: {
        addTeam: (state, action) => {
            state.teams.push(action.payload);
            localStorage.setItem(TEAM_KEY, JSON.stringify(state.teams));
        },
        deleteTeam: (state, action) => {
            const updatedTeams = state.teams.filter(team => team.id !== action.payload);
            state.teams = updatedTeams;
            localStorage.setItem(TEAM_KEY, JSON.stringify(updatedTeams));
        },
        editTeam: (state, action) => {
            const updatedTeams = state.teams.map(team => {
                if (team.id === action.payload.id) {
                    return action.payload;
                }
                return team;
            });
            state.teams = updatedTeams;
            localStorage.setItem(TEAM_KEY, JSON.stringify(updatedTeams));
        },
        moveEmployeeToTeam: (state, action) => {
            const { employeeId, newTeamId, departmentId, departments } = action.payload;
            const department = departments.find(d => d.id === departmentId);

            let isSameDepartment = false;

            for (const teamId of department.teams) {
                const team = state.teams.find(t => t.id === teamId);
                if (team.team_members.includes(employeeId)) {
                    isSameDepartment = true;
                    break;
                }
            }

            if (!isSameDepartment) {
                throw new Error("Cannot move a team member to different department");
            }

            const currentTeamIndex = state.teams.findIndex(t => t.team_members.includes(employeeId));
            const newTeamIndex = state.teams.findIndex(t => t.id === newTeamId);

            if (currentTeamIndex === -1 || newTeamIndex === -1) {
                return;
            }

            const updatedCurrentTeamMembers = state.teams[currentTeamIndex].team_members.filter(id => id !== employeeId);
            const updatedNewTeamMembers = [...state.teams[newTeamIndex].team_members, employeeId];

            state.teams[currentTeamIndex].team_members = updatedCurrentTeamMembers;
            state.teams[newTeamIndex].team_members = updatedNewTeamMembers;

            localStorage.setItem(TEAM_KEY, JSON.stringify(state.teams));
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTeams.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTeams.fulfilled, (state, action) => {
                state.teams = action.payload;
                state.status = 'succeeded';
            })
            .addCase(fetchTeams.rejected, (state) => {
                state.status = 'failed';
            });
    }
});

export const { addTeam, deleteTeam, editTeam, moveEmployeeToTeam } = teamSlice.actions;
export default teamSlice.reducer;
