import conf from '../conf/conf.js';
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
            ; // Add API key
        
        this.account = new Account(this.client);
        
        // Debugging
        console.log("Appwrite Client Initialized", {
            endpoint: conf.appwriteUrl,
            project: conf.appwriteProjectId,
            
        });
    }

    async createAccount({email, password, name}) {
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
        try {
            return await this.account.get();
        } catch (error) {
            console.error("Get User Error:", error);
            return null;
        }
    }

    async logout() {
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