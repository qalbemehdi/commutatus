import React, { useState } from 'react'
import Link from 'next/link';
import Team from './Team';
import useEmployeesData from '@/hooks/useEmployeesData';

export default function Department({ department }) {
    const [isOpen, setIsOpen] = useState(false);
    const employees = useEmployeesData();

    const employeeDetail = employees?.find(item => item.employee_id === department.employee_detail)

    return (
        <div className="ml-8 my-2 overflow-hidden mt-4">
            <div className="flex justify-between items-center w-full max-w-2xl bg-gray-300 text-white p-2 ">
                <h2 className="text-xl text-nowrap font-semibold cursor-pointer hover:underline underline-offset-8 transition-all duration-300" onClick={() => setIsOpen(!isOpen)}>
                    {employeeDetail?.name} - {department.position}
                </h2>
                <Link href={`/dashboard/team/add?id=${department.id}`} aria-label='Add new team'>Add Team</Link>
            </div>
            <div className={`ml-8 ${isOpen ? "h-auto" : "h-0"} transition-all duration-300 `}>
                {department?.teams?.map(teamId => (
                    <Team key={teamId} teamId={teamId} departmentId={department.id} />
                ))}
            </div>
        </div>
    );
}
