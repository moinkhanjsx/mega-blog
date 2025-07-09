import React from 'react';

const NotAuthorized = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh]">
    <h1 className="text-4xl font-bold text-red-600 mb-4">Not Authorized</h1>
    <p className="text-lg text-gray-700 dark:text-gray-300">You do not have permission to access this page.</p>
  </div>
);

export default NotAuthorized; 