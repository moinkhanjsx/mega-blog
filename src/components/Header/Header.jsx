import React from "react";
import Logo from "../Logo";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import LogoutBtn from "./LogoutBtn";
import ThemeToggle from "../ThemeToggle";

export default function Header() {
    const authStatus = useSelector((state) => state.auth.status);
    return (
        <header className="sticky top-0 z-50 w-full px-0 flex items-center justify-between bg-white/20 dark:bg-gray-800/20 backdrop-blur-2xl border-b border-gray-200 dark:border-gray-700 shadow-2xl transition-colors duration-300">
            <div className="flex items-center gap-4 pl-6 py-2">
                <Logo />
            </div>
            <nav className="flex gap-2 md:gap-4 lg:gap-6 text-base md:text-lg font-semibold items-center pr-4 md:pr-8">
                <Link to="/" className="relative px-4 py-2 rounded-xl hover:bg-gradient-to-r hover:from-indigo-200/60 hover:to-pink-200/60 text-gray-700 dark:text-gray-200 hover:text-indigo-700 dark:hover:text-indigo-300 transition font-bold group overflow-hidden">
                    <span className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-r from-indigo-400 via-pink-400 to-purple-400 blur-lg transition-all duration-300"></span>
                    <span className="relative z-10">Home</span>
                </Link>
                {authStatus && (
                  <>
                    <Link to="/add-post" className="relative px-4 py-2 rounded-xl hover:bg-gradient-to-r hover:from-indigo-200/60 hover:to-pink-200/60 text-gray-700 dark:text-gray-200 hover:text-indigo-700 dark:hover:text-indigo-300 transition font-bold group overflow-hidden">
                      <span className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-r from-indigo-400 via-pink-400 to-purple-400 blur-lg transition-all duration-300"></span>
                      <span className="relative z-10">Add Post</span>
                    </Link>
                    <Link to="/all-posts" className="relative px-4 py-2 rounded-xl hover:bg-gradient-to-r hover:from-indigo-200/60 hover:to-pink-200/60 text-gray-700 dark:text-gray-200 hover:text-indigo-700 dark:hover:text-indigo-300 transition font-bold group overflow-hidden">
                      <span className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-r from-indigo-400 via-pink-400 to-purple-400 blur-lg transition-all duration-300"></span>
                      <span className="relative z-10">All Posts</span>
                    </Link>
                  </>
                )}
                {!authStatus && (
                  <>
                    <Link to="/login" className="relative px-4 py-2 rounded-xl hover:bg-gradient-to-r hover:from-indigo-200/60 hover:to-pink-200/60 text-gray-700 dark:text-gray-200 hover:text-indigo-700 dark:hover:text-indigo-300 transition font-bold group overflow-hidden">
                      <span className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-r from-indigo-400 via-pink-400 to-purple-400 blur-lg transition-all duration-300"></span>
                      <span className="relative z-10">Login</span>
                    </Link>
                    <Link to="/signup" className="relative px-4 py-2 rounded-xl hover:bg-gradient-to-r hover:from-indigo-200/60 hover:to-pink-200/60 text-gray-700 dark:text-gray-200 hover:text-indigo-700 dark:hover:text-indigo-300 transition font-bold group overflow-hidden">
                      <span className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-r from-indigo-400 via-pink-400 to-purple-400 blur-lg transition-all duration-300"></span>
                      <span className="relative z-10">Signup</span>
                    </Link>
                  </>
                )}
                <div className="ml-2">
                  <ThemeToggle />
                </div>
                {authStatus && <LogoutBtn />}
            </nav>
        </header>
    );
}