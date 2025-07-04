import React from "react";

export default function Select({ options = [], label, className = "", ...props }) {
    return (
        <div className="mb-6">
            {label && <label className="block mb-2 text-base font-semibold text-gray-700 dark:text-purple-200">{label}</label>}
            <select 
                {...props} 
                className={`w-full px-4 py-3 rounded-xl border bg-white/90 dark:bg-gradient-to-r dark:from-gray-800 dark:via-indigo-900 dark:to-purple-900 dark:text-purple-200 text-gray-900 shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 border-gray-200 dark:border-indigo-700 transition-all duration-300 backdrop-blur-md ${className}`}
                defaultValue={props.defaultValue || options[0] || ""}
            >
                {options.map((option, idx) => (
                    <option key={idx} value={option}>{option}</option>
                ))}
            </select>
        </div>
    );
}