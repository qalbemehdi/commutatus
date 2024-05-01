import React from 'react'

export default function ErrorMessage({ message }) {
    return (
        <span className='text-red-500'>{message}</span>
    )
}