import React from "react"
import appwriteService from "../appwrite/config"
import {useNavigate} from "react-router-dom"

function PostCard({$id, title, featuredImage, featuredimage}) {
    const navigate = useNavigate();
    if (!$id || !title) return null;
    const imageId = featuredImage || featuredimage;
    let imageUrl = null;
    try {
        if (imageId) {
            imageUrl = appwriteService.getFilePreview(imageId);
        }
    } catch (e) {
        imageUrl = null;
    }
    return (
        <div className="bg-white dark:bg-gradient-to-br dark:from-gray-800 dark:via-indigo-900 dark:to-purple-900 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-200 p-6 mb-8 cursor-pointer max-w-md mx-auto border border-gray-100 dark:border-gray-700 group" onClick={() => navigate(`/post/${$id}`)}>
            {imageUrl ? (
                <img src={imageUrl} alt={title} className="w-full h-48 object-cover rounded-xl mb-4 group-hover:scale-105 transition-transform duration-200" onError={e => {e.target.onerror=null; e.target.src='/vite.svg';}} />
            ) : (
                <div className="w-full h-48 flex items-center justify-center bg-gray-100 rounded-xl mb-4">
                    <img src="/vite.svg" alt="No image" className="w-16 h-16 opacity-40" />
                </div>
            )}
            <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-pink-500 via-indigo-500 to-purple-500 text-transparent bg-clip-text drop-shadow-lg">{title}</h3>
        </div>
    );
}

export default PostCard
