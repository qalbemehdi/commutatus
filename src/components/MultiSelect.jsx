"use client";
import { useState, useRef } from "react";
import useDebounce from "@/hooks/useDebounce";
import InputField from "./InputField";

export default function MultiSelect({
    selectedOptions,
    setSelectedOptions,
    options,
}) {
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearchTerm = useDebounce(searchTerm, 300);
    const [isFocused, setIsFocused] = useState(false);
    const componentRef = useRef(null);
    const optionListRef = useRef(null);

    const filteredOptions = options?.filter((option) =>
        option.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );

    const isOptionSelected = (option) =>
        selectedOptions.some((opt) => opt.employee_id === option.employee_id);

    const handleOptionSelect = (option) => {
        if (selectedOptions.some((opt) => opt.employee_id === option.employee_id)) {
            setSelectedOptions(
                selectedOptions.filter((opt) => opt.employee_id !== option.employee_id)
            );
        } else {
            setSelectedOptions([...selectedOptions, option]);
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = (e) => {
        setTimeout(() => {
            if (
                !componentRef.current.contains(e.relatedTarget) &&
                !(optionListRef.current && optionListRef.current.contains(e.relatedTarget))
            ) {
                setIsFocused(false);
            }
        }, 100);
    };

    return (
        <div className="w-full space-y-1" ref={componentRef}>
            <div className="relative">
                <InputField
                    type="text"
                    id="search"
                    name="search"
                    label="Select Members"
                    placeholder="Search members"
                    value={searchTerm || ""}
                    onChange={handleSearch}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    autoComplete="off"
                />
                {isFocused && (
                    <ul
                        className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-scroll space-y-1"
                        ref={optionListRef}
                    >
                        {filteredOptions.map((option) => (
                            <li
                                key={option.employee_id}
                                className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${isOptionSelected(option) ? "bg-blue-100" : ""
                                    }`}
                                onClick={() => handleOptionSelect(option)}
                            >
                                {option.name} - {option.position}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}