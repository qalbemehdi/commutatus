"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

import useEmployeesData from "@/hooks/useEmployeesData";
import useTeamsData from "@/hooks/useTeamsData";
import useCompanyData from "@/hooks/useCompanyData";

import { teamSchema } from "@/utils/FormSchema";
import {
    filterTeamLeads,
    filterEmployeesByDepartment,
    findTeamByName,
    getDepartmentById,
    getEmployee,
} from "@/utils/helper";
import { editTeam, deleteTeam } from "@/store/slices/teamSlice";
import { deleteTeamRef } from "@/store/slices/companySlice";

export default function useEditTeam() {
    const [selectedOptions, setSelectedOptions] = useState([]);

    const employees = useEmployeesData();
    const teams = useTeamsData();
    const company = useCompanyData();

    const searchParams = useSearchParams();
    const { id } = useParams();
    const router = useRouter();
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors, isSubmitted },
    } = useForm({
        resolver: zodResolver(teamSchema),
    });

    const departmentId = searchParams.get("depId");
    const teamLead = watch("team_lead");

    useEffect(() => {
        const newTeam = teams.find((team) => team.id === id[0]);
        if (id[0] && teams.length > 0) {
            if (newTeam) {
                reset({
                    name: newTeam.name,
                    team_lead: newTeam.team_lead,
                });
            }
        }
    }, [id, teams, reset]);

    const getDepartment = getDepartmentById(company, departmentId);
    const filterLeads = filterTeamLeads(employees, getDepartment?.department);
    const filterEmployee = filterEmployeesByDepartment(
        employees,
        getDepartment?.department,
        teamLead
    );

    const allTeamMembers = teams
        .map((team) => {
            return [team.team_lead, team.team_members];
        })
        .flat(2);

    const filterAvailableEmployees = filterEmployee.filter((emp) => {
        return !allTeamMembers.includes(emp.employee_id) && emp.level > (emp.department === "HR" ? 1 : 2) && emp;
    });

    const currentTeamLead = getEmployee(employees, teamLead);
    const filterAvailableLeads = () => {
        const otherLeads = filterLeads.filter((emp) => {
            return (
                !allTeamMembers.includes(emp.employee_id) && emp.level === 2 && emp
            );
        });

        if (
            currentTeamLead[0] &&
            currentTeamLead[0]?.level === 2 &&
            !otherLeads.find(
                (emp) => emp.employee_id === currentTeamLead[0]?.employee_id
            )
        ) {
            otherLeads.push(currentTeamLead[0]);
        }

        return otherLeads;
    };

    const availableLeads = filterAvailableLeads();

    useEffect(() => {
        const newTeam = teams.find((team) => team.id === id[0]);
        if (newTeam && newTeam.team_members) {
            const uniqueTeamMembers = newTeam.team_members.reduce((acc, memberId) => {
                const isAlreadyAdded = acc.find(
                    (member) => member.employee_id === memberId
                );
                if (!isAlreadyAdded) {
                    const employee = employees.find(
                        (emp) => emp.employee_id === memberId
                    );
                    if (employee) {
                        acc.push(employee);
                    }
                }
                return acc;
            }, []);
            setSelectedOptions(uniqueTeamMembers);
        }
    }, [employees, id, teams]);

    const onSubmit = (data) => {
        const newTeamData = {
            id: id[0],
            name: data.name,
            team_lead: data.team_lead,
            team_members: selectedOptions.map((option) => option.employee_id),
        };
        const findTeam = findTeamByName(teams, newTeamData.name);
        if (findTeam && findTeam?.id !== newTeamData?.id) {
            toast.error("A team with this name already exist");
            return;
        }
        if (newTeamData.team_members.length <= 0) {
            dispatch(deleteTeam(newTeamData.id));
            dispatch(deleteTeamRef({ departmentId, teamId: newTeamData.id }));
            toast.success("Team deleted successfully");
            router.push("/dashboard");
            return;
        }
        dispatch(editTeam(newTeamData));
        toast.success("Team updated successfully");
        router.push("/dashboard");
    };

    return {
        register,
        handleSubmit,
        errors,
        isSubmitted,
        onSubmit,
        availableLeads,
        filterAvailableEmployees,
        selectedOptions,
        teamLead,
        setSelectedOptions,
    };
}
