"use client";
import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

import useTeamsData from "@/hooks/useTeamsData";
import useEmployeesData from "@/hooks/useEmployeesData";
import useCompanyData from "@/hooks/useCompanyData";

import {
    filterEmployeesByDepartment,
    findTeamByName,
    filterTeamLeads,
    generateRandomID,
    getDepartmentById,
    getEmployee,
} from "@/utils/helper";
import { teamSchema } from "@/utils/FormSchema";
import { addTeam } from "@/store/slices/teamSlice";
import { addNewTeamRef } from "@/store/slices/companySlice";
import { editEmployee } from "@/store/slices/employeeSlice";

export default function useAddTeam() {
    const [selectedOptions, setSelectedOptions] = useState([]);

    const employees = useEmployeesData();
    const company = useCompanyData();
    const teams = useTeamsData();

    const searchParams = useSearchParams();
    const router = useRouter();
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitted },
    } = useForm({
        resolver: zodResolver(teamSchema),
    });

    const departmentId = parseInt(searchParams.get("id"));
    const teamLead = watch("team_lead");

    const getDepartment = getDepartmentById(company, departmentId);
    const filterLeads = filterTeamLeads(employees, getDepartment?.department);
    const filterEmployee = filterEmployeesByDepartment(
        employees,
        getDepartment?.department,
        teamLead
    );
    const findEmployee = getEmployee(employees, teamLead);

    const allTeamMembers = teams
        .map((team) => {
            return [team.team_lead, team.team_members];
        })
        .flat(2);

    const filterAvailableEmployees = filterEmployee.filter(
        (emp) =>
            !allTeamMembers.includes(emp.employee_id) &&
            emp.level > 2 &&
            emp
    );

    const filterAvailableLeads = filterLeads.filter((emp) => {
        return !allTeamMembers.includes(emp.employee_id) && emp.level === 2 && emp;
    });

    const onSubmit = (data) => {
        const newTeamData = {
            id: generateRandomID(),
            name: data.name,
            team_lead: data.team_lead,
            team_members: selectedOptions.map((option) => option.employee_id),
        };

        const updatedEmployee = {
            ...findEmployee[0],
            position: "Team Lead",
        };

        const findTeamName = findTeamByName(teams, newTeamData.name);
        if (findTeamName) {
            toast.error("A team with this name already exist");
            return;
        }
        if (newTeamData.team_members.length <= 0) return;
        dispatch(addTeam(newTeamData));
        dispatch(editEmployee(updatedEmployee));
        dispatch(
            addNewTeamRef({ departmentId: departmentId, teamId: newTeamData.id })
        );
        toast.success("Team created successfully");
        router.push("/dashboard");
    };

    return {
        register,
        handleSubmit,
        errors,
        isSubmitted,
        teamLead,
        filterAvailableEmployees,
        filterAvailableLeads,
        selectedOptions,
        setSelectedOptions,
        onSubmit,
    };
}
