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
    <div className='py-8'>
        <Container>
            {/* Magic: Hum yahan <PostForm post={post} /> likh rahe hain. Hum post ka data prop ke through form mein bhej rahe hain 
            taaki form Pre-filled (bhara hua) khule. */}
            <PostForm post={post} />
        </Container>
    </div>
  ) : null
}

export default EditPost