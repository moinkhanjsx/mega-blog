import React from "react";

export default function Button({ 
    children, 
    className = '', 
    isLoading = false, 
    type = "button",
    ...props 
}) {
    return (
        <button
            type={type}
            disabled={props.disabled || isLoading}
            {...props}
            className={`px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-2 rounded-xl bg-gradient-to-r from-indigo-600 via-pink-500 to-purple-600 text-white font-semibold shadow-md hover:shadow-lg hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed text-sm sm:text-base ${className} ${isLoading ? 'relative !text-transparent' : ''}`}
        >
            {children}
            
            {isLoading && (
                <span className="absolute inset-0 flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                </span>
            )}
        </button>
    );
}
