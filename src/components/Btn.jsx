import React from "react";

export default function Btn({
  type = "button",
  className = "btn btn-primary",
  bgColor ="bg-blue-600",
  name,
  ...props
}) {
  return (
    <button
      className={ `text-white ${bgColor} ${className}`}
      {...props}
    >
      {name}
    </button>
  );
}
