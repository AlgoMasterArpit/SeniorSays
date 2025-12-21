import conf from '../conf/conf.js'
//   these are imported from appwrite
import { Client, Account, ID } from "appwrite";
//  we will make a class and then us class se object 
//  then that object se method we can access

export class AuthService {
    client = new Client()
    account;


    constructor() {
        //  chaining happens isiliye sirf last me semicolon
        this.client
            .setProject(conf.appwriteProjectId) // Your project ID Tell Client WHICH project to use
            .setEndpoint(conf.appwriteUrl);/*Tell Client WHERE the server is*/
        this.account = new Account(this.client) /*Give the 'Account' tool the setup connection*/
    }



    //    sign up 
    async createAccount({ email, password, name }) {

        // . Send request to Appwrite to create a new user
        try {
            // ID.unique() generates a random unique ID for this user
            const userAccount = await this.account.create(ID.unique(), email, password, name)


            if (userAccount) {
                //  run one more method ki accountban gya  to  log in kra do 
                // // Action: Don't wait. Log them in IMMEDIATELY using the same password they just typed
                //  its ux optimazation ki signup ke baad bhi we need to add email amd pass to log in so now it automaticaaly logged us in when we do signup
                return this.login({ email, password })
            }
            else return userAccount
        } catch (error) {
            throw error
        }
    }
    async login({ email, password }) {

        try {
            return await  this.account.createEmailPasswordSession(email, password)

        } catch (error) {
            throw error
        }
    }


    //  after log in how will user get ki is he logged in ih 
    async getCurrentuser() {
        try {
            return await this.account.get()
        } catch (error) {
            console.log("user not logeed in ", error)
        }
        return null
    }

    async logout() {
        try {
            return await this.account.deleteSessions()
        }
        catch (error) {
            throw error
        }
    }
}
const authService = new AuthService();/*this is object*/
export default authService;










//  this  is the complete explanation of the file 

// Client: This is the main communication channel. Think of it as the "cable" connecting your React app to the Appwrite server.

// Account: This is a specific tool for handling users. It uses the Client "cable" to send login/signup requests.

// ID: A utility from Appwrite to generate unique IDs (like "65a8c...") automatically.