// Yeh file aapki website ka "Reading Page" hai. 📖

// Jab koi user Home Page par kisi card par click karta hai, toh wo is page par aata hai taaki pura Interview Experience padh sake.

import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    // Check if the current user is the author of the post
    // Check 1 (post && userData): Pehle confirm karo ki Post load ho chuka hai aur User logged-in hai.

    // Check 2 (post.userId === userData.$id):

    // Kya Post likhne wale ki ID (userId) aur abhi Login user ki ID ($id) same hai?
    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                // // Step 2: Agar post mil gaya, toh State mein save kar lo
                if (post) setPost(post);
                // Step 3: Agar post nahi mila (shayad delete ho gaya), toh Home bhejo
                else navigate("/");
            });
            // Slug hi nahi hai toh seedha Home bhejo
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        // / Step 1: Post (Text content) delete karo
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                // // Step 2: Post delete ho gaya? Ab uska Resume bhi uda do (Storage se)
                appwriteService.deleteFile(post.resumeFileId);
                // // Step 3: Kaam khatam, ab Home page par wapas jao
                navigate("/");
            }
        });
    };
    const getStatusTextColor = (status) => {
        const lowerStatus = status?.toLowerCase();
        if (lowerStatus === 'selected') return "text-green-400";
        if (lowerStatus === 'rejected') return "text-red-400"; // 🔴 Ye raha Red color
        return "text-yellow-400";
    };
    return post ? (
        // Updated: Added min-h-screen and bg-slate-900 for dark theme consistency
        // Updated: Responsive padding (py-6 mobile, py-12 desktop)
        <div className="py-6 md:py-12 min-h-screen bg-slate-900">
            <Container>
                
                {/* 1. Header Section: Title & Edit Buttons */}
                {/* Updated: Flex-col on mobile (stack vertically), Flex-row on desktop */}
                <div className="w-full flex flex-col md:flex-row md:justify-between md:items-start mb-6 border-b border-slate-700 pb-4 gap-4 md:gap-0">
                    <div className="w-full md:w-auto">
                        {/* Updated: Responsive Text sizes */}
                        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight">
                            {post.title}
                        </h1>
                        <p className="text-teal-400 mt-2 text-base md:text-lg font-semibold">
                            {post.companyName} <span className="text-gray-500 text-sm">({post.roleType})</span>
                        </p>
                    </div>
                    
                    {/* Only show Edit/Delete if user is the Author */}
                    {isAuthor && (
                        <div className="flex gap-2 w-full md:w-auto mt-2 md:mt-0">
                            <Link to={`/edit-post/${post.$id}`} className="w-1/2 md:w-auto">
                                <Button bgColor="bg-green-500" className="mr-0 md:mr-3 w-full md:w-auto">
                                    Edit
                                </Button>
                            </Link>
                            <div className="w-1/2 md:w-auto">
                                <Button bgColor="bg-red-500" onClick={deletePost} className="w-full md:w-auto">
                                    Delete
                                </Button>
                            </div>
                        </div>
                    )}
                </div>

                {/* 2. Badges Row (Outcome, Difficulty, Status) */}
                {/* Already using flex-wrap, keeping it. Added w-full styling for badges on tiny screens if needed */}
                <div className="flex flex-wrap gap-3 md:gap-4 mb-8">
                   <span className="px-3 md:px-4 py-2 bg-slate-800 rounded-lg text-gray-300 border border-slate-700 text-xs md:text-sm">
                
                {/* 👇 Yahan function call kiya */}
                Outcome: <strong className={`${getStatusTextColor(post.interviewOutcome)} ml-1`}>
                    {post.interviewOutcome}
                </strong>

            </span>
                    <span className="px-3 md:px-4 py-2 bg-slate-800 rounded-lg text-gray-300 border border-slate-700 text-xs md:text-sm">
                        Difficulty: <strong className="text-teal-400 ml-1">{post.difficulty}/5</strong>
                    </span>
                    <span className="px-3 md:px-4 py-2 bg-slate-800 rounded-lg text-gray-300 border border-slate-700 text-xs md:text-sm">
                        Status: <span className="ml-1">{post.status}</span>
                    </span>
                </div>

                {/* 3. Resume Download Section */}
                {post.resumeFileId && (
                    // Updated: Stack on mobile (flex-col), Row on desktop (sm:flex-row)
                    <div className="mb-8 p-4 bg-slate-800/50 border border-slate-700 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
                        <div className="flex items-center gap-3 w-full sm:w-auto">
                            <span className="text-2xl">📄</span>
                            <div>
                                <h3 className="text-white font-semibold">Attached Resume</h3>
                                <p className="text-gray-500 text-sm">PDF Document</p>
                            </div>
                        </div>
                        <a 
                            href={appwriteService.getFileDownload(post.resumeFileId)} // Using your new download method!
                            // Updated: Full width button on mobile for easier tapping
                            className="w-full sm:w-auto text-center bg-teal-500 hover:bg-teal-600 text-slate-900 font-bold py-2 px-6 rounded-lg transition"
                        >
                            Download
                        </a>
                    </div>
                )}

                {/* 4. Main Content (Rich Text) */}
                {/* Updated: text-sm on mobile, text-base on desktop for readability */}
                <div className="browser-css text-gray-300 leading-relaxed text-sm md:text-base overflow-hidden">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null;
}




