"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployees } from "@/store/slices/employeeSlice";

export default function useEmployeesData() {
    const employees = useSelector((state) => state.employees.list);
    const status = useSelector((state) => state.employees.status);
    const dispatch = useDispatch();

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchEmployees());
        }
    }, [status, dispatch]);

    return employees;
}
