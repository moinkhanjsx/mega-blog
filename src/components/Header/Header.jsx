import React, { useState } from "react";
import Logo from "../Logo";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import LogoutBtn from "./LogoutBtn";
import Switch from "../Switch";
import MobileHeader from "./MobileHeader";

export default function Header() {
    const authStatus = useSelector((state) => state.auth.status);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <>
            {/* Mobile Header - Only visible on mobile */}
            <div className="md:hidden">
                <MobileHeader />
            </div>

            {/* Desktop Header - Only visible on desktop */}
            <header className="hidden md:flex sticky top-0 z-50 w-full px-4 sm:px-0 flex items-center justify-between bg-white/20 dark:bg-gray-800/20 backdrop-blur-2xl border-b border-gray-200 dark:border-gray-700 shadow-2xl transition-colors duration-300 h-14 sm:h-auto min-h-[56px]">
                <div className="flex items-center gap-2 sm:gap-4 pl-2 sm:pl-6 py-2 min-w-0 flex-shrink-0">
                    <Logo />
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-6 pr-6">
                    <Link
                        to="/"
                        className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium"
                    >
                        Home
                    </Link>
                    <Link
                        to="/all-posts"
                        className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium"
                    >
                        All Posts
                    </Link>
                    {authStatus ? (
                        <>
                            <Link
                                to="/add-post"
                                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium"
                            >
                                Add Post
                            </Link>
                            <LogoutBtn />
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium"
                            >
                                Login
                            </Link>
                            <Link
                                to="/signup"
                                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium"
                            >
                                Sign Up
                            </Link>
                        </>
                    )}
                    <Switch />
                </nav>
            </header>
        </>
    );
}