import conf from '../conf/conf.js';
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        
        // Initialize the Database and Storage services
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    // ==============================
    // 📝 Database Service (Stories)
    // ==============================

    async createPost({ title, slug, content, companyName, roleType, status,interviewOutcome, difficulty, resumeFileId, userId }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug, // We use the slug as the Document ID
                {
                    title,
                    content,
                    companyName,
                    roleType,
                    status,
                    interviewOutcome,
                    difficulty,
                    resumeFileId,
                    userId,
                }
            )
        } catch (error) {
            console.log("Appwrite service :: createPost :: error", error);
        }
    }
//  pehle i want ki doc id paas ho toh slug pehle paas kia
    async updatePost(slug, { title, content, companyName, roleType,interviewOutcome, status, difficulty, resumeFileId }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug, // Document ID
                {
                    title,
                    content,
                    companyName,
                    roleType,
                    status,
                    interviewOutcome,
                    difficulty,
                    resumeFileId,
                }
            )
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error", error);
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            ) /*now its upto frontend ki hum is true me kya dikhaye true matlab haa delete ho gya */
            return true;
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error", error);
            return false;
        }
    }

    // Get a SINGLE post (for the "Read Full Story" page)
    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("Appwrite service :: getPost :: error", error);
            return false;
        }
    }

    // Get ALL posts (for the Dashboard)
    //  status active matlab senior ne post kardia , inactive matlab usne save as draft kia h and vo baad me jab aayega toh usey vhi aadha filled 
    //  form milega , ye sab we handle toh set status and save as draft in react hook form 

    //  status active jin post ka hoga vhi post will come on dashboard so filter lag tha h on status toh   appwrite me database me index me  status bnale 
    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
            )
        } catch (error) {
            console.log("Appwrite service :: getPosts :: error", error);
            return false;/* for safe we write it ki agar ek bhi value return nhi hui toh*/
        }
    }

    // ==============================
    // 📂 Storage Service (Resumes)
    // ==============================

    // 1. Upload File
    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error", error);
            return false;
        }
    }

    // 2. Delete File (Used if a Senior deletes their post)
    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true;
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error", error);
            return false;
        }
    }

    // 3. Get File Preview (OPTIONAL: If you ever upload images instead of PDFs)
    getFilePreview(fileId) {
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        ) 
    }

    // 4. Download File (This is what you asked for!)
    // This returns a URL that forces the browser to download the PDF
    getFileDownload(fileId) {
        return this.bucket.getFileDownload(
            conf.appwriteBucketId,
            fileId
        );
    }
}

const service = new Service()
export default service


// 1. slugWhat is it? It is the "URL version" of the title.Title: "My Amazon Interview" 
// Slug: my-amazon-interviewWhere does it come from? Your React code creates it.
//  You will write a small helper function that takes the title, lowercases it, and swaps spaces for dashes.
//  Why do we pass it? We use it as the Document ID. 
// This way, the URL is readable (/post/my-amazon-interview) instead of random gibberish (/post/65a9...).

// 2. userIdWhat is it?
//  The unique ID of the person currently logged in.Where does it come from? 
//  Before you call createPost, your React component asks authService.getCurrentUser()."Hey Appwrite, who is logged in?"  "It's User 123.
//  "Why do we pass it? 
//  So we know who wrote the post! This allows us to show "Written by Rahul" and ensures only Rahul can edit it later.

// resumeFileId

// What is it? The "Receipt Number" for the PDF file.

// Where does it come from?

// User uploads a PDF.

// Your code sends the PDF to Appwrite Storage.

// Appwrite Storage says: "Saved! Here is ID: file_xyz".

// You take file_xyz and pass it here to the Database.

// Why do we pass it? The Database cannot store the actual PDF file (it's too big).
//  It only stores the ID (a reference link) so it knows which file in the Storage bucket belongs to this post.
