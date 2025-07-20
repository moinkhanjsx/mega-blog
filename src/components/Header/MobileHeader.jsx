import React, { useState, useEffect } from "react";
import Logo from "../Logo";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import LogoutBtn from "./LogoutBtn";
import Switch from "../Switch";

export default function MobileHeader() {
    const authStatus = useSelector((state) => state.auth.status);
    const userData = useSelector((state) => state.auth.userData);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();
    
    // Close menu when route changes
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location.pathname]);

    // Prevent background scroll when menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [mobileMenuOpen]);

    const handleLogout = () => {
        setMobileMenuOpen(false);
        document.querySelector('.logout-btn').click();
    };

    return (
        <header className="fixed top-0 left-0 right-0 w-full z-50">
            {/* Header Bar */}
            <div className="relative flex items-center justify-between px-4 py-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200/70 dark:border-gray-800/70 shadow-sm">
                {/* Menu Button (Left) */}
                <div className="flex-none">
                    <button
                        className="p-1.5 rounded-full text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none transition-colors duration-200"
                        onClick={() => setMobileMenuOpen(true)}
                        aria-label="Toggle mobile menu"
                    >
                        <svg 
                            className="w-5 h-5" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="1.5" 
                            viewBox="0 0 24 24"
                        >
                            <path d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
                
                {/* Logo (Center) */}
                <div className="absolute left-1/2 transform -translate-x-1/2">
                    <Link to="/" className="flex items-center">
                        <Logo />
                    </Link>
                </div>

                {/* Theme Toggle (Right) */}
                <div className="flex-none">
                    <Switch />
                </div>
            </div>

            {/* Mobile Menu Drawer */}
            <div 
                className={`fixed inset-0 z-50 transition-all duration-300 ease-in-out ${
                    mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
            >
                {/* Dark overlay */}
                <div 
                    className={`absolute inset-0 bg-black transition-opacity duration-300 ${
                        mobileMenuOpen ? "opacity-50" : "opacity-0"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                />
                
                {/* Menu panel */}
                <div 
                    className={`absolute top-0 right-0 w-4/5 max-w-xs h-full bg-white dark:bg-gray-900 shadow-2xl transform transition-transform duration-300 ease-in-out ${
                        mobileMenuOpen ? "translate-x-0" : "translate-x-full"
                    }`}
                >
                    {/* Menu Header */}
                    <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
                        <h2 className="text-lg font-medium text-gray-900 dark:text-white">Menu</h2>
                        <button
                            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
                            onClick={() => setMobileMenuOpen(false)}
                            aria-label="Close menu"
                        >
                            <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Menu Items */}
                    <nav className="px-2 py-4">
                        <div className="space-y-1">
                            <Link
                                to="/"
                                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Home
                            </Link>
                            
                            <Link
                                to="/all-posts"
                                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                All Posts
                            </Link>
                            
                            {authStatus && (
                                <Link
                                    to="/add-post"
                                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Add Post
                                </Link>
                            )}
                            
                            {userData?.labels?.includes('admin') && (
                                <Link
                                    to="/admin"
                                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Admin Dashboard
                                </Link>
                            )}
                        </div>
                    </nav>

                    {/* Auth Actions */}
                    <div className="absolute bottom-0 left-0 right-0 border-t border-gray-200 dark:border-gray-800 p-4">
                        {authStatus ? (
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white text-sm font-medium rounded-lg hover:from-red-600 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-all duration-200"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                Logout
                            </button>
                        ) : (
                            <div className="flex flex-col space-y-2">
                                <Link
                                    to="/login"
                                    className="w-full flex items-center justify-center px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-medium rounded-lg hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/signup"
                                    className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Sign Up
                                </Link>
                            </div>
                        )}
                        
                        <div className="hidden">
                            <LogoutBtn className="logout-btn" />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
} 