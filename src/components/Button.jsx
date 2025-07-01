import React from "react";

export default function Button({ children, className = '', ...props }) {
    return (
        <button {...props} className={`px-6 py-2 rounded-lg bg-gradient-to-r from-pink-500 via-indigo-500 to-purple-500 text-white font-bold shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed ${className}`}>
            {children}
        </button>
    );
}
