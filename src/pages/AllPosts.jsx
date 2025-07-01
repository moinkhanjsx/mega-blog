import React, {useState, useEffect} from 'react'
import appwriteService from "../appwrite/config";
import { PostCard } from "../components";
import { useLocation } from "react-router-dom";

function AllPosts() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    
    useEffect(() => {
        // Restore scroll position if returning from a post
        if (location.state && location.state.scrollPosition) {
            setTimeout(() => {
                window.scrollTo(0, location.state.scrollPosition);
            }, 0);
        }
    }, [location]);
    
    useEffect(() => {
        appwriteService.getPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
            setLoading(false);
        })
    }, [])
    
  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
        <h1 className="text-4xl font-extrabold text-center mb-10 bg-gradient-to-r from-indigo-500 via-pink-500 to-purple-500 text-transparent bg-clip-text drop-shadow-lg animate-gradient-x">All Blog Posts</h1>
        {loading ? (
            <div className="flex justify-center items-center min-h-[40vh]">
                <span className="text-xl text-gray-500 animate-pulse">Loading all posts...</span>
            </div>
        ) : posts.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-[40vh]">
                <p className="text-lg text-gray-500">No posts found.</p>
            </div>
        ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                    <div key={post.$id} className="flex items-stretch w-full">
                        <PostCard {...post} />
                    </div>
                ))}
            </div>
        )}
    </div>
  )
}

export default AllPosts