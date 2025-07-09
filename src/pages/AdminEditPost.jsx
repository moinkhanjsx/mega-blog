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
    <div className="max-w-2xl mx-auto p-4 sm:p-8">
      <div className="mb-4">
        <Link to="/admin" className="inline-block w-full sm:w-auto px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded text-gray-800 font-semibold text-center">← Back to Admin Dashboard</Link>
      </div>
      <h1 className="text-2xl font-bold mb-6">Edit Post (Admin)</h1>
      {loading ? (
        <div>Loading post...</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : (
        <PostForm post={post} />
      )}
    </div>
  );
};

export default AdminEditPost; 