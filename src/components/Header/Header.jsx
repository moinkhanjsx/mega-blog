import React from "react";
import Logo from "../Logo";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import LogoutBtn from "./LogoutBtn";

export default function Header() {
    const authStatus = useSelector((state) => state.auth.status);
    return (
        <header className="sticky top-0 z-50 w-full py-4 px-6 flex items-center justify-between bg-gradient-to-r from-pink-500 via-indigo-500 to-purple-500 text-white shadow-xl">
            <div className="flex items-center gap-4">
                <Logo />
            </div>
            <nav className="flex gap-6 text-lg font-semibold items-center">
                <Link to="/" className="hover:text-pink-200 transition">Home</Link>
                {authStatus && (
                  <>
                    <Link to="/add-post" className="hover:text-pink-200 transition">Add Post</Link>
                    <Link to="/all-posts" className="hover:text-pink-200 transition">All Posts</Link>
                  </>
                )}
                {!authStatus && (
                  <>
                    <Link to="/login" className="hover:text-pink-200 transition">Login</Link>
                    <Link to="/signup" className="hover:text-pink-200 transition">Signup</Link>
                  </>
                )}
                {authStatus && <LogoutBtn />}
            </nav>
        </header>
    );
}