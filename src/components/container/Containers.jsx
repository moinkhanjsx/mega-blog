import React from "react";

export default function Containers({ children }) {
    return (
        <div className="max-w-5xl mx-auto px-2 sm:px-4 w-full min-h-screen flex flex-col justify-between bg-white dark:bg-gray-900 transition-colors duration-500">
            {children}
        </div>
    );
}
