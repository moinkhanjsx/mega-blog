import React, { useState, useEffect } from "react"
import appwriteService from "../appwrite/config"
import {useNavigate, useLocation} from "react-router-dom"
import conf from "../conf/conf"

function PostCard({$id, title, featuredImage, featuredimage, ...restProps}) {
    const navigate = useNavigate();
    const location = useLocation();
    const [imageUrl, setImageUrl] = useState("");
    const [loading, setLoading] = useState(true);
    const [imageError, setImageError] = useState(false);
    
    // Debug: log all props received by PostCard
    useEffect(() => {
        console.log("[PostCard] props:", { $id, title, featuredImage, featuredimage, ...restProps });
    }, [$id, title, featuredImage, featuredimage, restProps]);

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
            className="w-full h-full group relative flex flex-col transition-all duration-500 cursor-pointer rounded-3xl overflow-hidden transform hover:scale-[1.02] hover:shadow-[0_10px_40px_rgba(125,125,255,0.25)] dark:hover:shadow-[0_10px_40px_rgba(80,80,200,0.3)]"
            data-post-id={$id}
        >
            {/* ...existing code... */}
            {/* Card Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-gray-50/80 to-indigo-50/90 dark:from-gray-800/90 dark:via-gray-900/80 dark:to-indigo-950/90 rounded-3xl transition-colors duration-300"></div>
            
            {/* Glass effect border */}
            <div className="absolute inset-0 rounded-3xl border border-white/30 dark:border-white/5 backdrop-blur-sm"></div>
            
            {/* Hover Effect Gradient - Multi-layered for depth */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-indigo-100/40 via-purple-50/30 to-pink-100/40 dark:from-indigo-900/40 dark:via-purple-900/30 dark:to-pink-900/40 rounded-3xl transition-opacity duration-500"></div>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-tr from-blue-100 via-transparent to-transparent dark:from-blue-800 dark:via-transparent dark:to-transparent rounded-3xl transition-opacity duration-500 delay-75"></div>
            
            {/* Card Content - Above the background gradients */}
            <div className="relative z-10 flex flex-col h-full">
                {/* Image Container */}
                <div className="relative w-full aspect-[4/3] overflow-hidden rounded-t-3xl">
                    {loading ? (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                            <div className="animate-pulse flex items-center justify-center w-full h-full">
                                <div className="w-16 h-16 bg-gray-200/50 dark:bg-gray-700/50 rounded-full"></div>
                            </div>
                        </div>
                    ) : imageUrl && !imageError ? (
                        <>
                            <img 
                                src={imageUrl} 
                                alt={title} 
                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                                onError={handleImageError}
                            />
                            {/* Image Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            
                            {/* Read more badge that appears on hover */}
                            <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:translate-y-0 translate-y-4">
                                <span className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600/90 backdrop-blur-md rounded-full shadow-lg">Read more</span>
                            </div>
                        </>
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
                            <img src="/placeholder.svg" alt="No image available" className="w-1/2 h-1/2 object-contain opacity-50" />
                        </div>
                    )}
                </div>
                
                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between relative z-10">
                    <h3 className="text-xl md:text-2xl font-bold mb-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 text-transparent bg-clip-text group-hover:bg-gradient-to-r group-hover:from-pink-600 group-hover:via-purple-600 group-hover:to-indigo-600 dark:group-hover:from-pink-400 dark:group-hover:via-purple-400 dark:group-hover:to-indigo-400 transition-all duration-500">{title}</h3>
                    
                    <div className="mt-auto">
                        <span className="inline-block px-4 py-1.5 text-sm font-semibold text-indigo-600 dark:text-indigo-300 bg-indigo-100/80 dark:bg-indigo-900/40 rounded-full transition-colors duration-300 group-hover:bg-indigo-200 dark:group-hover:bg-indigo-800/50 backdrop-blur-sm">Explore article</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostCard;
