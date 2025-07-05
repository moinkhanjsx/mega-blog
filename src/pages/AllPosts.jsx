import React, { useState, useEffect } from "react";
import appwriteService from "../appwrite/config";
import { PostCard, LoadingSpinner } from "../components";
import { useLocation } from "react-router-dom";

function AllPosts() {
  const [posts, setPosts] = useState([]);
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
    appwriteService
      .getPosts([])
      .then((posts) => {
        if (posts) {
          setPosts(posts.documents);
          console.log("All posts loaded:", posts.documents.length);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading all posts:", error);
        setLoading(false);
      });
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      {/* Animated background elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-gradient-to-br from-indigo-200/30 to-purple-200/30 dark:from-indigo-900/10 dark:to-purple-900/10 rounded-full filter blur-3xl opacity-50 animate-float"></div>
        <div
          className="absolute bottom-20 right-1/4 w-80 h-80 bg-gradient-to-tl from-pink-200/30 to-indigo-200/30 dark:from-pink-900/10 dark:to-indigo-900/10 rounded-full filter blur-3xl opacity-50 animate-float"
          style={{ animationDelay: "1.2s" }}
        ></div>
      </div>

      {/* Header section with glass effect */}
      <div className="relative mb-10 sm:mb-16 text-center w-full">
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-32 bg-gradient-to-r from-indigo-100/30 via-purple-100/30 to-pink-100/30 dark:from-indigo-900/10 dark:via-purple-900/10 dark:to-pink-900/10 blur-3xl opacity-70 animate-gradient-x"></div>

        <div className="relative z-10 py-8 px-6 rounded-3xl glass-effect inline-block mx-auto">
          <h1 className="text-5xl font-extrabold py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-300 dark:via-purple-300 dark:to-pink-300 text-transparent bg-clip-text drop-shadow-lg animate-gradient-x">
            All Blog Posts
          </h1>
          <p className="mt-2 text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Explore our collection of articles and stories
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center min-h-[40vh]">
          <LoadingSpinner text="Loading all posts..." />
        </div>
      ) : posts.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[40vh] p-8 rounded-3xl glass-effect border border-white/10 dark:border-white/5">
          <div className="w-24 h-24 mb-6 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center shadow-inner">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-gray-400 dark:text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-2">
            No posts found
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-center max-w-md">
            There are currently no blog posts available. Check back later for
            new content!
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:gap-8 md:gap-10 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <div
              key={post.$id}
              className="animate-fade-in-up h-full min-w-0"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <PostCard {...post} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default AllPosts;
