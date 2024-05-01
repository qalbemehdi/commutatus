import React from 'react'

export default function Employee({ id, name, email, phone, position }) {
    return (
        <div className='border border-black p-5 rounded'>
            <h2 className='text-xl font-bold'>{name}</h2>
            <p className='text-lg'>{email}</p>
            <p className='text-lg'>{phone}</p>
            <p>Employee ID: {id}</p>
            <p>Position: {position}</p>
        </div>
    )
}
