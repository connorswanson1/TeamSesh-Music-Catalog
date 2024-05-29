// components/CustomDropdown.js
import React from 'react';
import '../styles/CustomDropdown.css';

const CustomDropdown = ({ label, options, value, onChange }) => {
    return (
        <div className="custom-dropdown">
            <label>{label}</label>
            <select value={value} onChange={onChange}>
                <option value="">All {label}</option>
                {options.map(option => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
        </div>
    );
};

export default CustomDropdown;
