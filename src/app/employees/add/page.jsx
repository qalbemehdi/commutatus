"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from "react-hot-toast";

import InputField from '@/components/InputField';
import SelectOption from '@/components/SelectOption';

import { employeeSchema } from '@/utils/FormSchema';
import { departments, execution, positionsByDepartment } from '@/data/company';
import { generateRandomID, filterPositionsByLevelAndDepartment } from '@/utils/helper';
import { useDispatch } from "react-redux";
import { addEmployee } from '@/store/slices/employeeSlice';
import useEmployeesData from '@/hooks/useEmployeesData';

export default function AddEmployee() {
    const router = useRouter();
    const employees = useEmployeesData();
    const dispatch = useDispatch();

    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        resolver: zodResolver(employeeSchema)
    });

    const selectedLevel = watch('level');
    const selectedDepartment = watch('department');

    const filteredPositions = filterPositionsByLevelAndDepartment(selectedLevel, selectedDepartment, execution, positionsByDepartment);

    const onSubmit = (data) => {
        const updatedData = {
            ...data,
            employee_id: generateRandomID(),
            level: parseInt(data.level),
        };
        if (employees.find((emp => emp.email === updatedData.email))) {
            toast.error("Employee with this email already exists");
            return;
        }
        if (employees.find(emp => emp.position === updatedData.position && emp.level === 1)) {
            toast.error(`${updatedData.position} is already exist.`);
            return;
        }
        dispatch(addEmployee(updatedData));
        toast.success("Employee added successfully");
        router.push('/employees');
    };

    return (
        <div className='flex justify-center min-h-screen items-center'>
            <div className='max-w-lg p-10 inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'>
                <h1 className='text-2xl font-bold text-center mb-6'>Add New Employee</h1>
                <form onSubmit={handleSubmit(onSubmit)} className='w-full space-y-5'>
                    <InputField
                        type="text"
                        placeholder="Name"
                        label="Name"
                        register={register('name')}
                        error={errors?.name?.message}
                    />
                    <InputField
                        type="email"
                        placeholder="Email"
                        label="Email"
                        register={register('email')}
                        error={errors?.email?.message}
                    />
                    <InputField
                        type="number"
                        placeholder="Phone"
                        label="Phone"
                        register={register('phone')}
                        error={errors?.phone?.message}
                    />
                    <SelectOption
                        label="Level"
                        placeHolder='Select level'
                        data={[1, 2, 3]}
                        register={register('level')}
                        error={errors?.level?.message}
                    />
                    <SelectOption
                        label="Department"
                        placeHolder='Select department'
                        data={departments.sort()}
                        register={register('department')}
                        error={errors?.department?.message}
                    />
                    <SelectOption
                        label="Position"
                        placeHolder='Select position'
                        data={filteredPositions}
                        register={register('position')}
                        error={errors?.position?.message}
                    />
                    <button className='w-full p-4 bg-blue-400 rounded-lg' type='submit'>Submit</button>
                </form>
            </div>
        </div>
    );
}
