import React from 'react'

const variants = {
    primary: "bg-blue-500 hover:bg-blue-600 text-white",
    outline: "bg-transparent border-2 border-secondaryText text-secondaryText hover:opacity-70",
    danger: "bg-red-500 hover:bg-red-700 text-white"
}
export default function CTA({ className, type = "button", title, variant = "primary", disabled, onClick }) {
    return (
        <button
            type={type}
            className={`w-full  h-12 py-1 px-4 ${variants[variant]} rounded-lg drop-shadow-lg flex justify-center items-center gap-1 disabled:bg-disabled disabled:text-border  ${className}`}
            disabled={disabled}
            onClick={onClick}
            aria-label={title}
        >
            {title}
        </button>
    )
}
