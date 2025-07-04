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
            <section className="flex flex-col justify-center items-center min-h-[70vh] bg-gradient-to-br from-indigo-50/70 via-white to-pink-50/70 dark:from-gray-900/70 dark:via-gray-900 dark:to-indigo-950/70 rounded-3xl shadow-xl mx-4 mt-10 p-8 animate-fade-in transition-colors duration-300 backdrop-blur-sm">
                <Logo />
                <div className="mt-8">
                    <LoadingSpinner text="Loading latest posts..." />
                </div>
            </section>
        )
    }
    if (posts.length === 0) {
        return (
            <section className="flex flex-col items-center justify-center min-h-[70vh] bg-gradient-to-br from-indigo-50/70 via-white to-pink-50/70 dark:from-gray-900/70 dark:via-gray-900 dark:to-indigo-950/70 rounded-3xl shadow-xl mx-4 mt-10 p-8 animate-fade-in transition-colors duration-300 backdrop-blur-sm">
                <div className="relative animate-float">
                    <div className="absolute inset-0 bg-indigo-400/20 dark:bg-indigo-500/20 rounded-full blur-3xl"></div>
                    <Logo />
                </div>
                <h1 className="text-5xl font-extrabold text-center mb-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 text-transparent bg-clip-text animate-gradient-x mt-4">Welcome to MegaBlog!</h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-4 text-center max-w-lg">{userData ? 'No posts yet. Be the first to create one!' : 'Login to read and create posts.'}</p>
                {!userData && <p className="text-lg text-indigo-600 dark:text-indigo-400 text-center">Sign up or log in to join the conversation.</p>}
                <div className="flex gap-4 mt-8">
                  <Link to="/login" className="px-8 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-lg hover:shadow-indigo-500/30 hover:scale-105 transition-all duration-200 text-lg">Login</Link>
                  <Link to="/signup" className="px-8 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold shadow-lg hover:shadow-pink-500/30 hover:scale-105 transition-all duration-200 text-lg">Signup</Link>
                </div>
            </section>
        )
    }
    return (
        <section className="max-w-7xl mx-auto mt-10 px-4 py-8">
            <div className="relative mb-16">
                {/* Animated background elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-10 left-1/4 w-96 h-96 bg-gradient-to-br from-indigo-200/50 via-purple-200/50 to-pink-200/50 dark:from-indigo-900/20 dark:via-purple-900/20 dark:to-pink-900/20 rounded-full filter blur-3xl opacity-70 animate-float"></div>
                    <div className="absolute -top-20 right-1/4 w-72 h-72 bg-gradient-to-br from-pink-200/50 via-purple-200/50 to-indigo-200/50 dark:from-pink-900/20 dark:via-purple-900/20 dark:to-indigo-900/20 rounded-full filter blur-3xl opacity-70 animate-float" style={{ animationDelay: '1s' }}></div>
                    <div className="absolute top-40 left-1/3 w-48 h-48 bg-gradient-to-br from-blue-200/30 to-teal-200/30 dark:from-blue-900/10 dark:to-teal-900/10 rounded-full filter blur-3xl opacity-60 animate-float" style={{ animationDelay: '1.5s' }}></div>
                </div>
                
                <div className="relative z-10 flex flex-col items-center">
                    <div className="mb-4 animate-float">
                        <Logo />
                    </div>
                    <h1 className="text-5xl font-extrabold text-center mb-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 text-transparent bg-clip-text animate-gradient-x">Latest Posts</h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 text-center max-w-2xl">Discover the latest from our community</p>
                </div>
            </div>
            
            {/* Card grid with staggered animation */}
            <div className="grid gap-6 sm:gap-8 md:gap-10 md:grid-cols-2 lg:grid-cols-3">
                {posts.slice(0, 6).map((post, index) => (
                    <div 
                        key={post.$id} 
                        className="animate-fade-in-up h-full" 
                        style={{ animationDelay: `${index * 0.1}s` }}
                    >
                        <PostCard {...post} />
                    </div>
                ))}
            </div>
            
            <div className="flex justify-center mt-16">
                <Link 
                    to="/all-posts" 
                    className="relative group px-10 py-4 rounded-2xl overflow-hidden"
                >
                    {/* Button background with animated gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-gradient-x"></div>
                    
                    {/* Button text */}
                    <span className="relative z-10 text-white font-bold text-xl tracking-wide flex items-center">
                        View All Posts
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </span>
                    
                    {/* Button glow effect */}
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_30px_rgba(125,125,255,0.5)] dark:shadow-[0_0_30px_rgba(99,102,241,0.5)]"></div>
                </Link>
            </div>
        </section>
    )
}

export default Home