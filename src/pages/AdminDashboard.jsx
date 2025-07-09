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
    <div className="p-4 sm:p-8 max-w-full">
      <h1 className="text-3xl font-bold mb-4">Admin Panel</h1>
      <p>Welcome, Admin! Here you can manage posts, users, and more.</p>
      <Link
        to="/admin/create-post"
        className="mt-6 mb-4 inline-block px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition w-full sm:w-auto text-center"
      >
        Create New Post
      </Link>
      {loading ? (
        <div>Loading posts...</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow mt-4">
          <table className="min-w-full bg-white dark:bg-gray-900">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800">
                <th className="p-2 border">Title</th>
                <th className="p-2 border hidden sm:table-cell">Status</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.$id} className="border-b">
                  <td className="p-2 border break-words max-w-xs">{post.title}</td>
                  <td className="p-2 border hidden sm:table-cell">{post.status}</td>
                  <td className="p-2 border">
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Link
                        to={`/admin/edit-post/${post.$id}`}
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-center"
                      >
                        Edit
                      </Link>
                      <button
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-center"
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
      )}
    </div>
  );
};

export default AdminDashboard; 