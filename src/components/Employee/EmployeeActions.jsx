"use client";
import Link from "next/link";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function EmployeeActions({ employeeId, onConfirmDelete }) {
    return (
        <div className="flex space-x-4 justify-center">
            <Link
                href={`/employees/edit/${employeeId}`}
                className="text-blue-500 hover:text-blue-700 focus:outline-none"
                aria-label="Edit employee"
            >
                <FaEdit />
            </Link>
            <button
                className="text-red-500 hover:text-red-700 focus:outline-none"
                onClick={onConfirmDelete}
                aria-label="Delete employee"
            >
                <FaTrash />
            </button>
        </div>
    );
}
