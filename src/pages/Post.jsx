import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Containers } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const userData = useSelector((state) => state.auth.userData);
    const isAuthor = post && userData ? post.userId === userData.$id : false;

    // Handle back navigation with scroll position preservation
    const handleGoBack = () => {
        // Check if we have state with a scroll position
        if (location.state && location.state.fromPath) {
            // Navigate back to the path we came from
            navigate(location.state.fromPath, { 
                state: { 
                    scrollPosition: location.state.scrollPosition 
                }
            });
        } else {
            // If no saved state, just go back
            navigate(-1);
        }
    };

    // Debug info
    console.log("Post component mounted:", {
        id,
        path: location.pathname,
        userData: !!userData,
        state: location.state
    });

    useEffect(() => {
        const fetchPost = async () => {
            setLoading(true);
            setError(null);
            
            if (!id) {
                console.error("No post ID provided");
                setError("Post ID is missing");
                setLoading(false);
                return;
            }
            
            console.log("Fetching post with ID:", id);
            
            try {
                const postData = await appwriteService.getPost(id);
                console.log("Post data received:", postData);
                
                if (postData) {
                    setPost(postData);
                } else {
                    console.error("Post not found with ID:", id);
                    setError("Post not found");
                }
            } catch (err) {
                console.error("Error fetching post:", err);
                setError("Failed to load post");
            } finally {
                setLoading(false);
            }
        };
        
        fetchPost();
    }, [id]);

    const deletePost = async () => {
        if (!post) return;
        
        try {
            console.log("Deleting post with ID:", post.$id);
            const status = await appwriteService.deletePost(post.$id);
            if (status) {
                console.log("Post deleted, now deleting image:", post.featuredImage || post.featuredimage);
                const imageId = post.featuredImage || post.featuredimage;
                if (imageId) {
                    await appwriteService.deleteFile(imageId);
                }
                navigate("/");
            } else {
                console.error("Failed to delete post");
            }
        } catch (err) {
            console.error("Error deleting post:", err);
        }
    };

    if (loading) {
        return (
            <div>
                <Containers>
                    <p className="text-center">Loading post...</p>
                </Containers>
            </div>
        );
    }
    
    if (error) {
        return (
            <div>
                <Containers>
                    <p className="text-center text-red-500">{error}</p>
                    <div className="text-center mt-4">
                        <Button 
                            onClick={() => navigate("/")}
                            className="px-6 py-2 rounded"
                        >
                            Go Home
                        </Button>
                    </div>
                </Containers>
            </div>
        );
    }

    if (!post) {
        return (
            <div>
                <Containers>
                    <p className="text-center text-red-500">Post data is missing</p>
                    <div className="text-center mt-4">
                        <Button 
                            onClick={() => navigate("/")}
                            className="px-6 py-2 rounded"
                        >
                            Go Home
                        </Button>
                    </div>
                </Containers>
            </div>
        );
    }

    return (
        <div>
            <Containers>
                <div className="mb-4">
                    <Button 
                        onClick={handleGoBack}
                        className="px-4 py-2 rounded flex items-center bg-gray-200 hover:bg-gray-300 text-gray-800 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                        Back
                    </Button>
                </div>
                <div className="w-full flex justify-center mb-6 relative">
                    <div className="w-full max-w-4xl overflow-hidden rounded-2xl shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                        {(post.featuredImage || post.featuredimage) ? (
                            <img
                                src={appwriteService.getFilePreview(post.featuredImage || post.featuredimage, 1200)}
                                alt={post.title}
                                className="w-full h-[400px] object-cover"
                                onLoad={() => console.log("Image loaded successfully")}
                                onError={(e) => {
                                    console.error("Image failed to load - trying download URL");
                                    // Try the download URL as a fallback
                                    e.target.src = appwriteService.getFileDownload(post.featuredImage || post.featuredimage);
                                    e.target.onerror = (e2) => {
                                        console.error("Both preview and download URLs failed");
                                        e2.target.src = 'https://via.placeholder.com/1200x400?text=Image+Not+Available';
                                    };
                                }}
                            />
                        ) : (
                            <div className="w-full h-[400px] flex items-center justify-center bg-gray-100">
                                <img src="/vite.svg" alt="No image" className="w-24 h-24 opacity-40" />
                            </div>
                        )}

                        {isAuthor && (
                            <div className="absolute right-6 top-6">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <Button bgColor="bg-green-500" className="mr-3">
                                        Edit
                                    </Button>
                                </Link>
                                <Button bgColor="bg-red-500" onClick={deletePost}>
                                    Delete
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
                <div className="w-full max-w-4xl mx-auto mb-6 px-4">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">{post.title}</h1>
                </div>
                <div className="browser-css w-full max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 md:p-8 border border-gray-200 dark:border-gray-700">
                    {parse(post.content)}
                </div>
            </Containers>
        </div>
    );
}
