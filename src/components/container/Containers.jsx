import React from "react";

export default function Containers({ children }) {
    return (
        <div className="max-w-5xl mx-auto px-4 w-full min-h-screen flex flex-col justify-between bg-gradient-to-br from-gray-50 via-indigo-50 to-pink-50 dark:from-gray-900 dark:via-indigo-900 dark:to-pink-900 transition-colors duration-500">
            {children}
        </div>
    );
}
