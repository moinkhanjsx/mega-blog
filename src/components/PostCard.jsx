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
            className="h-full w-full group relative flex flex-col transition-all duration-500 cursor-pointer rounded-3xl overflow-hidden transform hover:scale-[1.02] hover:shadow-[0_10px_40px_rgba(125,125,255,0.25)] dark:hover:shadow-[0_10px_40px_rgba(80,80,200,0.3)] min-w-0 max-w-full sm:min-w-[220px] md:min-w-[260px] lg:min-w-[280px] xl:min-w-[320px] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-xl"
            style={{ touchAction: 'manipulation' }}
            data-post-id={$id}
        >
            {/* ...existing code... */}
            {/* Card Background Solid */}
            <div className="absolute inset-0 bg-white dark:bg-gray-900 rounded-3xl transition-colors duration-300"></div>
            {/* Glass effect border */}
            <div className="absolute inset-0 rounded-3xl border border-white/30 dark:border-white/5 backdrop-blur-sm"></div>
            {/* Removed Hover Effect Gradient */}
            
            {/* Card Content - Above the background gradients */}
            <div className="relative z-10 flex flex-col h-full min-h-0">
                {/* Image Container */}
                <div className="relative w-full aspect-[4/3] overflow-hidden rounded-t-3xl min-h-[120px] xs:min-h-[140px] sm:min-h-[160px] md:min-h-[180px] lg:min-h-[200px]">
                    {loading ? (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                            <div className="animate-pulse flex items-center justify-center w-full h-full">
                                <div className="w-10 h-10 sm:w-16 sm:h-16 bg-gray-200/50 dark:bg-gray-700/50 rounded-full"></div>
                            </div>
                        </div>
                    ) : imageUrl && !imageError ? (
                        <>
                            <img 
                                src={imageUrl} 
                                alt={title} 
                                className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-in-out select-none pointer-events-none"
                                onError={handleImageError}
                                draggable={false}
                                loading="lazy"
                            />
                            {/* Image Overlay Solid (removed gradient) */}
                            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            
                            {/* Read more badge that appears on hover */}
                            <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:translate-y-0 translate-y-2 sm:group-hover:translate-y-0 sm:translate-y-4">
                                <span className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold text-white bg-indigo-600/90 backdrop-blur-md rounded-full shadow-lg">Read more</span>
                            </div>
                        </>
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-900">
                            <img src="/placeholder.svg" alt="No image available" className="w-1/3 h-1/3 sm:w-1/2 sm:h-1/2 object-contain opacity-50" draggable={false} />
                        </div>
                    )}
                </div>
                
                {/* Content */}
                <div className="p-3 sm:p-4 md:p-6 flex-1 flex flex-col justify-between relative z-10 min-h-0">
                    <h3 className="text-base xs:text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2 text-gray-900 dark:text-gray-100 transition-all duration-500 line-clamp-2">{title}</h3>
                    <div className="mt-auto">
                        <span className="inline-block px-2 py-0.5 sm:px-3 sm:py-1 text-xs sm:text-sm font-semibold text-indigo-600 dark:text-indigo-300 bg-indigo-100/80 dark:bg-indigo-900/40 rounded-full transition-colors duration-300 backdrop-blur-sm">Explore article</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostCard;
