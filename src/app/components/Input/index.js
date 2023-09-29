import React from "react";

const Input = (props) => {
  const { label, errorMessage, ...inputProps } = props;
  return (
    <div className="flex flex-col w-[350px] flex-grow">
      <label htmlFor="email">{label}</label>
      <input
        name="email"
        type="email"
        {...inputProps}
        className="outline-main-100 border-2 border-gray-200 py-3 px-4  rounded-full"
      />
      <span className="text-red-500">{errorMessage}</span>
    </div>
  );
};

export default Input;
