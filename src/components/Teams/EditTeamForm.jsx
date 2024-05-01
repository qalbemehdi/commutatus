"use client"
import useEditTeam from "@/hooks/useEditTeam";

import InputField from "../InputField";
import SelectOption from "../SelectOption";
import CTA from "../CTA";;
import PreviewTeamMembers from "./PreviewTeamMembers";
import MultiSelect from "../MultiSelect";

export default function EditTeamForm() {
    const { register, onSubmit, handleSubmit, errors, availableLeads, filterAvailableEmployees, isSubmitted, selectedOptions, setSelectedOptions, teamLead } = useEditTeam();
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg space-y-3">
            <InputField
                type="text"
                placeholder="Enter team name"
                label="Team Name"
                register={register("name")}
                error={errors?.name?.message}
            />

            <SelectOption
                label="Team lead"
                register={register("team_lead")}
                error={errors?.team_lead?.message}
            >
                <option value="">Select team lead</option>
                {availableLeads.map((employee) => (
                    <option key={employee.employee_id} value={employee.employee_id}>
                        {employee.name} - {employee.position}
                    </option>
                ))}
            </SelectOption>
            <MultiSelect
                options={teamLead ? filterAvailableEmployees : []}
                selectedOptions={selectedOptions}
                setSelectedOptions={setSelectedOptions}
            />
            <PreviewTeamMembers
                selectedOptions={selectedOptions}
                setSelectedOptions={setSelectedOptions}
                isLoading={isSubmitted}
            />

            <div className="flex items-center justify-between mt-4">
                <CTA title="Update Team" type="submit" />
            </div>
        </form>
    )
}
