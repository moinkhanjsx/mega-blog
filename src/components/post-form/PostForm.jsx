import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const { register, handleSubmit, control, getValues, formState: { errors } } = useForm({
        defaultValues: {
            title: post?.title || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    useEffect(() => {
        if (!userData) {
            navigate("/login");
        }
    }, [userData, navigate]);

    const submit = async (data) => {
        try {
            setError(null);
            setSuccessMessage(null);
            setLoading(true);
            
            console.log("Form submission started with data:", {
                title: data.title,
                contentLength: data.content ? data.content.length : 0,
                contentSample: data.content ? data.content.substring(0, 50) + "..." : "MISSING",
                status: data.status,
                hasImage: data.image && data.image.length > 0,
                allKeys: Object.keys(data)
            });
            
            // Validate required fields before proceeding
            if (!data.title || !data.content) {
                console.error("Missing form data:", {
                    hasTitle: !!data.title,
                    hasContent: !!data.content
                });
                setError("Please fill all required fields (title, content)");
                return;
            }
            
            // Verify user is logged in
            if (!userData || !userData.$id) {
                setError("You must be logged in to create or edit a post");
                return;
            }
            
            console.log("User authenticated:", userData.$id);
            
            if (post) {
                // Update existing post
                console.log("Updating existing post:", post.$id);
                let file = null;
                
                // Handle image upload if provided
                if (data.image && data.image.length > 0 && data.image[0]) {
                    console.log("Uploading new image for post update");
                    try {
                        file = await appwriteService.uploadFile(data.image[0]);
                        console.log("New image uploaded successfully:", file.$id);
                        
                        if (file && post.featuredImage) {
                            console.log("Deleting old image:", post.featuredImage);
                            await appwriteService.deleteFile(post.featuredImage);
                        } else if (file && post.featuredimage) {
                            console.log("Deleting old image:", post.featuredimage);
                            await appwriteService.deleteFile(post.featuredimage);
                        }
                    } catch (uploadError) {
                        console.error("Image upload failed:", uploadError);
                        setError("Failed to upload image: " + (uploadError.message || "Unknown error"));
                        return;
                    }
                }
                
                // Update the post
                try {
                    console.log("Updating post with data:", {
                        id: post.$id,
                        featuredImage: file ? file.$id : post.featuredImage
                    });
                    
                    // Prepare update data
                    const updateData = {
                        title: data.title,
                        content: data.content,
                        featuredimage: file ? file.$id : (post.featuredimage || post.featuredImage), 
                        userid: userData.$id
                    };
                    
                    // Only add status if it's not empty
                    if (data.status) {
                        updateData.status = data.status;
                    }
                    
                    const dbPost = await appwriteService.updatePost(post.$id, updateData);
                    
                    if (dbPost) {
                        console.log("Post updated successfully:", dbPost.$id);
                        setSuccessMessage("Post updated successfully!");
                        setTimeout(() => {
                            navigate(`/post/${dbPost.$id}`);
                        }, 1000);
                    } else {
                        throw new Error("Failed to update post");
                    }
                } catch (updateError) {
                    console.error("Post update failed:", updateError);
                    setError("Failed to update post: " + (updateError.message || "Unknown error"));
                }
            } else {
                // Create new post
                console.log("Creating new post");
                
                // Validate image
                if (!data.image || data.image.length === 0 || !data.image[0]) {
                    console.warn("No image selected");
                    setError("Please select an image for your post");
                    return;
                }
                
                // Upload the image
                let file;
                try {
                    console.log("Uploading image for new post, file info:", {
                        name: data.image[0].name,
                        type: data.image[0].type,
                        size: data.image[0].size
                    });
                    
                    file = await appwriteService.uploadFile(data.image[0]);
                    console.log("Image uploaded successfully:", file.$id);
                } catch (uploadError) {
                    console.error("Image upload failed:", uploadError);
                    setError("Failed to upload image: " + (uploadError.message || "Unknown error"));
                    return;
                }
                
                if (file) {
                    // Create post with the uploaded image
                    try {
                        console.log("Creating post with image:", file.$id);
                        
                        // Verify the content field is present and not empty
                        if (!data.content || data.content.trim() === '') {
                            console.error("Content field is missing or empty");
                            setError("Content is required. Please add content to your post.");
                            
                            // Clean up the uploaded image
                            try {
                                console.log("Cleaning up image due to missing content:", file.$id);
                                await appwriteService.deleteFile(file.$id);
                            } catch (cleanupError) {
                                console.error("Failed to clean up image:", cleanupError);
                            }
                            
                            return;
                        }
                        
                        // Create the post data with only the absolute essentials
                        const postData = { 
                            title: data.title,
                            content: data.content,
                            featuredimage: file.$id,
                            userid: userData.$id
                        };
                        
                        // Only add status if it's not empty 
                        if (data.status) {
                            postData.status = data.status;
                        }
                        
                        console.log("Preparing to create post with data:", {
                            title: postData.title.substring(0, 30) + "...",
                            contentLength: postData.content.length,
                            featuredimage: postData.featuredimage,
                            userid: postData.userid,
                            status: postData.status || "N/A"
                        });
                        
                        try {
                            // Call the createPost method with our simplified data
                            const dbPost = await appwriteService.createPost(postData);
                            
                            console.log("Post created successfully:", dbPost.$id);
                            setSuccessMessage("Post created successfully!");
                            setTimeout(() => {
                                navigate(`/post/${dbPost.$id}`);
                            }, 1000);
                        } catch (error) {
                            console.error("Post creation failed:", error.message);
                            setError(error.message || "Failed to create post");
                            
                            // Clean up the uploaded image
                            try {
                                console.log("Cleaning up image after failed post creation:", file.$id);
                                await appwriteService.deleteFile(file.$id);
                            } catch (cleanupError) {
                                console.error("Failed to clean up image:", cleanupError);
                            }
                        }
                    } catch (error) {
                        console.error("Error during post creation:", error);
                        setError("An unexpected error occurred. Please try again.");
                    }
                } else {
                    setError("Image upload failed. Please try again.");
                }
            }
        } catch (error) {
            console.error("Form submission failed:", error);
            setError("An error occurred while submitting the form. Please check your network and try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(submit)} className="max-w-2xl mx-auto bg-gradient-to-br from-indigo-50 via-pink-50 to-purple-50 p-10 rounded-3xl shadow-2xl mt-14 space-y-10 border border-gray-200 animate-fade-in">
            {/* fallback UI for debugging */}
            {!userData && <div className="text-red-600 font-semibold text-center">User not logged in or userData missing</div>}
            {error && (
                <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6 text-center font-semibold border border-red-200 animate-pulse shadow">
                    <p>{error}</p>
                </div>
            )}
            {successMessage && (
                <div className="bg-green-50 text-green-700 p-4 rounded-lg mb-6 text-center font-semibold border border-green-200 animate-pulse shadow">
                    <p>{successMessage}</p>
                </div>
            )}
            <div className="space-y-8">
                <h2 className="text-4xl font-black text-center mb-8 bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 text-transparent bg-clip-text drop-shadow animate-gradient-x tracking-tight">
                    {post ? 'Edit Post' : 'Create New Post'}
                </h2>
                <div className="space-y-2">
                    <Input
                        label="Title :"
                        placeholder="Enter a catchy title..."
                        {...register("title", { required: true })}
                    />
                    {errors.title && (
                      <p className="text-red-500 text-xs mt-1 ml-1">Title is required.</p>
                    )}
                </div>
                <div className="space-y-2">
                    <RTE 
                      label="Content :" 
                      name="content" 
                      control={control} 
                      defaultValue={getValues("content")}
                      rules={{
                        required: "Content is required.",
                        validate: value => (value && value.trim() !== '') || "Content is required."
                      }}
                    />
                    {errors.content && (
                      <p className="text-red-500 text-xs mt-1 ml-1">{errors.content.message}</p>
                    )}
                </div>
            </div>
            <div className="space-y-8 border-t border-gray-100 pt-8">
                <div className="space-y-2">
                    <Input
                        label="Featured Image :"
                        type="file"
                        accept="image/png, image/jpg, image/jpeg, image/gif"
                        {...register("image", { required: !post })}
                    />
                    {errors.image && (
                      <p className="text-red-500 text-xs mt-1 ml-1">Featured image is required.</p>
                    )}
                    {post && (
                        <div className="flex justify-center mb-2">
                            <img
                                src={appwriteService.getFilePreview(post.featuredImage || post.featuredimage)}
                                alt={post.title}
                                className="rounded-xl shadow-lg w-56 h-36 object-cover border-2 border-indigo-200 bg-gray-50"
                            />
                        </div>
                    )}
                </div>
                <div className="space-y-2">
                    <Select
                        options={["active", "inactive"]}
                        label="Status"
                        {...register("status", { required: true })}
                    />
                    {errors.status && (
                      <p className="text-red-500 text-xs mt-1 ml-1">Status is required.</p>
                    )}
                </div>
                <Button 
                    type="submit" 
                    disabled={loading}
                    className="w-full py-3 text-lg rounded-xl bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 text-white font-bold shadow-xl hover:scale-[1.03] hover:shadow-2xl focus:ring-2 focus:ring-indigo-400 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed mt-4 animate-gradient-x tracking-wide"
                > 
                    {loading ? "Processing..." : (post ? "Update Post" : "Publish Post")} 
                </Button>
            </div>
        </form>
    );
}
