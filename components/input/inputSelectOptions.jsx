import React from "react";

const SelectComponent = ({ options, defaultValue }) => {
  return (
    <select defaultValue={defaultValue}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default SelectComponent;
