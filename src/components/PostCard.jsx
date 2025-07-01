import React, { useState, useEffect } from "react"
import appwriteService from "../appwrite/config"
import {useNavigate, useLocation} from "react-router-dom"
import conf from "../conf/conf"

function PostCard({$id, title, featuredImage, featuredimage}) {
    const navigate = useNavigate();
    const location = useLocation();
    const [imageUrl, setImageUrl] = useState(null);
    const [loading, setLoading] = useState(true);
    
    // Function to handle post click with scroll position tracking
    const handlePostClick = () => {
        // Get current scroll position
        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        
        // Navigate to post with scroll position and current path in state
        navigate(`/post/${$id}`, {
            state: {
                scrollPosition,
                fromPath: location.pathname
            }
        });
    };
    
    // Effect to restore scroll position when coming back from a post
    useEffect(() => {
        if (location.state && location.state.scrollPosition) {
            // Set timeout to ensure DOM is ready before scrolling
            setTimeout(() => {
                window.scrollTo(0, location.state.scrollPosition);
            }, 0);
        }
    }, [location.state]);
    
    useEffect(() => {
        if (!$id || !title) return;
        
        const imageId = featuredImage || featuredimage;
        if (imageId) {
            try {
                console.log(`Loading image for post ${$id} with image ID: ${imageId}`);
                
                // Try direct URL construction 
                const directUrl = `${conf.appwriteUrl}/storage/buckets/${conf.appwriteBucketId}/files/${imageId}/preview?project=${conf.appwriteProjectId}`;
                console.log(`Generated direct URL: ${directUrl}`);
                
                setImageUrl(directUrl);
                setLoading(false);
            } catch (e) {
                console.error(`Error generating image URL for post ${$id}:`, e);
                setImageUrl(null);
                setLoading(false);
            }
        } else {
            console.log(`No image ID found for post: ${$id}`);
            setLoading(false);
        }
    }, [$id, title, featuredImage, featuredimage]);
    
    if (!$id || !title) return null;
    
    return (
        <div className="bg-white dark:bg-gradient-to-br dark:from-gray-800 dark:via-indigo-900 dark:to-purple-900 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-200 p-6 mb-8 cursor-pointer border border-gray-200 dark:border-gray-700 group w-full max-w-md mx-auto" onClick={handlePostClick}>
            {loading ? (
                <div className="w-full h-48 flex items-center justify-center bg-gray-100 rounded-xl mb-4">
                    <p className="text-gray-500">Loading image...</p>
                </div>
            ) : imageUrl ? (
                <div className="w-full h-48 overflow-hidden rounded-xl mb-4">
                    <img 
                        src={imageUrl} 
                        alt={title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200" 
                        onError={(e) => {
                            console.error(`Image load error for post ${$id}, trying fallback`);
                            e.target.onerror = null;
                            
                            // Try the download URL as a fallback
                            const imageId = featuredImage || featuredimage;
                            const fallbackUrl = `${conf.appwriteUrl}/storage/buckets/${conf.appwriteBucketId}/files/${imageId}/download?project=${conf.appwriteProjectId}`;
                            console.log(`Trying fallback URL: ${fallbackUrl}`);
                            e.target.src = fallbackUrl;
                            
                            // If that also fails, use a placeholder
                            e.target.onerror = () => {
                                console.error(`Fallback also failed, using placeholder`);
                                e.target.src = '/vite.svg';
                            };
                        }} 
                    />
                </div>
            ) : (
                <div className="w-full h-48 flex items-center justify-center bg-gray-100 rounded-xl mb-4">
                    <img src="/vite.svg" alt="No image" className="w-16 h-16 opacity-40" />
                </div>
            )}
            <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-pink-500 via-indigo-500 to-purple-500 text-transparent bg-clip-text drop-shadow-lg">{title}</h3>
        </div>
    );
}

export default PostCard;
