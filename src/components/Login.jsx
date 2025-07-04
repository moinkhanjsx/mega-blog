import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import {useDispatch} from "react-redux"
import authService from "../appwrite/auth"
import {useForm} from "react-hook-form"
import { Button, Input, Logo, LoadingSpinner } from './index.js'

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit, formState: { errors }} = useForm()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const login = async(data) => {
        setError("");
        setLoading(true);
        try {
            const session = await authService.createEmailPasswordSession(data.email, data.password);
            if (session) {
                const userData = await authService.getCurrentUser();
                if(userData) {
                    dispatch(authLogin(userData));
                    navigate("/");
                } else {
                    throw new Error("Failed to get user data");
                }
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-100 via-indigo-100 to-purple-100 dark:from-gray-900 dark:via-indigo-950 dark:to-purple-950 py-12 px-4 transition-colors duration-300">
            <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-100 dark:border-gray-700 transition-colors duration-300">
                <div className="flex flex-col items-center mb-6">
                    <Logo className="mb-2 w-16 h-16" />
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2 transition-colors duration-300">Sign in to your account</h2>
                    <p className="text-gray-500 dark:text-gray-400 text-sm transition-colors duration-300">Don't have an account? <Link to="/signup" className="text-indigo-600 dark:text-indigo-400 hover:underline transition-colors duration-300">Sign Up</Link></p>
                </div>
                {error && <div className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 p-3 rounded mb-4 text-center text-sm transition-colors duration-300">{error}</div>}
                <form onSubmit={handleSubmit(login)} className="space-y-6">
                    <Input
                        label="Email"
                        placeholder="Enter your email"
                        type="email"
                        {...register("email", {
                            required: "Email is required",
                            validate: {
                                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                "Email address must be a valid address",
                            }
                        })}
                    />
                    {errors.email && <p className="text-red-500 dark:text-red-400 text-xs ml-1 transition-colors duration-300">{errors.email.message}</p>}
                    <Input
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        {...register("password", {
                            required: "Password is required",
                        })}
                    />
                    {errors.password && <p className="text-red-500 dark:text-red-400 text-xs ml-1 transition-colors duration-300">{errors.password.message}</p>}
                    <Button type="submit" className="w-full py-3 text-lg rounded-xl mt-2" isLoading={loading}>Sign in</Button>
                </form>
            </div>
        </div>
    )
}

export default Login