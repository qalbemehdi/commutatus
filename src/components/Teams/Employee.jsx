"use client"
import React from 'react'
import { useState } from 'react';
import { EMPLOYEE_ID } from '@/utils/const';
import useEmployeesData from '@/hooks/useEmployeesData';

export default function Employee({ employeeId, onDragStart, onDragEnd }) {
    const [isDragging, setIsDragging] = useState(false);

    const employees = useEmployeesData();
    const employee = employees.find(e => e.employee_id === employeeId);

    const handleDragStart = (e) => {
        e.dataTransfer.setData(EMPLOYEE_ID, employeeId);
        setIsDragging(true);
        onDragStart?.(employeeId);
    };

    const handleDragEnd = () => {
        setIsDragging(false);
        onDragEnd?.();
    };

    return (
        <div
            className={`flex items-center p-2 bg-gray-100 ${isDragging ? 'opacity-50' : ''} cursor-grab`}
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <div className="text-base">
                <p>{employee?.name} - {employee?.position}</p>
            </div>
        </div>
    );
}