import React from 'react'
import { Container, PostForm } from '../components'

function AddPost() {
  return (
    // 1. Min-h-screen: Taaki footer chipak na jaye agar form chota ho
    // 2. bg-slate-900: Dark theme maintain karne ke liye
    <div className='py-6 md:py-12 w-full min-h-screen bg-slate-900'>
        <Container>
            
            {/* Wrapper div for better layout */}
            <div className="max-w-4xl mx-auto">
                
                {/* Optional: Page Heading */}
                <div className="mb-6 md:mb-8 text-center md:text-left">
                    <h1 className="text-2xl md:text-3xl font-bold text-white">
                        Share your Interview Experience
                    </h1>
                    <p className="text-sm md:text-base text-gray-400 mt-2">
                        Help juniors by sharing what was asked.
                    </p>
                </div>

                {/* PostForm Wrapper - Card Look */}
                <div className="bg-gray-800 rounded-xl p-4 md:p-8 border border-slate-700 shadow-lg">
                    {/* Koi prop pass nahi kiya, matlab New Post banna hai */}
                    <PostForm />
                </div>

            </div>
        </Container>
    </div>
  )
}

export default AddPost