import React, { useId } from "react";

const Input = React.forwardRef(function Input(
  { label, type = "text", className = "input input-bordered", ...props },
  ref
) {
  const id = useId();

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="px-1 py-10">
          <span className="label-text">{label}</span>
        </label>
      )}
      <input
        type={type}
        className={className}
        ref={ref}
        id={id}
        {...props}
      />
    </div>
  );
});

export default Input;
