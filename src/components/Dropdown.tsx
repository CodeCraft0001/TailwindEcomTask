import React from "react";

interface DropdownProps {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
  className?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  min,
  max,
  value,
  onChange,
  className = "",
}) => {
  const options = Array.from(
    { length: max - min + 1 },
    (_, index) => min + index
  );

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(Number(event.target.value));
  };

  return (
    <select
      value={value}
      onChange={handleChange}
      className={`p-2 border border-gray-300 rounded-md bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    >
      {options.map((num) => (
        <option key={num} value={num}>
          {num}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;