import React, { useState, useEffect } from "react";
import appwriteService from "../appwrite/config";
import { PostCard, LoadingSpinner, Logo } from "../components";
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
    <section className="max-w-7xl mx-auto mt-6 sm:mt-10 px-2 sm:px-4 py-4 sm:py-8">
      <div className="relative mb-12 sm:mb-16 w-full">
        <div className="relative z-10 flex flex-col items-center">
          <div className="mb-4 w-full flex justify-center">
            <Logo />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-4 text-gray-900 dark:text-gray-100">
            All Posts
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 text-center max-w-xs sm:max-w-xl px-2">
            Explore all our blog posts
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center min-h-[40vh]">
          <LoadingSpinner text="Loading all posts..." />
        </div>
      ) : posts.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[40vh] p-4 sm:p-8 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
          <div className="w-16 h-16 sm:w-24 sm:h-24 mb-4 sm:mb-6 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center shadow-inner">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 sm:h-12 sm:w-12 text-gray-400 dark:text-gray-500"
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
          <h2 className="text-xl sm:text-2xl font-bold text-gray-700 dark:text-gray-300 mb-2 text-center">
            No posts found
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-center max-w-md text-sm sm:text-base px-2">
            There are currently no blog posts available. Check back later for
            new content!
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:gap-6 md:gap-8 lg:gap-10 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <div
              key={post.$id}
              className="h-full min-w-0"
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
