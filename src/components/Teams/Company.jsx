"use client"
import Department from "./Department";
import Loader from "../Loader";
import useCompanyData from "@/hooks/useCompanyData";

export default function Company() {
    const company = useCompanyData();

    if (Object.keys(company).length === 0) {
        return <div className="w-full h-screen flex justify-center items-center">
            <Loader />
        </div>;
    }
    return (
        <div className=" relative  max-w-2xl mx-auto">
            <h1 className="text-xl font-bold mb-4 bg-black text-white p-2">{company.name} - {company.position}</h1>
            {company?.departments?.map(department => (
                <Department key={department.id} department={department} />
            ))}
        </div>
    );
};
