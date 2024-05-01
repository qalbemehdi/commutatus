import React from 'react';
import ErrorMessage from './ErrorMessage';

export default function SelectOption({ label, data, register, error, placeHolder = "Select a category", children, ...rest }) {
  return (
    <div className=" flex flex-col gap-1">
      {label && <label htmlFor={label} className="text-label_text">{label}</label>}
      <select
        id={label}
        {...register}
        {...rest}
        className={`appearance-none border rounded-lg w-full py-2 h-12 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline disabled:opacity-80 disabled:cursor-not-allowed ${error ? "border-red-500 focus:border-red-500" : "focus:border-blue-400"
          }  rounded-lg `}
      >
        {!children && <option value="">{placeHolder}</option>}
        {!children && data?.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
        {children && children}
      </select>
      {error && <ErrorMessage message={error} />}
    </div>
  );
}