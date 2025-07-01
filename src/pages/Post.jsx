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

    // Debug info
    console.log("Post component mounted:", {
        id,
        path: location.pathname,
        userData: !!userData
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
                console.log("Post deleted, now deleting image:", post.featuredImage);
                if (post.featuredImage) {
                    await appwriteService.deleteFile(post.featuredImage);
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
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    {post.featuredImage && (
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-xl"
                            onError={(e) => {
                                console.error("Image failed to load");
                                e.target.src = 'https://via.placeholder.com/800x400?text=Image+Not+Available';
                            }}
                        />
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
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                </div>
            </Containers>
        </div>
    );
}
