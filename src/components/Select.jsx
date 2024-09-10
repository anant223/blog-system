import React, { useId } from "react";

function Select({ options, label, className, ...props }, ref) {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={label}
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          <span className="label-text py-8 my-2">{label}</span>
        </label>
      )}
      <select
        {...props}
        id={id}
        ref={ref}
        className={`px-3 py-2 rounded-lg bg-transparent text-white outline-none focus:bg-gray-50 
        duration-200 border border-gray-500 w-full ${className}`}
      >
        {options?.map((option) => (
          <option
            className=" bg-transparent text-black"
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default React.forwardRef(Select);
