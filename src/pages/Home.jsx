import React, {useEffect, useState} from 'react'
import appwriteService from "../appwrite/config"
import { PostCard, LoadingSpinner } from "../components"
import { useSelector } from "react-redux"
import { Link, useLocation } from "react-router-dom"
import Logo from "../components/Logo"

function Home() {
    const [posts, setPosts] = useState([])
    const userData = useSelector((state) => state.auth.userData);
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
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
                console.log("Posts loaded:", posts.documents.length)
                
                // Log the first post details for debugging
                if (posts.documents.length > 0) {
                    console.log("First post details:", {
                        id: posts.documents[0].$id,
                        title: posts.documents[0].title,
                        featuredImage: posts.documents[0].featuredImage || posts.documents[0].featuredimage
                    });
                }
            }
            setLoading(false);
        }).catch(error => {
            console.error("Error loading posts:", error);
            setLoading(false);
        })
    }, [])
  
    if (loading) {
        return (
            <section className="flex flex-col justify-center items-center min-h-[60vh] bg-gradient-to-br from-indigo-50 via-pink-50 to-purple-50 dark:from-gray-800 dark:via-indigo-900 dark:to-purple-900 rounded-3xl shadow-2xl mx-2 mt-10 p-8 animate-fade-in transition-colors duration-300">
                <Logo />
                <div className="mt-8">
                    <LoadingSpinner text="Loading latest posts..." />
                </div>
            </section>
        )
    }
    if (posts.length === 0) {
        return (
            <section className="flex flex-col items-center justify-center min-h-[60vh] bg-gradient-to-br from-indigo-50 via-pink-50 to-purple-50 dark:from-gray-800 dark:via-indigo-900 dark:to-purple-900 rounded-3xl shadow-2xl mx-2 mt-10 p-8 animate-fade-in transition-colors duration-300">
                <Logo />
                <h1 className="text-5xl font-extrabold text-center mb-2 bg-gradient-to-r from-pink-500 via-indigo-500 to-purple-500 text-transparent bg-clip-text drop-shadow-lg animate-gradient-x mt-4">Welcome to MegaBlog!</h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">{userData ? 'No posts yet. Be the first to create one!' : 'Login to read and create posts.'}</p>
                {!userData && <p className="text-lg text-indigo-600 dark:text-indigo-400">Sign up or log in to join the conversation.</p>}
                <div className="flex gap-4 mt-6">
                  <Link to="/login" className="px-8 py-3 rounded-xl bg-indigo-500 text-white font-bold shadow-xl hover:scale-105 hover:bg-indigo-600 transition-all duration-200 text-lg">Login</Link>
                  <Link to="/signup" className="px-8 py-3 rounded-xl bg-pink-500 text-white font-bold shadow-xl hover:scale-105 hover:bg-pink-600 transition-all duration-200 text-lg">Signup</Link>
                </div>
            </section>
        )
    }
    return (
        <section className="max-w-5xl mx-auto mt-10 bg-gradient-to-br from-indigo-50 via-pink-50 to-purple-50 dark:from-gray-800 dark:via-indigo-900 dark:to-purple-900 rounded-3xl shadow-2xl p-8 animate-fade-in transition-colors duration-300">
            <div className="flex flex-col items-center mb-10">
                <Logo />
                <h1 className="text-5xl font-extrabold text-center mt-2 mb-2 bg-gradient-to-r from-pink-500 via-indigo-500 to-purple-500 text-transparent bg-clip-text drop-shadow-lg animate-gradient-x">Latest Posts</h1>
                <p className="text-xl text-gray-600 dark:text-gray-300">Discover the latest from our community</p>
            </div>
            <div className="grid gap-8 md:gap-10 md:grid-cols-2 lg:grid-cols-3">
                {posts.slice(0, 6).map((post) => (
                    <div key={post.$id} className="animate-fade-in-up flex items-stretch w-full">
                        <PostCard {...post} />
                    </div>
                ))}
            </div>
            <div className="flex justify-center mt-10">
                <Link to="/all-posts" className="px-10 py-4 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-bold shadow-2xl hover:scale-105 hover:shadow-2xl transition-all duration-200 text-xl tracking-wide">View All Posts</Link>
            </div>
        </section>
    )
}

export default Home