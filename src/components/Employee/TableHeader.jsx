import React from 'react';

export default function TableHeader({ columns }) {
    return (
        <thead>
            <tr className='bg-gray-50'>
                {columns.map((col, index) => (
                    <th
                        key={`${index}-${col}`}
                        scope="col"
                        className="px-6 py-3 text-left text-md font-medium text-gray-500 uppercase tracking-wider"
                    >
                        {col}
                    </th>
                ))}
            </tr>
        </thead>
    )
}
