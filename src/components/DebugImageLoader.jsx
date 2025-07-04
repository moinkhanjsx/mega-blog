import React, { useState, useEffect } from 'react';
import appwriteService from '../appwrite/config';
import conf from '../conf/conf';

const DebugImageLoader = ({ imageId }) => {
    const [directUrl, setDirectUrl] = useState('');
    const [sdkUrl, setSdkUrl] = useState('');
    const [viewUrl, setViewUrl] = useState('');
    const [previewUrl, setPreviewUrl] = useState('');
    const [imageLoadStatus, setImageLoadStatus] = useState({
        direct: 'loading',
        sdk: 'loading',
        view: 'loading',
        preview: 'loading',
    });

    useEffect(() => {
        if (!imageId) return;

        // Method 1: Direct URL construction
        const direct = `${conf.appwriteUrl}/storage/buckets/${conf.appwriteBucketId}/files/${imageId}/view?project=${conf.appwriteProjectId}`;
        setDirectUrl(direct);

        // Method 2: SDK getFileView URL
        try {
            const view = appwriteService.bucket.getFileView(
                conf.appwriteBucketId,
                imageId
            ).href;
            setViewUrl(view);
        } catch (error) {
            console.error("Error getting view URL:", error);
        }

        // Method 3: SDK getFilePreview URL
        try {
            const preview = appwriteService.bucket.getFilePreview(
                conf.appwriteBucketId,
                imageId
            ).href;
            setPreviewUrl(preview);
        } catch (error) {
            console.error("Error getting preview URL:", error);
        }

        // Method 4: Using our service method
        const sdk = appwriteService.getFilePreview(imageId);
        setSdkUrl(sdk);
    }, [imageId]);

    const checkImage = (url, type) => {
        const img = new Image();
        img.onload = () => setImageLoadStatus(prev => ({ ...prev, [type]: 'success' }));
        img.onerror = () => setImageLoadStatus(prev => ({ ...prev, [type]: 'error' }));
        img.src = url;
    };

    useEffect(() => {
        if (directUrl) checkImage(directUrl, 'direct');
        if (sdkUrl) checkImage(sdkUrl, 'sdk');
        if (viewUrl) checkImage(viewUrl, 'view');
        if (previewUrl) checkImage(previewUrl, 'preview');
    }, [directUrl, sdkUrl, viewUrl, previewUrl]);

    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Image Debug ({imageId})</h2>
            
            <div className="space-y-4">
                {[
                    { name: 'Direct URL', url: directUrl, status: imageLoadStatus.direct },
                    { name: 'SDK Method', url: sdkUrl, status: imageLoadStatus.sdk },
                    { name: 'View Method', url: viewUrl, status: imageLoadStatus.view },
                    { name: 'Preview Method', url: previewUrl, status: imageLoadStatus.preview }
                ].map((method, index) => (
                    <div key={index} className="border p-4 rounded">
                        <h3 className="font-medium mb-2">{method.name}</h3>
                        <p className="text-xs mb-2 break-all text-gray-500 dark:text-gray-400">{method.url}</p>
                        <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 text-xs rounded ${
                                method.status === 'loading' ? 'bg-yellow-100 text-yellow-800' :
                                method.status === 'success' ? 'bg-green-100 text-green-800' :
                                'bg-red-100 text-red-800'
                            }`}>
                                {method.status}
                            </span>
                            {method.url && (
                                <a 
                                    href={method.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-blue-500 hover:underline text-xs"
                                >
                                    Test Link
                                </a>
                            )}
                        </div>
                        {method.url && method.status === 'success' && (
                            <div className="mt-2">
                                <img 
                                    src={method.url} 
                                    alt={`${method.name} preview`} 
                                    className="w-full max-h-40 object-cover rounded"
                                    crossOrigin="anonymous"
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DebugImageLoader;
