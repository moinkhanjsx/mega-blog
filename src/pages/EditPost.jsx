import React, { useEffect, useState } from 'react';
import appwriteService from "../appwrite/config";
import { useNavigate, useParams } from 'react-router-dom';
import { Input } from "../components";

function EditPost() {
  const [post, setPost] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      appwriteService.getPost(id).then((post) => {
        if (post) {
          setPost(post);
        }
      });
    } else {
      navigate('/');
    }
  }, [id, navigate]);

  const [form, setForm] = useState({ title: '', content: '' });
  useEffect(() => {
    if (post) {
      setForm({ title: post.title || '', content: post.content || '' });
    }
  }, [post]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim()) return;
    try {
      await appwriteService.updatePost(post.$id, {
        title: form.title,
        content: form.content,
      });
      navigate(`/post/${post.$id}`);
    } catch (err) {
      alert('Failed to update post.');
    }
  };

  return (
    <div className="min-h-screen py-4 sm:py-10 bg-white dark:bg-gray-900 flex items-center justify-center px-2 sm:px-4">
      <div className="w-full max-w-3xl">
        <PostForm />
      </div>
    </div>
  )
}

export default EditPost;