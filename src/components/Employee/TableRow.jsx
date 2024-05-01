import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import toast from "react-hot-toast";

import useTeamsData from '@/hooks/useTeamsData';
import useCompanyData from '@/hooks/useCompanyData';

import EmployeeActions from './EmployeeActions';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import EmployeeDetails from './EmployeeDetails';

import { deleteEmployee } from "@/store/slices/employeeSlice";
import { deleteTeam, editTeam } from '@/store/slices/teamSlice';
import { findTeamByEmployeeId } from '@/utils/helper';
import { deleteTeamRef } from '@/store/slices/companySlice';

export default function TableRow({ employee }) {
    const [isDeleting, setIsDeleting] = useState(false);
    const teams = useTeamsData();
    const company = useCompanyData();
    const dispatch = useDispatch()

    const handleDeleteEmployee = (id) => {
        const team = findTeamByEmployeeId(teams, id);

        if (team) {
            // Filter out the employee from team members
            const updatedTeamMembers = team.team_members.filter(member => member !== id);
            const updatedTeam = {
                ...team,
                team_members: updatedTeamMembers
            };

            // Update the team in the store
            dispatch(editTeam(updatedTeam));
        }

        // Handle deletion of team leads
        if (employee.position === "Team Lead") {
            const depId = company.departments.find(d => d.department === employee.department).id;
            const teamsWithEmployeeAsLead = teams.filter(t => t.team_lead === id);
            if (teamsWithEmployeeAsLead.length) {
                teamsWithEmployeeAsLead.forEach(t => {
                    dispatch(deleteTeam(t.id));
                    dispatch(deleteTeamRef({ departmentId: depId, teamId: t?.id }))
                });
            }
        }

        // Delete the employee
        dispatch(deleteEmployee(id));
        toast.success("Employee deleted successfully");
        setIsDeleting(false);
    };


    return (
        <tbody>
            <tr>
                <td colSpan="7">
                    <DeleteConfirmationModal
                        isOpen={isDeleting}
                        onClose={() => setIsDeleting(false)}
                        onDelete={() => handleDeleteEmployee(employee.employee_id)}
                    />
                </td>
            </tr>
            <tr>
                <EmployeeDetails employee={employee} />
                <td className="px-6 py-4 whitespace-nowrap">
                    <EmployeeActions employeeId={employee.employee_id} onConfirmDelete={() => setIsDeleting(true)} />
                </td>
            </tr>
        </tbody>
    );
}

