import React from 'react'
import { Container, PostForm } from '../components'

function AddPost() {
  return (
    <div className='py-8'>
        <Container>
            {/* Koi prop pass nahi kiya, matlab New Post banna hai */}
            <PostForm />
        </Container>
    </div>
  )
}

export default AddPost