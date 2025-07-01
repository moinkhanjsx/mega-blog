// Appwrite service implementation for posts, files, etc.
import { Client, Databases, Storage, ID } from "appwrite";
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
    }

    async createPost({ title, content, featuredimage, userid, status }) {
        return await this.databases.createDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            ID.unique(),
            { title, content, featuredimage, userid, status }
        );
    }

    async updatePost(id, { title, content, featuredimage, userid, status }) {
        return await this.databases.updateDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            id,
            { title, content, featuredimage, userid, status }
        );
    }

    async deletePost(id) {
        return await this.databases.deleteDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            id
        );
    }

    async getPost(id) {
        return await this.databases.getDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            id
        );
    }

    async getPosts() {
        return await this.databases.listDocuments(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId
        );
    }

    async uploadFile(file) {
        return await this.bucket.createFile(
            conf.appwriteBucketId,
            ID.unique(),
            file
        );
    }

    async deleteFile(fileId) {
        return await this.bucket.deleteFile(
            conf.appwriteBucketId,
            fileId
        );
    }

    getFilePreview(fileId, width = 800) {
        try {
            if (!fileId) {
                console.warn("Missing file ID in getFilePreview");
                return null;
            }
            
            // Construct the URL directly with the Appwrite endpoint and project ID
            const previewUrl = `${conf.appwriteUrl}/storage/buckets/${conf.appwriteBucketId}/files/${fileId}/preview?project=${conf.appwriteProjectId}&width=${width}`;
            console.log("Generated image preview URL:", previewUrl);
            return previewUrl;
        } catch (error) {
            console.error("Appwrite getFilePreview error:", error);
            return null;
        }
    }
    
    getFileDownload(fileId) {
        try {
            if (!fileId) {
                console.warn("Missing file ID in getFileDownload");
                return null;
            }
            
            // Construct the URL directly with the Appwrite endpoint and project ID
            const downloadUrl = `${conf.appwriteUrl}/storage/buckets/${conf.appwriteBucketId}/files/${fileId}/download?project=${conf.appwriteProjectId}`;
            console.log("Generated download URL:", downloadUrl);
            return downloadUrl;
        } catch (error) {
            console.error("Appwrite getFileDownload error:", error);
            return null;
        }
    }
}

const appwriteService = new AppwriteService();
export default appwriteService;
