"use client";
import React, { useState } from "react";
import ErrorMessage from "./ErrorMessage";


export default function InputField({
    type,
    placeholder,
    register,
    error,
    label,
    ...rest
}) {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
        setIsFocused(!isFocused);
    };


    return (
        <div className="flex flex-col gap-1">
            {label && <label htmlFor={label} className="">{label}</label>}
            <div className="flex relative flex-col w-full overflow-hidden">
                <input
                    type={type}
                    placeholder={placeholder}
                    className={`flex py-1 w-full px-4 h-12 outline-none border  ${error ? "border-red-500 focus:border-red-500" : "focus:border-blue-400"
                        }  rounded-lg `}
                    {...register}
                    onFocus={handleFocus}
                    onBlur={handleFocus}
                    {...rest}
                />
            </div>
            {error && <ErrorMessage message={error} />}
        </div>
    );
}