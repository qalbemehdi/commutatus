import React, { useState } from 'react'
import Link from 'next/link';
import { useDispatch } from "react-redux";
import toast from "react-hot-toast"

import Employee from './Employee';

import { EMPLOYEE_ID } from '@/utils/const';
import { deleteTeam, moveEmployeeToTeam } from '@/store/slices/teamSlice';
import { deleteTeamRef } from '@/store/slices/companySlice';
import useTeamsData from '@/hooks/useTeamsData';
import useEmployeesData from '@/hooks/useEmployeesData';
import useCompanyData from '@/hooks/useCompanyData';

export default function Team({ teamId, departmentId }) {
    const [isOpen, setIsOpen] = useState(false);
    const [draggedEmployeeId, setDraggedEmployeeId] = useState(null);

    const dispatch = useDispatch();

    const teams = useTeamsData();
    const employees = useEmployeesData();
    const companyData = useCompanyData();

    const team = teams?.find(t => t.id === teamId);
    const teamLead = employees.find(e => e.employee_id === team?.team_lead);

    const handleDragStart = (employeeId) => {
        setDraggedEmployeeId(employeeId);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const droppedEmployeeId = e.dataTransfer.getData(EMPLOYEE_ID);
        if (droppedEmployeeId !== draggedEmployeeId) {
            try {
                dispatch(moveEmployeeToTeam({
                    employeeId: droppedEmployeeId,
                    newTeamId: teamId,
                    departmentId: departmentId,
                    departments: companyData.departments
                }));
                toast.success("Employee moved successfully");
            } catch (e) {
                toast.error("Cannot move a team member to different department");
            }
        }
        setDraggedEmployeeId(null);
    };

    const handleDelete = (teamId, departmentId) => {
        dispatch(deleteTeam(teamId, departmentId));
        dispatch(deleteTeamRef({ departmentId, teamId }));
        toast.success("Team deleted successfully");
    }

    return (
        team && <div className=" py-2">
            <div className="flex justify-between items-center bg-gray-200 p-2">
                <h3 className="text-md font-bold cursor-pointer hover:underline underline-offset-4 transition-all duration-300" onClick={() => setIsOpen(!isOpen)}>
                    {team?.name}
                </h3>
                <div className="flex justify-between items-center gap-4">
                    <Link href={`/dashboard/team/edit/${teamId}?depId=${departmentId}`} aria-label='Edit team' className='hover:text-blue-500'>Edit Team</Link>
                    <button onClick={() => handleDelete(teamId, departmentId)} className="hover:text-red-500" aria-label='Delete team'>Delete Team</button>
                </div>
            </div>
            <div className={`ml-8 overflow-hidden ${isOpen ? "h-auto py-2" : "h-0"} transition-all duration-300 space-y-2`} onDragOver={handleDragOver} onDrop={handleDrop}>
                {teamLead && (
                    <p className="flex items-center p-2 bg-blue-100 ">
                        {teamLead?.name} - {teamLead?.position}
                    </p>
                )}
                {team?.team_members?.map((memberId) => (
                    <Employee key={memberId} employeeId={memberId} onDragStart={handleDragStart} onDragEnd={() => setDraggedEmployeeId(null)} />
                ))}
            </div>
        </div>
    );
}