import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import appwriteService from '../appwrite/config';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const userData = useSelector((state) => state.auth.userData);
  const isAdmin = userData && userData.labels && userData.labels.includes('admin');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await appwriteService.getPosts();
      setPosts(res.documents || []);
    } catch (err) {
      setError('Failed to load posts');
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isAdmin) fetchPosts();
  }, [isAdmin]);

  const handleDelete = async (postId) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    try {
      await appwriteService.deletePost(postId);
      setPosts(posts.filter((p) => p.$id !== postId));
    } catch (err) {
      alert('Failed to delete post');
    }
  };

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-4">Admin Panel</h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Welcome, Admin! Here you can manage posts, users, and more.</p>
        </div>
        
        <div className="mb-6">
          <Link
            to="/admin/create-post"
            className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-green-600 text-white text-sm sm:text-base rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200"
          >
            Create New Post
          </Link>
        </div>
        
        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
            <p className="mt-2 text-gray-600 dark:text-gray-300">Loading posts...</p>
          </div>
        ) : error ? (
          <div className="text-red-600 text-center py-8 bg-red-50 dark:bg-red-900/20 rounded-lg">
            {error}
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {posts.map((post) => (
                    <tr key={post.$id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white max-w-xs truncate">
                        {post.title}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          post.status === 'active' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                        }`}>
                          {post.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <Link
                            to={`/admin/edit-post/${post.$id}`}
                            className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                          >
                            Edit
                          </Link>
                          <button
                            className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                            onClick={() => handleDelete(post.$id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden">
              {posts.map((post) => (
                <div key={post.$id} className="border-b border-gray-200 dark:border-gray-700 p-4 hover:bg-gray-50 dark:hover:bg-gray-700">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white flex-1 pr-2">
                      {post.title}
                    </h3>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      post.status === 'active' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                    }`}>
                      {post.status}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <Link
                      to={`/admin/edit-post/${post.$id}`}
                      className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                    >
                      Edit
                    </Link>
                    <button
                      className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                      onClick={() => handleDelete(post.$id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {posts.length === 0 && !loading && (
              <div className="text-center py-12">
                <div className="text-gray-400 dark:text-gray-500 mb-4">
                  <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No posts found</h3>
                <p className="text-gray-500 dark:text-gray-400">Get started by creating your first post.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard; 