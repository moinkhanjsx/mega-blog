import React, { useEffect, useState } from "react";
import ConfirmDialog from "../components/ConfirmDialog";
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
    const isAuthor = post && userData ? post.userid === userData.$id : false;
    useEffect(() => {
        console.log('[DEBUG] post object:', post);
        if (post) {
            console.log('[DEBUG] post fields:', Object.keys(post));
        }
        console.log('[DEBUG] userData:', userData);
        console.log('[DEBUG] isAuthor:', isAuthor);
    }, [post, userData, isAuthor]);

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

    const [showConfirm, setShowConfirm] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const deletePost = async () => {
        if (!post) return;
        setDeleting(true);
        try {
            const status = await appwriteService.deletePost(post.$id);
            if (status) {
                const imageId = post.featuredImage || post.featuredimage;
                if (imageId) {
                    await appwriteService.deleteFile(imageId);
                }
                navigate("/");
            } else {
                alert("Failed to delete post.");
            }
        } catch (err) {
            alert("Error deleting post.");
        } finally {
            setDeleting(false);
            setShowConfirm(false);
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
            {/* ...existing code... */}
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
                    <div className="w-full max-w-4xl overflow-visible rounded-3xl shadow-2xl bg-gradient-to-br from-white/90 via-gray-50/80 to-indigo-50/90 dark:from-gray-900/90 dark:via-gray-950/80 dark:to-indigo-950/90 border border-white/30 dark:border-white/10 backdrop-blur-md p-6 md:p-10 flex flex-col items-center relative">
                        <div className="absolute inset-0 rounded-3xl border border-white/30 dark:border-white/5 pointer-events-none"></div>
                        {(post.featuredImage || post.featuredimage) ? (
                            <div className="relative z-10 flex justify-center w-full">
                                <img
                                    src={appwriteService.getFilePreview(post.featuredImage || post.featuredimage, 1200)}
                                    alt={post.title}
                                    className="w-full max-w-xl h-[220px] md:h-[260px] object-cover rounded-2xl shadow-lg border border-white/40 dark:border-white/10 bg-white/60 dark:bg-gray-900/60 backdrop-blur-md"
                                    onLoad={() => console.log('Image loaded successfully')}
                                    onError={(e) => {
                                        console.error('Image failed to load - trying download URL');
                                        e.target.src = appwriteService.getFileDownload(post.featuredImage || post.featuredimage);
                                        e.target.onerror = (e2) => {
                                            console.error('Both preview and download URLs failed');
                                            e2.target.src = 'https://via.placeholder.com/800x300?text=Image+Not+Available';
                                        };
                                    }}
                                />
                            </div>
                        ) : (
                            <div className="relative z-10 w-full h-[220px] md:h-[260px] flex items-center justify-center bg-gradient-to-br from-gray-100/80 to-indigo-100/60 dark:from-gray-800/80 dark:to-indigo-950/60 rounded-2xl">
                                <img src="/vite.svg" alt="No image" className="w-20 h-20 opacity-40" />
                            </div>
                        )}

                        {isAuthor && (
                            <div className="absolute right-6 top-6 z-20 flex flex-col gap-3 items-end">
                                <Link to={`/edit-post/${post.$id}`} className="w-full">
                                    <Button bgColor="bg-green-500" className="w-full">
                                        Edit
                                    </Button>
                                </Link>
                                <Button bgColor="bg-red-500" onClick={() => setShowConfirm(true)} disabled={deleting} className="w-full">
                                    {deleting ? "Deleting..." : "Delete"}
                                </Button>
                                <ConfirmDialog
                                    open={showConfirm}
                                    title="Delete Post?"
                                    message="Are you sure you want to delete this post? This action cannot be undone."
                                    onConfirm={deletePost}
                                    onCancel={() => setShowConfirm(false)}
                                />
                            </div>
                        )}
                    </div>
                </div>
                <div className="w-full max-w-4xl mx-auto mb-6 px-4">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">{post.title}</h1>
                </div>
                <div className="w-full max-w-4xl mx-auto relative rounded-3xl shadow-xl p-6 md:p-10 border border-white/10 bg-gradient-to-br from-indigo-700/90 via-purple-900/80 to-gray-900/90 dark:from-indigo-900/90 dark:via-purple-950/80 dark:to-black/90 backdrop-blur-md transition-colors duration-300">
                    {/* Glass effect border */}
                    <div className="absolute inset-0 rounded-3xl border border-white/10"></div>
                    <div className="relative z-10 prose prose-lg max-w-none text-white leading-relaxed">
                        {parse(post.content)}
                    </div>
                </div>
            </Containers>
        </div>
    );
}
