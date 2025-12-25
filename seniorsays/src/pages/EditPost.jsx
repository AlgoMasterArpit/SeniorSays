import React, {useEffect, useState} from 'react'
import {Container, PostForm} from '../components'
import appwriteService from "../appwrite/config";
import { useNavigate,  useParams } from 'react-router-dom';

function EditPost() {
    //  since we wanna store the post we get from database  so used usestate

    const [post, setPosts] = useState(null)
    const {slug} = useParams() // URL se slug nikalo
    const navigate = useNavigate()

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    setPosts(post)
                }
            })
        } else {
            // useNavigate:

// Kyun? Agar maan lijiye slug galat hai, ya post delete ho chuka hai, toh user ko wahan khada nahi rakhna hai.

// Maps('/') usey wapas Home page par bhej dega (Kick out).
//  isiliye we imported navigate
            navigate('/')
        }
    }, [slug, navigate])

  // Agar post data mil gaya, toh Form dikhao
  return post ? (
    // Updated: Added min-h-screen, dark background, and responsive vertical padding
    <div className='py-6 md:py-12 w-full min-h-screen bg-slate-900'>
        <Container>
            
            {/* Wrapper div to limit width and center content on large screens */}
            <div className="max-w-4xl mx-auto">
                
                {/* Optional: Edit Heading for better UX */}
                <div className="mb-6 md:mb-8 text-center md:text-left">
                    <h1 className="text-2xl md:text-3xl font-bold text-white">
                        Edit Post
                    </h1>
                </div>

                {/* Card Wrapper: Gray background, rounded corners, and responsive padding (p-4 mobile, p-8 desktop) */}
                <div className="bg-gray-800 rounded-xl p-4 md:p-8 border border-slate-700 shadow-lg">
                    {/* Magic: Hum yahan <PostForm post={post} /> likh rahe hain. Hum post ka data prop ke through form mein bhej rahe hain 
                    taaki form Pre-filled (bhara hua) khule. */}
                    <PostForm post={post} />
                </div>
                
            </div>
        </Container>
    </div>
  ) : null
}

export default EditPost