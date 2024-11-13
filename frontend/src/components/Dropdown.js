
import React from 'react';

const DropdownSelector = ({ options, selectedOption, onChange }) => (
  <div className="dropdown-selector">
    <label htmlFor="repoCount">Repositories per page:</label>
    <select id="repoCount" value={selectedOption} onChange={onChange}>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

export default DropdownSelector;
