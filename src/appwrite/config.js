// Appwrite service implementation for posts, files, etc.
import { Client, Databases, Storage, ID, Query } from "appwrite";
import conf from "../conf/conf";

class AppwriteService {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
        
        // Log configuration details for debugging
        console.log("Appwrite Config:", {
            url: conf.appwriteUrl,
            projectId: conf.appwriteProjectId,
            databaseId: conf.appwriteDatabaseId,
            collectionId: conf.appwriteCollectionId,
            bucketId: conf.appwriteBucketId
        });
    }

    // Post CRUD operations
    async createPost({ title, content, featuredimage, userid, status }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                ID.unique(),
                { title, content, featuredimage, userid, status }
            );
        } catch (error) {
            console.error("Error creating post:", error);
            throw error;
        }
    }

    async updatePost(id, { title, content, featuredimage, userid, status }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                id,
                { title, content, featuredimage, userid, status }
            );
        } catch (error) {
            console.error("Error updating post:", error);
            throw error;
        }
    }

    async deletePost(id) {
        try {
            return await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                id
            );
        } catch (error) {
            console.error("Error deleting post:", error);
            throw error;
        }
    }

    async getPost(id) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                id
            );
        } catch (error) {
            console.error("Error getting post:", error);
            throw error;
        }
    }

    async getPosts(queries = []) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            );
        } catch (error) {
            console.error("Error getting posts:", error);
            throw error;
        }
    }

    // File operations
    async uploadFile(file) {
        try {
            const uploadedFile = await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            );
            console.log("File uploaded successfully:", uploadedFile);
            return uploadedFile;
        } catch (error) {
            console.error("Error uploading file:", error);
            throw error;
        }
    }

    async deleteFile(fileId) {
        try {
            return await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            );
        } catch (error) {
            console.error("Error deleting file:", error);
            throw error;
        }
    }

    getFilePreview(fileId) {
        if (!fileId) {
            console.warn("Missing file ID in getFilePreview");
            return null;
        }

        try {
            // Use direct URL construction with appropriate query parameters
            const imageUrl = `${conf.appwriteUrl}/storage/buckets/${conf.appwriteBucketId}/files/${fileId}/view?project=${conf.appwriteProjectId}`;
            console.log("Generated image URL:", imageUrl);
            return imageUrl;
        } catch (error) {
            console.error("Error generating file preview URL:", error);
            return null;
        }
    }
    
    getFileDownload(fileId) {
        if (!fileId) {
            console.warn("Missing file ID in getFileDownload");
            return null;
        }
        
        try {
            const downloadUrl = `${conf.appwriteUrl}/storage/buckets/${conf.appwriteBucketId}/files/${fileId}/download?project=${conf.appwriteProjectId}`;
            console.log("Generated download URL:", downloadUrl);
            return downloadUrl;
        } catch (error) {
            console.error("Error generating file download URL:", error);
            return null;
        }
    }
}

const appwriteService = new AppwriteService();
export default appwriteService;
