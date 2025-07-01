import React, {useEffect, useState} from 'react'
import appwriteService from "../appwrite/config";
import { PostCard } from "../components";
import { useSelector } from "react-redux";

function Home() {
    const [posts, setPosts] = useState([])
    const userData = useSelector((state) => state.auth.userData);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
            setLoading(false);
        })
    }, [])
  
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[40vh]">
                <span className="text-xl text-gray-500 animate-pulse">Loading latest posts...</span>
            </div>
        )
    }
    if (posts.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[40vh]">
                <h1 className="text-3xl font-bold text-gray-700 mb-2">Welcome to MegaBlog!</h1>
                <p className="text-lg text-gray-500 mb-4">{userData ? 'No posts yet. Be the first to create one!' : 'Login to read and create posts.'}</p>
                {!userData && <p className="text-md text-indigo-600">Sign up or log in to join the conversation.</p>}
            </div>
        )
    }
    return (
        <div className="max-w-3xl mx-auto mt-10">
            <h1 className="text-4xl font-extrabold text-center mb-8 bg-gradient-to-r from-pink-500 via-indigo-500 to-purple-500 text-transparent bg-clip-text drop-shadow-lg animate-gradient-x">Latest Posts</h1>
            <div className="grid gap-8">
                {posts.slice(0, 3).map((post) => (
                    <div key={post.$id}>
                        <PostCard {...post} />
                    </div>
                ))}
            </div>
            <div className="flex justify-center mt-8">
                <a href="/all-posts" className="px-6 py-2 rounded-lg bg-indigo-500 text-white font-bold shadow-lg hover:scale-105 hover:bg-indigo-600 transition-all duration-200">View All Posts</a>
            </div>
        </div>
    )
}

export default Home