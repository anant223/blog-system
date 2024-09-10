import React, { useId } from "react";

const Input = React.forwardRef(function Input(
  { label, type = "text", className = "input input-bordered", ...props },
  ref
) {
  const id = useId();

  return (
    <div className="w-full my-6">
      {label && (
        <label
          htmlFor={label}
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          <span className="label-text py-8 my-2">{label}</span>
        </label>
      )}
      <input type={type} className={className} ref={ref} id={id} {...props} />
    </div>
  );
});

export default Input;
