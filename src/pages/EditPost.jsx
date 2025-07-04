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

  return post ? (
    <div className="min-h-screen py-10 bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-950 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="max-w-2xl w-full mx-auto bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-950 p-10 rounded-3xl shadow-2xl border border-gray-800 animate-fade-in">
        <h2 className="text-4xl font-black text-center mb-8 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-transparent bg-clip-text drop-shadow animate-gradient-x tracking-tight">
          Edit Post
        </h2>
        <div className="mb-6">
          <Input
            label="Title :"
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
          />
        </div>
        <div className="mb-6">
          <Input
            label="Content :"
            type="textarea"
            name="content"
            value={form.content}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="w-full py-3 text-lg rounded-xl bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 text-white font-bold shadow-xl hover:scale-[1.03] hover:shadow-2xl focus:ring-2 focus:ring-indigo-400 transition-all duration-200 mt-4 animate-gradient-x tracking-wide">
          Update Post
        </button>
      </form>
    </div>
  ) : null;
}

export default EditPost;