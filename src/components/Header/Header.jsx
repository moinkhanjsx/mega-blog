import React, { useState } from "react";
import Logo from "../Logo";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import LogoutBtn from "./LogoutBtn";
import Switch from "../Switch";

export default function Header() {
    const authStatus = useSelector((state) => state.auth.status);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    return (
        <header className="sticky top-0 z-50 w-full px-2 sm:px-0 flex items-center justify-between bg-white/20 dark:bg-gray-800/20 backdrop-blur-2xl border-b border-gray-200 dark:border-gray-700 shadow-2xl transition-colors duration-300 h-14 sm:h-auto min-h-[56px]">
            <div className="flex items-center gap-2 sm:gap-4 pl-2 sm:pl-6 py-2 min-w-0">
                <Logo />
            </div>
            {/* Hamburger menu button for mobile */}
            <button
                className="md:hidden flex items-center justify-center p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                aria-label="Open menu"
                onClick={() => setMobileMenuOpen((prev) => !prev)}
            >
                <svg className="w-7 h-7 text-gray-700 dark:text-gray-200" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                    {mobileMenuOpen ? (
                        <path d="M6 18L18 6M6 6l12 12" />
                    ) : (
                        <path d="M4 6h16M4 12h16M4 18h16" />
                    )}
                </svg>
            </button>
            {/* Desktop nav */}
            <nav className="hidden md:flex flex-wrap gap-1 sm:gap-2 md:gap-4 lg:gap-6 text-xs xs:text-sm sm:text-base md:text-lg font-semibold items-center pr-2 sm:pr-4 md:pr-8 min-w-0">
                <Link to="/" className="relative px-2 xs:px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 transition font-bold group overflow-hidden whitespace-nowrap">
                    <span className="relative z-10">Home</span>
                </Link>
                {authStatus && (
                  <>
                    <Link to="/add-post" className="relative px-2 xs:px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 transition font-bold group overflow-hidden whitespace-nowrap">
                      <span className="relative z-10">Add Post</span>
                    </Link>
                    <Link to="/all-posts" className="relative px-2 xs:px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 transition font-bold group overflow-hidden whitespace-nowrap">
                      <span className="relative z-10">All Posts</span>
                    </Link>
                  </>
                )}
                {!authStatus && (
                  <>
                    <Link to="/login" className="relative px-2 xs:px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 transition font-bold group overflow-hidden whitespace-nowrap">
                      <span className="relative z-10">Login</span>
                    </Link>
                    <Link to="/signup" className="relative px-2 xs:px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 transition font-bold group overflow-hidden whitespace-nowrap">
                      <span className="relative z-10">Signup</span>
                    </Link>
                  </>
                )}
                <div className="ml-1 xs:ml-2">
                  <Switch />
                </div>
                {authStatus && <LogoutBtn />}
            </nav>
            {/* Mobile nav drawer */}
            {/* Mobile nav drawer with slide-in effect and proper overlay */}
            <div
                className={`fixed inset-0 z-50 md:hidden transition-all duration-300 ${mobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
                aria-hidden={!mobileMenuOpen}
            >
                {/* Overlay */}
                <div
                    className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}
                    onClick={() => setMobileMenuOpen(false)}
                />
                {/* Drawer below header */}
                <nav
                    className={`fixed top-14 right-0 h-[calc(100vh-56px)] w-4/5 max-w-xs bg-white dark:bg-gray-900 shadow-2xl flex flex-col gap-2 p-6 pt-8 transition-transform duration-300 ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
                    style={{ zIndex: 60 }}
                    onClick={e => e.stopPropagation()}
                >
                    <Link to="/" className="mb-2 text-lg font-bold text-gray-700 dark:text-gray-200" onClick={() => setMobileMenuOpen(false)}>
                        Home
                    </Link>
                    {authStatus && (
                      <>
                        <Link to="/add-post" className="mb-2 text-lg font-bold text-gray-700 dark:text-gray-200" onClick={() => setMobileMenuOpen(false)}>
                          Add Post
                        </Link>
                        <Link to="/all-posts" className="mb-2 text-lg font-bold text-gray-700 dark:text-gray-200" onClick={() => setMobileMenuOpen(false)}>
                          All Posts
                        </Link>
                      </>
                    )}
                    {!authStatus && (
                      <>
                        <Link to="/login" className="mb-2 text-lg font-bold text-gray-700 dark:text-gray-200" onClick={() => setMobileMenuOpen(false)}>
                          Login
                        </Link>
                        <Link to="/signup" className="mb-2 text-lg font-bold text-gray-700 dark:text-gray-200" onClick={() => setMobileMenuOpen(false)}>
                          Signup
                        </Link>
                      </>
                    )}
                    <div className="mt-4 flex gap-2 items-center">
                        <Switch />
                        {authStatus && <LogoutBtn />}
                    </div>
                </nav>
            </div>
        </header>
    );
}