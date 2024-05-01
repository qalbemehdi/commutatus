import React from 'react'
import InputField from '../InputField'

export default function Filter({ filterOptions, handleFilter }) {
    return (
        <div className="mb-4 flex justify-between gap-6">
            <div className="flex-1">
                <InputField
                    type="text"
                    placeholder="Filter by name"
                    value={filterOptions.name}
                    onChange={(e) => handleFilter('name', e.target.value)}
                />
            </div>
            <div className="flex-1">
                <InputField
                    type="text"
                    placeholder="Filter by email"
                    value={filterOptions.email}
                    onChange={(e) => handleFilter('email', e.target.value)}
                />
            </div>
            <div className="flex-1">
                <InputField
                    type="text"
                    placeholder="Filter by phone"
                    value={filterOptions.phone}
                    onChange={(e) => handleFilter('phone', e.target.value)}
                />
            </div>
        </div>
    )
}
