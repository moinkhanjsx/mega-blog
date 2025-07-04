import React from 'react';

export default function LoadingSpinner({ text = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="w-12 h-12 rounded-full border-4 border-indigo-200 border-t-indigo-500 dark:border-gray-700 dark:border-t-indigo-400 animate-spin"></div>
      <span className="text-gray-600 dark:text-gray-300 font-medium">{text}</span>
    </div>
  );
}
