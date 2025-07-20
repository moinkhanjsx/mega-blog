import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import PostForm from '../components/post-form/PostForm';
import appwriteService from '../appwrite/config';

const AdminEditPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    appwriteService.getPost(id)
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load post');
        setLoading(false);
      });
  }, [id]);

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
        <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Edit Post (Admin)</h1>
        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
            <p className="mt-2 text-gray-600 dark:text-gray-300">Loading post...</p>
          </div>
        ) : error ? (
          <div className="text-red-600 text-center py-8 bg-red-50 dark:bg-red-900/20 rounded-lg">
            {error}
          </div>
        ) : (
          <PostForm post={post} />
        )}
      </div>
    </div>
  );
};

export default AdminEditPost; 