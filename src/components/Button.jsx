import React from "react";

export default function Button({ children, className = '', ...props }) {
    return (
        <button
            {...props}
            className={`px-6 py-2 rounded-xl bg-gradient-to-r from-indigo-600 via-pink-500 to-purple-600 text-white font-semibold shadow-md hover:shadow-lg hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed ${className}`}
        >
            {children}
        </button>
    );
}
