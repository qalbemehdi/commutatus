"use client"
import useAddTeam from '@/hooks/useAddTeam'

import InputField from '../InputField'
import SelectOption from '../SelectOption'
import CTA from '../CTA'
import MultiSelect from '../MultiSelect'
import PreviewTeamMembers from './PreviewTeamMembers'

export default function AddTeamForm() {
    const { register, errors, filterAvailableEmployees, filterAvailableLeads, teamLead, handleSubmit, isSubmitted, onSubmit, selectedOptions, setSelectedOptions } = useAddTeam()
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg space-y-3">
            <InputField
                type="text"
                placeholder="Enter team name"
                label="Team Name"
                register={register('name')}
                error={errors?.name?.message}
            />

            <SelectOption
                label="Team lead"
                register={register("team_lead")}
                error={errors?.team_lead?.message}
            >
                <option value="">Select team lead</option>
                {filterAvailableLeads.map(employee => (
                    <option key={employee.employee_id} value={employee.employee_id}>{employee.name} - {employee.position}</option>
                ))}
            </SelectOption>

            <MultiSelect options={teamLead ? filterAvailableEmployees : []} selectedOptions={selectedOptions} setSelectedOptions={setSelectedOptions} />
            <PreviewTeamMembers selectedOptions={selectedOptions} setSelectedOptions={setSelectedOptions} isLoading={isSubmitted} />

            <div className="flex items-center justify-between ">
                <CTA
                    title="Create Team"
                    type='submit'
                />
            </div>
        </form>
    )
}
