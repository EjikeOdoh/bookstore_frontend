import React from "react";

const CustomInput = ({ label, type = "text", value, onChange }) => {
  return (
    <div className="flex-1  mt-2">
      <p className="font-medium text-sm">{label}</p>

      <input
        required
        type={type}
        className="w-full bg-[#EDEDED] h-10 rounded-sm text-xs px-2"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default CustomInput;
