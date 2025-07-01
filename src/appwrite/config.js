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

    getFilePreview(fileId) {
        return this.bucket.getFilePreview(conf.appwriteBucketId, fileId).href;
    }
}

const appwriteService = new AppwriteService();
export default appwriteService;
