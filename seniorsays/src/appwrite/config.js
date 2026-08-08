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

    async createPost({ title, slug, content, companyName, roleType, status,interviewOutcome, difficulty, resumeFileId, userId,authorName }) {
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
                    slug,
                    authorName,
                }
            )
        } catch (error) {
            console.log("Appwrite service :: createPost :: error", error);
            throw error;
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
            throw error;
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
  // appwrite/config.js ke andar
async getPost(slug){
    try {
        return await this.databases.getDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug
        )
    } catch (error) {
        console.log("Appwrite serive :: getPost :: error", error);
        // Important: Yahan false return mat karna agar error throw ho raha hai, 
        // kyunki hum 'try-catch' mein error expect kar rahe hain form ke andar.
        throw error; 
    }
}

    // Get ALL posts (for the Dashboard)
    //  status active matlab senior ne post kardia , inactive matlab usne save as draft kia h and vo baad me jab aayega toh usey vhi aadha filled 
    //  form milega , ye sab we handle toh set status and save as draft in react hook form 

    //  status active jin post ka hoga vhi post will come on dashboard so filter lag tha h on status toh   appwrite me database me index me  status bnale 
    //  ⚠️ Ek listDocuments call SAARE posts nahi deta:
    //     - limit na do toh Appwrite chupchaap 25 pe kaat deta hai (na error, na warning)
    //     - limit do toh bhi ek request me max 5000 hi milte hain
    //  Isliye hum page-by-page loop karke sab uthate hain. DB me 200 hain toh 200 aayenge,
    //  1000 hain toh 1000 (2 aur 10 requests me).
    //  Return: seedha ARRAY (pehle {total, documents} object aata tha).
    async getPosts(queries = [Query.equal("status", "active")]) {
        const PER_REQUEST = 100;   // ek request me itne, poore total pe koi cap nahi
        const all = [];
        let cursor = null;

        try {
            for (;;) {
                const pageQueries = [...queries, Query.limit(PER_REQUEST)];

                //  cursorAfter, offset se behtar hai:
                //   1. offset ka apna max hota hai, cursor ka nahi
                //   2. loop ke beech me koi naya post ban jaaye toh offset shift ho jaata hai
                //      aur ek post skip ya duplicate ho jaati hai — cursor me ye problem nahi
                if (cursor) pageQueries.push(Query.cursorAfter(cursor));

                const res = await this.databases.listDocuments(
                    conf.appwriteDatabaseId,
                    conf.appwriteCollectionId,
                    pageQueries,   
                );

                all.push(...res.documents);

                //  Poora page nahi bhara = ye aakhri page tha, ruk jao
                if (res.documents.length < PER_REQUEST) break;

                cursor = res.documents[res.documents.length - 1].$id;
            }

            return all;
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
            throw error;
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

    //  getFilePreview yahan se HATA diya. Wo IMAGES ka resized/cropped version
    //  banata hai — PDF pe wo asli file deta hi nahi, ek generic "PDF icon" wali
    //  tasveer bhej deta hai. Isi wajah se edit page pe resume ki jagah icon dikh
    //  raha tha, aur error na aane ki wajah se kaafi der pata nahi chala.
    //  Hume sirf PDF serve karne hain, image process nahi karni — toh iski
    //  zaroorat hi nahi. Kabhi image thumbnails chahiye honge tab wapas laana.

    // 3. View File — asli file, bina "download karo" wale header ke.
    //    Browser khud dikha deta hai (PDF tab me khul jaata hai).
    //    Use karo jab user ko file PADHNI hai.
    getFileView(fileId) {
        //  Object-style call jaan boojh ke: SDK me positional wala form
        //  (bucketId, fileId) ab deprecated hai. Neeche wala purana form pe hai,
        //  usko bhi kabhi convert kar dena.
        return this.bucket.getFileView({
            bucketId: conf.appwriteBucketId,
            fileId,
        });
    }

    // 4. Download File
    //    Content-Disposition: attachment header bhejta hai -> browser dikhata nahi,
    //    seedha Downloads me save karta hai. Use karo jab user ko file RAKHNI hai.
    getFileDownload(fileId) {
        return this.bucket.getFileDownload(
            conf.appwriteBucketId,
            fileId
        );
    }
}

const service = new Service()
export default service
//  is file me jha get lga h vha we are taking data from the  appwrite and baakio me we are sending data to appwrite

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
