import conf from '../config/appwriteConfig.js';
import { Client, Account, ID } from 'appwrite';

// Initialize the Appwrite client with help of classes instead of direct functions so that when creating a registration page they can just create a new instance of AuthService with the class object.

export class AuthService {
    Client = new Client();
    Account;

    constructor() {
        this.Client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.Account = new Account(this.Client);
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount =   await this.Account.create(ID.unique(), email, password, name);

            if (userAccount) {
                // call another menthod
                return tthis.login({email, password});
            } else {
                throw new Error('Account creation failed');
            }
        } catch (error) {
            throw error;
        }
    }

    async login({email, password}){
        try {
            return await this.Account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser(){
        try {
           return await this.Account.get()
        } catch (error) {
            throw error;
        }
    }

    async logout(){
        try {
            return await this.Account.deleteSessions();
        } catch (error) {
            throw error;
        }
    }


}

const authService = new AuthService()

export default AuthService();