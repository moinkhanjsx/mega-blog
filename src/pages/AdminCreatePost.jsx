import React from 'react';
import { Link } from 'react-router-dom';
import PostForm from '../components/post-form/PostForm';

const AdminCreatePost = () => {
  return (
    <div className="max-w-2xl mx-auto p-8">
      <div className="mb-4">
        <Link to="/admin" className="inline-block px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded text-gray-800 font-semibold">← Back to Admin Dashboard</Link>
      </div>
      <h1 className="text-2xl font-bold mb-6">Create New Post (Admin)</h1>
      <PostForm />
    </div>
  );
};

export default AdminCreatePost; 