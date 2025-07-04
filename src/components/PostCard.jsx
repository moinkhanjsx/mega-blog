import React, { useState, useEffect } from "react"
import appwriteService from "../appwrite/config"
import {useNavigate, useLocation} from "react-router-dom"
import conf from "../conf/conf"

function PostCard({$id, title, featuredImage, featuredimage}) {
    const navigate = useNavigate();
    const location = useLocation();
    const [imageUrl, setImageUrl] = useState("");
    const [loading, setLoading] = useState(true);
    const [imageError, setImageError] = useState(false);
    
    // Function to handle post click with scroll position tracking
    const handlePostClick = () => {
        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
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
            setTimeout(() => {
                window.scrollTo(0, location.state.scrollPosition);
            }, 0);
        }
    }, [location.state]);
    
    // Effect to generate image URL
    useEffect(() => {
        if (!$id || !title) {
            setLoading(false);
            return;
        }
        
        const imageId = featuredImage || featuredimage;
        if (!imageId) {
            console.log(`No image ID found for post: ${title}`);
            setLoading(false);
            return;
        }
        
        // Log the image ID
        console.log(`Post "${title}" image ID: ${imageId}`);
        
        // Direct URL construction - simplest and most reliable
        const directUrl = `${conf.appwriteUrl}/storage/buckets/${conf.appwriteBucketId}/files/${imageId}/view?project=${conf.appwriteProjectId}`;
        setImageUrl(directUrl);
        setLoading(false);
        
    }, [$id, title, featuredImage, featuredimage]);

    const handleImageError = () => {
        console.error(`Image failed to load for post: ${title}`);
        setImageError(true);
    };

    return (
        <div 
            onClick={handlePostClick} 
            className="w-full rounded-xl overflow-hidden shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
        >
            {loading ? (
                <div className="w-full h-48 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-t-xl">
                    <div className="animate-pulse w-16 h-16 bg-gray-200 dark:bg-gray-600 rounded-full"></div>
                </div>
            ) : imageUrl && !imageError ? (
                <div className="w-full aspect-video overflow-hidden">
                    <img 
                        src={imageUrl} 
                        alt={title} 
                        className="w-full h-full object-cover"
                        onError={handleImageError}
                    />
                </div>
            ) : (
                <div className="w-full aspect-video flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-t-xl">
                    <img src="/placeholder.svg" alt="No image available" className="w-full h-full object-cover opacity-70" />
                </div>
            )}
            <div className="p-4">
                <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-pink-500 via-indigo-500 to-purple-500 text-transparent bg-clip-text drop-shadow-lg">{title}</h3>
            </div>
        </div>
    );
}

export default PostCard;
