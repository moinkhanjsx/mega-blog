import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import {useDispatch} from "react-redux"
import authService from "../appwrite/auth"
import {useForm} from "react-hook-form"
import { Button, Input, Logo } from './index.js'

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit, formState: { errors }} = useForm()
    const [error, setError] = useState("")

    const login = async(data) => {
        setError("");
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
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-100 via-indigo-100 to-purple-100 py-12 px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
                <div className="flex flex-col items-center mb-6">
                    <Logo className="mb-2 w-16 h-16" />
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Sign in to your account</h2>
                    <p className="text-gray-500 text-sm">Don't have an account? <Link to="/signup" className="text-indigo-600 hover:underline">Sign Up</Link></p>
                </div>
                {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-center text-sm">{error}</div>}
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
                    {errors.email && <p className="text-red-500 text-xs ml-1">{errors.email.message}</p>}
                    <Input
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        {...register("password", {
                            required: "Password is required",
                        })}
                    />
                    {errors.password && <p className="text-red-500 text-xs ml-1">{errors.password.message}</p>}
                    <Button type="submit" className="w-full py-3 text-lg rounded-xl mt-2">Sign in</Button>
                </form>
            </div>
        </div>
    )
}

export default Login