// 1. React Hooks 🎣
// JavaScript

// import React, { useEffect, useState } from "react";
// useState:

// Kyu chahiye? Jab hum Database se post laayenge, toh us data ko kahin store karna padega taaki wo screen par dikh sake. Hum post naam ka ek state banayenge jo shuru mein null hoga, aur data aane par bhar jayega.

// useEffect:

// Kyu chahiye? Ye hamara "Trigger" hai. Hum chahte hain ki jaise hi page load ho, code turant database ke paas bhaage aur data lekar aaye. useEffect yahi kaam karta hai.

// 2. Routing Tools Maps 🗺️
// JavaScript

// import { Link, useNavigate, useParams } from "react-router-dom";
// Link:

// Use: Edit button ke liye.

// Reason: Jab Author "Edit" par click karega, toh bina page refresh kiye usse /edit-post wale page par bhejne ke liye.

// useNavigate:

// Use: User ko kick out karne ke liye.

// Reason: Agar senior ne post delete kar diya, toh hum usey wahan khada nahi rakhenge. Maps("/") usey wapas Home page par bhej dega.

// useParams:

// Use: URL padhne ke liye.

// Reason: URL kuch aisa hoga: seniorsays.com/post/amazon-interview. useParams us last wale hisse (amazon-interview) ko pakadta hai. Isi ID (slug) se toh hum database mein dhoondhenge ki kaunsa post dikhana hai.

// 3. Backend Manager 🤵‍♂️
// JavaScript

// import appwriteService from "../appwrite/config";
// Kyu chahiye?

// Saara data Appwrite ke paas hai. Yeh file hamara agent hai jo Appwrite se baat karta hai.

// Isi ke andar getPost(), deletePost(), aur getFileDownload() jaise functions chupe hue hain jo is page par use honge.

// 4. UI Components 🎨
// JavaScript

// import { Button, Container } from "../components";
// Container:

// Reason: Content ko screen ke beech (Center) mein rakhne ke liye aur side mein breathing space (margin) dene ke liye.

// Button:

// Reason: Delete aur Edit buttons ke liye humne ek common Button component banaya tha taaki poori website par buttons ek jaise dikhein.

// 5. HTML Parser 🧩
// JavaScript

// import parse from "html-react-parser";
// Problem: Database mein aapka content aise save hai: <p>Hello <b>World</b></p>. Agar aap isey seedha React mein likhenge, toh screen par tags bhi dikhenge.

// Solution: parse() function in tags ko Real HTML mein convert karta hai.

// <p> ban jayega Paragraph.

// <b> ban jayega Bold text.

// 6. Redux State (Authentication) 🔐
// JavaScript

// import { useSelector } from "react-redux";
// Kyu chahiye?

// Humein ye pata karna hai ki "Abhi kaun login hai?"

// useSelector Redux store mein jakar userData lata hai.

// Magic Logic: Phir hum check karte hain:

// Kya Login User ID == Post Author ID hai?

// Agar haan, tabhi hum Edit/Delete buttons dikhate hain.