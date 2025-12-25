import React, {useEffect, useState} from 'react'
import appwriteService from "../appwrite/config";
import {Container, PostCard} from '../components'
import { Link } from 'react-router-dom';

function Home() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])

    return (
        <div className='w-full bg-slate-900 min-h-screen'>
            
            {/* ==============================================
               🚀 HERO SECTION (Centered Fix)
               ============================================== */}
            <div className="relative isolate pt-14 pb-12 lg:pt-24 lg:pb-32 overflow-hidden">
                
                {/* Background Glow */}
                <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
                    <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#14b8a6] to-[#0f766e] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
                </div>

                <Container>
                    {/* 🛠️ FIX: Added 'flex flex-col items-center' to force centering */}
                    <div className="flex flex-col items-center justify-center text-center mx-auto max-w-4xl px-4"> 
                        
                        {/* 1. Tagline Pill */}
                        <div className="mb-6 lg:mb-8 flex justify-center w-full">
                            <div className="relative rounded-full px-3 py-1 text-xs sm:text-sm leading-6 text-gray-400 ring-1 ring-white/10 hover:ring-white/20 bg-slate-800/50 backdrop-blur-sm">
                                <span className="text-teal-400 mr-2">⚡</span> 
                                Your gateway to placement success
                            </div>
                        </div>

                        {/* 2. Main Headline */}
                        <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-white text-center w-full">
                            Crack Your Dream <br className="hidden sm:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-500">
                                Campus Placement
                            </span>
                        </h1>

                        {/* 3. Sub-headline */}
                        <p className="mt-4 lg:mt-6 text-sm sm:text-lg leading-7 sm:leading-8 text-gray-400 max-w-2xl text-center">
                            Real interview experiences from seniors who've been there. Learn from their journeys, download resumes, and ace your interviews.
                        </p>

                        {/* 4. Action Buttons */}
                        <div className="mt-8 lg:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-x-6 w-full">
                            
                            <Link
                                to="/add-post"
                                className="w-full sm:w-auto text-center rounded-lg bg-teal-500 px-6 py-3 text-sm sm:text-base font-bold text-slate-900 shadow-sm hover:bg-teal-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400 transition-all hover:scale-105"
                            >
                                Share Your Experience <span aria-hidden="true">→</span>
                            </Link>

                            <Link
                                to="/all-posts"
                                className="w-full sm:w-auto text-center text-sm sm:text-base font-semibold leading-6 text-white border border-slate-700 px-6 py-3 rounded-lg hover:bg-slate-800 transition-all"
                            >
                                Browse Experiences
                            </Link>
                        </div>
                    </div>
                </Container>
            </div>

            {/* ==============================================
               📚 LATEST POSTS SECTION
               ============================================== */}
            <div className='py-8 lg:py-12 border-t border-slate-800'>
                <Container>
                    <div className="flex items-center justify-between mb-6 lg:mb-8 px-2">
                        <h2 className="text-xl sm:text-2xl font-bold text-white">Latest Stories</h2>
                        <Link to="/all-posts" className="text-teal-400 hover:text-teal-300 text-sm">View All</Link>
                    </div>

                    <div className='flex flex-wrap -mx-2'>
                        {posts.length === 0 ? (
                            <div className="w-full text-center py-10">
                                <p className="text-gray-500">No experiences shared yet. Be the first one!</p>
                            </div>
                        ) : (
                            posts.map((post) => (
                                <div key={post.$id} className='p-2 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4'>
                                    <PostCard 
                                        $id={post.$id}
                                        title={post.title}
                                        companyName={post.companyName}
                                        authorName={post.authorName}
                                        status={post.interviewOutcome} 
                                        jobType={post.roleType}
                                        rating={post.difficulty}
                                    />
                                </div>
                            ))
                        )}
                    </div>
                </Container>
            </div>
        </div>
    )
}

export default Home