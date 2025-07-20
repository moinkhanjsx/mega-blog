import React from 'react';
import { Link } from 'react-router-dom';
import PostForm from '../components/post-form/PostForm';

const AdminCreatePost = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="mb-4 sm:mb-6">
          <Link 
            to="/admin" 
            className="inline-flex items-center px-3 sm:px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
          >
            ← Back to Admin Dashboard
          </Link>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Create New Post (Admin)</h1>
        <PostForm />
      </div>
    </div>
  );
};

export default AdminCreatePost; 