import React, {useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import {useDispatch} from "react-redux"
import authService from "../appwrite/auth"
import {useForm} from "react-hook-form"
import { Button, Input, Logo, LoadingSpinner } from './index.js'
import conf from '../conf/conf.js'

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit, formState: { errors }} = useForm()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [configValid, setConfigValid] = useState(true)

    // Check config on component mount
    useEffect(() => {
        // Validate all required environment variables
        const requiredConfigs = {
            appwriteUrl: conf.appwriteUrl,
            appwriteProjectId: conf.appwriteProjectId,
            // These are only needed for post operations, not login
            // appwriteDatabaseId: conf.appwriteDatabaseId,
            // appwriteCollectionId: conf.appwriteCollectionId,
            // appwriteBucketId: conf.appwriteBucketId
        };

        const missingConfigs = Object.entries(requiredConfigs)
            .filter(([_, value]) => !value || value === 'undefined')
            .map(([key]) => key);

        if (missingConfigs.length > 0) {
            console.error("Missing required configuration:", missingConfigs);
            setConfigValid(false);
            setError(`Missing required configuration: ${missingConfigs.join(', ')}. Please check your .env file.`);
        } else {
            setConfigValid(true);
        }
    }, []);

    // Debug environment variables in development
    if (process.env.NODE_ENV === 'development') {
        console.log("=== APPWRITE CONFIG DEBUG ===");
        console.log("Environment Variables:", {
            VITE_APPWRITE_URL: import.meta.env.VITE_APPWRITE_URL,
            VITE_APPWRITE_PROJECT_ID: import.meta.env.VITE_APPWRITE_PROJECT_ID,
            VITE_APPWRITE_DB_ID: import.meta.env.VITE_APPWRITE_DB_ID,
            VITE_APPWRITE_COLLECTION_ID: import.meta.env.VITE_APPWRITE_COLLECTION_ID,
            VITE_APPWRITE_BUCKET_ID: import.meta.env.VITE_APPWRITE_BUCKET_ID
        });
        console.log("Conf Object:", {
            url: conf.appwriteUrl,
            projectId: conf.appwriteProjectId,
            databaseId: conf.appwriteDatabaseId,
            collectionId: conf.appwriteCollectionId,
            bucketId: conf.appwriteBucketId
        });
        console.log("Config Validation:", {
            hasUrl: !!conf.appwriteUrl && conf.appwriteUrl !== 'undefined',
            hasProjectId: !!conf.appwriteProjectId && conf.appwriteProjectId !== 'undefined',
            urlValid: conf.appwriteUrl && conf.appwriteUrl.startsWith('http'),
            projectIdValid: conf.appwriteProjectId && conf.appwriteProjectId.length > 0
        });
        console.log("=== END DEBUG ===");
    }

    const login = async(data) => {
        if (!configValid) {
            setError("Cannot login: Missing required configuration. Please check your .env file.");
            return;
        }

        setError("");
        setLoading(true);
        try {
            console.log("Attempting login with email:", data.email);
            
            // Check if config is valid before attempting login
            if (!conf.appwriteUrl || conf.appwriteUrl === 'undefined') {
                throw new Error("Appwrite URL is not configured. Please check your .env file.");
            }
            if (!conf.appwriteProjectId || conf.appwriteProjectId === 'undefined') {
                throw new Error("Appwrite Project ID is not configured. Please check your .env file.");
            }
            
            const session = await authService.createEmailPasswordSession(data.email, data.password);
            console.log("Session created:", session);
            
            if (session) {
                const userData = await authService.getCurrentUser();
                console.log("User data retrieved:", userData);
                
                if(userData) {
                    dispatch(authLogin(userData));
                    // Check for admin label (Appwrite stores labels as an array)
                    if (userData.labels && userData.labels.includes("admin")) {
                        navigate("/admin");
                    } else {
                        navigate("/");
                    }
                } else {
                    throw new Error("Failed to get user data after login");
                }
            } else {
                throw new Error("Failed to create session");
            }
        } catch (error) {
            console.error("Login error:", error);
            
            // Provide more specific error messages
            let errorMessage = "An unexpected error occurred. Please try again.";
            
            if (error.message) {
                if (error.message.includes("Appwrite URL is not configured")) {
                    errorMessage = "Configuration error: Appwrite URL is missing. Please check your .env file.";
                } else if (error.message.includes("Appwrite Project ID is not configured")) {
                    errorMessage = "Configuration error: Appwrite Project ID is missing. Please check your .env file.";
                } else if (error.message.includes("Network request failed")) {
                    errorMessage = "Network error: Cannot connect to Appwrite. Please check your internet connection and Appwrite URL.";
                } else if (error.message.includes("Invalid email or password")) {
                    errorMessage = "Invalid email or password. Please check your credentials.";
                } else if (error.message.includes("Account not found")) {
                    errorMessage = "Account not found. Please register first.";
                } else if (error.message.includes("Too many attempts")) {
                    errorMessage = "Too many login attempts. Please try again later.";
                } else if (error.message.includes("Failed to get user data")) {
                    errorMessage = "Login successful but failed to retrieve user data. Please try again.";
                } else if (error.message.includes("Failed to create session")) {
                    errorMessage = "Failed to create login session. Please try again.";
                } else {
                    errorMessage = error.message;
                }
            }
            
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-100 via-indigo-100 to-purple-100 dark:from-gray-900 dark:via-indigo-950 dark:to-purple-950 py-4 sm:py-12 px-2 sm:px-4 transition-colors duration-300">
            <div className="w-full max-w-sm sm:max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 border border-gray-100 dark:border-gray-700 transition-colors duration-300">
                <div className="flex flex-col items-center mb-4 sm:mb-6">
                    <Logo className="mb-2 w-12 h-12 sm:w-16 sm:h-16" />
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-2 transition-colors duration-300 text-center">Sign in to your account</h2>
                    <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm transition-colors duration-300 text-center">Don't have an account? <Link to="/signup" className="text-indigo-600 dark:text-indigo-400 hover:underline transition-colors duration-300">Sign Up</Link></p>
                </div>
                {error && <div className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 p-2 sm:p-3 rounded mb-4 text-center text-xs sm:text-sm transition-colors duration-300">{error}</div>}
                <form onSubmit={handleSubmit(login)} className="space-y-4 sm:space-y-6">
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
                    <Button type="submit" className="w-full py-2 sm:py-3 text-base sm:text-lg rounded-xl mt-2" isLoading={loading} disabled={!configValid}>Sign in</Button>
                </form>
            </div>
        </div>
    )
}

export default Login