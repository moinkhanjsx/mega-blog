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
            <section className="flex flex-col justify-center items-center min-h-[70vh] bg-white dark:bg-gray-900 rounded-3xl shadow-xl mx-4 mt-10 p-8 animate-fade-in transition-colors duration-300 backdrop-blur-sm">
                <Logo />
            <div className="mt-8 w-full max-w-xs sm:max-w-md md:max-w-lg">
                    <LoadingSpinner text="Loading latest posts..." />
                </div>
            </section>
        )
    }
    if (posts.length === 0) {
        return (
            <section className="flex flex-col items-center justify-center min-h-[70vh] bg-white dark:bg-gray-900 rounded-3xl shadow-xl mx-4 mt-10 p-8 animate-fade-in transition-colors duration-300 backdrop-blur-sm">
                <div className="relative animate-float">
                    <div className="absolute inset-0 bg-indigo-400/20 dark:bg-indigo-500/20 rounded-full blur-3xl"></div>
                    <Logo />
                </div>
                <h1 className="text-5xl font-extrabold text-center mb-2 text-gray-900 dark:text-gray-100 mt-4">Welcome to MegaBlog!</h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-4 text-center max-w-lg">{userData ? 'No posts yet. Be the first to create one!' : 'Login to read and create posts.'}</p>
                {!userData && <p className="text-lg text-indigo-600 dark:text-indigo-400 text-center">Sign up or log in to join the conversation.</p>}
                <div className="flex gap-4 mt-8">
                  <Link to="/login" className="px-8 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-lg hover:shadow-indigo-500/30 hover:scale-105 transition-all duration-200 text-lg">Login</Link>
                  <Link to="/signup" className="px-8 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-lg hover:shadow-indigo-500/30 hover:scale-105 transition-all duration-200 text-lg">Signup</Link>
                </div>
            </section>
        )
    }
    return (
        <section className="max-w-7xl mx-auto mt-6 sm:mt-10 px-2 sm:px-4 py-4 sm:py-8">
            <div className="relative mb-12 sm:mb-16 w-full">
                <div className="relative z-10 flex flex-col items-center">
                    <div className="mb-4 w-full flex justify-center">
                        <Logo />
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-4 text-gray-900 dark:text-gray-100">Latest Posts</h1>
                    <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 text-center max-w-xs sm:max-w-xl px-2">Discover the latest from our community</p>
                </div>
            </div>
            
            {/* Card grid with staggered animation */}
            <div className="grid gap-4 sm:gap-6 md:gap-8 lg:gap-10 md:grid-cols-2 lg:grid-cols-3">
                {posts.slice(0, 6).map((post, index) => (
                    <div 
                        key={post.$id} 
                        className="animate-fade-in-up h-full min-w-0" 
                        style={{ animationDelay: `${index * 0.1}s` }}
                    >
                        <PostCard {...post} />
                    </div>
                ))}
            </div>
            
            <div className="flex justify-center mt-16">
                <Link 
                    to="/all-posts" 
                    className="px-10 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xl tracking-wide flex items-center justify-center transition-all duration-200"
                >
                    View All Posts
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                </Link>
            </div>
        </section>
    )
}

export default Home