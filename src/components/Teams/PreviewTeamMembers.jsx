import React from 'react'
import InputField from '../InputField'
import CTA from '../CTA'
import ErrorMessage from '../ErrorMessage'

export default function PreviewTeamMembers({ selectedOptions, setSelectedOptions, isLoading }) {
    const handleRemoveOptions = (id) => {
        setSelectedOptions(selectedOptions.filter((opt) => opt.employee_id !== id))
    }
    return (
        <div>
            {selectedOptions?.length === 0 && isLoading && <ErrorMessage message="Select at least one member to create team" />}
            {
                selectedOptions?.map((item) => {
                    return (
                        <div key={item.employee_id} className="flex items-center gap-2 mb-4" >
                            <div className="w-full">
                                <InputField
                                    type="text"
                                    value={`${item.name} - ${item.position}`}
                                    readOnly
                                />
                            </div>
                            <CTA
                                title="Remove"
                                variant="danger"
                                onClick={() => handleRemoveOptions(item.employee_id)}
                                className="max-w-fit"
                            />
                        </div>
                    )
                })
            }
        </div>
    )
}
