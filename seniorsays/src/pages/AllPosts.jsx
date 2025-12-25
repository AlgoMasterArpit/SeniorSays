import React, {useState, useEffect} from 'react'
import { Container, PostCard } from '../components'
import appwriteService from "../appwrite/config";

function AllPosts() {
    const [posts, setPosts] = useState([])
    
    useEffect(() => {
        // Sirf active posts lana (Jo humne config me default set kiya hai)
        //  getposts will give array so we take empty array
        //  taking all posts from appwrite
        appwriteService.getPosts([]).then((posts) => {
            if (posts) {
                //  server se aaya data we store in variable posts
                // // Server se aaya hua 'posts' variable aisa dikhta hai:
// {
//     "total": 5,           // Kitne posts mile
//     "documents": [        // <--- ASLI MAAL YAHAN HAI
//         { "title": "Amazon", "content": "..." },
//         { "title": "Google", "content": "..." }
//     ]
// } setpost  update the state
                setPosts(posts.documents)
            }
        })
    }, [])

  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {posts.map((post) => (
                    <div key={post.$id} className='p-2 w-full md:w-1/4'>
                        <PostCard 
                            $id={post.$id}
                            title={post.title}
                            companyName={post.companyName}
                            authorName={post.authorName}
                            status={post.status}
                            jobType={post.roleType}
                            rating={post.difficulty}
                            postDate={new Date(post.$createdAt).toLocaleDateString()}
                        />
                    </div>
                ))}
            </div>
            </Container>
    </div>
  )
}

export default AllPosts 
  