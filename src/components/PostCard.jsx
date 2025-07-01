import React from "react"
import appwriteService from "../appwrite/config"
import {useNavigate} from "react-router-dom"

function PostCard({$id, title, featuredImage, featuredimage}) {
    const navigate = useNavigate();
    if (!$id || !title) return null;
    const imageId = featuredImage || featuredimage;
    return (
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-200 p-6 mb-8 cursor-pointer max-w-md mx-auto border border-gray-100 dark:border-gray-800 group" onClick={() => navigate(`/post/${$id}`)}>
            {imageId && (
                <img src={appwriteService.getFilePreview(imageId)} alt={title} className="w-full h-48 object-cover rounded-xl mb-4 group-hover:scale-105 transition-transform duration-200" />
            )}
            <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-pink-500 via-indigo-500 to-purple-500 text-transparent bg-clip-text drop-shadow-lg">{title}</h3>
        </div>
    );
}

export default PostCard
