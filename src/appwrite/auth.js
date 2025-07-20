import conf from '../conf/conf.js';
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;
    initialized = false;

    constructor() {
        try {
            // Validate required configuration
            if (!conf.appwriteUrl || conf.appwriteUrl === 'undefined') {
                console.error("Appwrite URL is not configured");
                return;
            }
            
            if (!conf.appwriteProjectId || conf.appwriteProjectId === 'undefined') {
                console.error("Appwrite Project ID is not configured");
                return;
            }
            
            this.client
                .setEndpoint(conf.appwriteUrl)
                .setProject(conf.appwriteProjectId);
            
            this.account = new Account(this.client);
            this.initialized = true;
            
            // Debugging
            console.log("Appwrite Client Initialized", {
                endpoint: conf.appwriteUrl,
                project: conf.appwriteProjectId
            });
        } catch (error) {
            console.error("Failed to initialize Appwrite client:", error);
        }
    }

    async createAccount({email, password, name}) {
        if (!this.initialized) {
            throw new Error("Appwrite client not properly initialized. Check your configuration.");
        }
        
        try {
            const userAccount = await this.account.create(
                ID.unique(),
                email,
                password,
                name
            );
            
            if (userAccount) {
                // Auto-login after registration
                return this.createEmailPasswordSession(email, password);
            }
            return userAccount;
        } catch (error) {
            console.error("Registration Error:", error);
            throw error;
        }
    }

    async createEmailPasswordSession(email, password) {
        if (!this.initialized) {
            throw new Error("Appwrite client not properly initialized. Check your configuration.");
        }
        
        try {
            // In Appwrite v13, the method is createEmailSession
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            console.error("Login Error:", {
                message: error.message,
                code: error.code,
                type: error.type
            });
            
            // Transform error to provide more user-friendly messages
            const userFriendlyError = new Error(
                error.code === 401 ? "Invalid email or password. Please try again." :
                error.code === 429 ? "Too many attempts. Please try again later." :
                error.code === 404 ? "Account not found. Please register first." :
                "An unexpected error occurred. Please try again."
            );
            userFriendlyError.originalError = error;
            throw userFriendlyError;
        }
    }

    async getCurrentUser() {
        if (!this.initialized) {
            console.error("Appwrite client not properly initialized. Check your configuration.");
            return null;
        }
        
        try {
            return await this.account.get();
        } catch (error) {
            console.error("Get User Error:", error);
            return null;
        }
    }

    async logout() {
        if (!this.initialized) {
            console.error("Appwrite client not properly initialized. Check your configuration.");
            // Fallback: Clear local storage
            localStorage.clear();
            return true;
        }
        
        try {
            await this.account.deleteSessions();
            return true;
        } catch (error) {
            console.error("Logout Error:", error);
            // Fallback: Clear local storage
            localStorage.clear();
            return false;
        }
    }
}

const authService = new AuthService();
export default authService;