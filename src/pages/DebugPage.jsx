import React, { useEffect, useState } from 'react';
import appwriteService from "../appwrite/config";
import DebugImageLoader from '../components/DebugImageLoader';

function DebugPage() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        appwriteService.getPosts()
            .then((response) => {
                if (response && response.documents) {
                    setPosts(response.documents);
                    console.log("Loaded posts:", response.documents.length);
                    console.log("First post:", response.documents[0]);
                } else {
                    setError("No posts found or invalid response structure");
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error loading posts:", err);
                setError("Failed to load posts: " + err.message);
                setLoading(false);
            });
    }, []);

    return (
        <div className="max-w-4xl mx-auto my-8 p-6">
            <h1 className="text-3xl font-bold mb-6">Image Loading Debug</h1>
            
            {loading ? (
                <div className="text-center py-8">Loading posts...</div>
            ) : error ? (
                <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6">{error}</div>
            ) : (
                <div className="space-y-8">
                    <div className="bg-blue-50 p-4 rounded-lg">
                        <h2 className="text-xl font-bold mb-2">Appwrite Configuration</h2>
                        <pre className="whitespace-pre-wrap bg-gray-100 p-2 rounded text-xs">
                            {JSON.stringify({
                                url: appwriteService.client.config.endpoint,
                                project: appwriteService.client.config.project,
                                bucketId: appwriteService.bucket?.config?.endpoint ? 'Initialized' : 'Missing',
                                postsFound: posts.length
                            }, null, 2)}
                        </pre>
                    </div>
                    
                    {posts.slice(0, 3).map((post) => (
                        <div key={post.$id} className="border rounded-lg p-4">
                            <h2 className="text-xl font-bold mb-2">{post.title}</h2>
                            <div className="text-sm mb-4">
                                <p>Post ID: {post.$id}</p>
                                <p>Image ID: {post.featuredimage || post.featuredImage || 'None'}</p>
                            </div>
                            
                            {(post.featuredimage || post.featuredImage) ? (
                                <DebugImageLoader imageId={post.featuredimage || post.featuredImage} />
                            ) : (
                                <div className="bg-yellow-50 text-yellow-700 p-4 rounded">
                                    No image ID found for this post
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default DebugPage;
