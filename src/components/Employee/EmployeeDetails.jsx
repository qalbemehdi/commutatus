import React from 'react'

export default function EmployeeDetails({ employee }) {
    return (
        <>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.employee_id}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.name}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.email}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.phone}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.position}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.department}</td>
        </>
    )
}
