"use client";
import React, { useState, useCallback } from "react";
import Link from "next/link";

import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import Filter from "./Filter";
import Loader from "../Loader";

import useDebounce from "@/hooks/useDebounce";
import useEmployeesData from "@/hooks/useEmployeesData";

const employeeCols = [
    "ID",
    "Name",
    "Email",
    "Phone",
    "Position",
    "Department",
    "Actions",
];

const EmployeeTable = () => {
    const employees = useEmployeesData();

    const [filterOptions, setFilterOptions] = useState({
        name: "",
        email: "",
        phone: "",
    });

    //Debounce search terms
    const debouncedFilterOptions = {
        name: useDebounce(filterOptions.name, 300),
        email: useDebounce(filterOptions.email, 300),
        phone: useDebounce(filterOptions.phone, 300),
    };

    //Function to update filter search terms
    const handleFilterChange = useCallback(
        (field, value) => {
            if (value !== filterOptions[field]) {
                setFilterOptions((prevOptions) => ({
                    ...prevOptions,
                    [field]: value,
                }));
            }
        },
        [filterOptions]
    );

    //Filter employees based on search terms
    const filteredEmployees = employees?.filter(
        (employee) =>
            (debouncedFilterOptions.name === "" ||
                employee.name
                    .toLowerCase()
                    .includes(debouncedFilterOptions.name.toLowerCase())) &&
            (debouncedFilterOptions.email === "" ||
                employee.email
                    .toLowerCase()
                    .includes(debouncedFilterOptions.email.toLowerCase())) &&
            (debouncedFilterOptions.phone === "" ||
                employee.phone
                    .toLowerCase()
                    .includes(debouncedFilterOptions.phone.toLowerCase()))
    );


    if (employees.length <= 0) {
        return <div className='min-w-full h-full min-h-96 flex justify-center items-center'>
            <Loader />
        </div>
    }

    return (
        <div className="overflow-hidden  w-full">
            <div className="mb-4 w-fit ml-auto">
                <Link
                    className="`w-full  h-12 py-1 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg drop-shadow-lg flex justify-center items-center gap-1 "
                    href="/employees/add"
                    aria-label="Add new employee"
                >
                    Add New Employee
                </Link>
            </div>
            <Filter filterOptions={filterOptions} handleFilter={handleFilterChange} />
            <div className="overflow-x-auto w-full">
                <table className="min-w-full divide-y divide-gray-200">
                    <TableHeader columns={employeeCols} />
                    {filteredEmployees?.map((employee) => (
                        <TableRow key={employee.employee_id} employee={employee} />
                    ))}
                </table>
            </div>
        </div>
    );
};

export default EmployeeTable;
