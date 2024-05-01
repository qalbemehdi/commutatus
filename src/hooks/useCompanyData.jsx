"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompanyData } from "@/store/slices/companySlice";

export default function useCompanyData() {
    const company = useSelector((state) => state.company.data);
    const status = useSelector((state) => state.company.status);
    const dispatch = useDispatch();

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchCompanyData());
        }
    }, [status, dispatch]);

    return company;
}
