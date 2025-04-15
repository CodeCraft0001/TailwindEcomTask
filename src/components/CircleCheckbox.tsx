import React, { useState } from "react";

interface CircleCheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  id?: string;
}

const CircleCheckbox: React.FC<CircleCheckboxProps> = ({
  checked = false,
  onChange,
  label,
  id = "circle-checkbox",
}) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleToggle = () => {
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    if (onChange) {
      onChange(newChecked);
    }
  };

  return (
    <div className="flex items-center space-x-3">
      <label htmlFor={id} className="flex items-center cursor-pointer">
        <input
          type="checkbox"
          id={id}
          checked={isChecked}
          onChange={handleToggle}
          className="sr-only"
          aria-checked={isChecked}
        />
        <div
          className={`relative w-3 h-3 rounded-full border-2 transition-all duration-200 ${
            isChecked
              ? "border-blue-600 bg-blue-600"
              : "border-gray-300 bg-white"
          }`}
        >
          {isChecked && (
            <svg
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </div>
      </label>
      {label && (
        <span className="text-gray-700 text-sm font-medium">{label}</span>
      )}
    </div>
  );
};

export default CircleCheckbox;