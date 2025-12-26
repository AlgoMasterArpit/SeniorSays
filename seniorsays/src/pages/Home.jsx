import React, {useEffect, useState} from 'react'
import appwriteService from "../appwrite/config";
import {Container, PostCard} from '../components'
import { Link } from 'react-router-dom';
// 👇 IMPORT NEW COMPONENT
import NoResults from '../components/NoResults'; 

function Home() {
    const [posts, setPosts] = useState([])
    // 👇 NEW STATE FOR SEARCH
    const [searchQuery, setSearchQuery] = useState('') 

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])

    // 👇 FILTERING LOGIC
    const filteredPosts = posts.filter((post) => {
        const query = searchQuery.toLowerCase();
        return (
            post.companyName?.toLowerCase().includes(query) ||
            post.title?.toLowerCase().includes(query) || 
            post.roleType?.toLowerCase().includes(query)
        );
    });

    return (
        <div className='w-full bg-slate-900 min-h-screen'>
            
            <div className="relative isolate pt-14 pb-12 lg:pt-24 lg:pb-32 overflow-hidden">
                <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
                    <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#14b8a6] to-[#0f766e] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
                </div>

                <Container>
                    <div className="flex flex-col items-center justify-center text-center mx-auto max-w-4xl px-4"> 
                        
                        <div className="mb-6 lg:mb-8 flex justify-center w-full">
                            <div className="relative rounded-full px-3 py-1 text-xs sm:text-sm leading-6 text-gray-400 ring-1 ring-white/10 hover:ring-white/20 bg-slate-800/50 backdrop-blur-sm">
                                <span className="text-teal-400 mr-2">⚡</span> 
                                Your gateway to placement success
                            </div>
                        </div>

                        <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-white text-center w-full">
                            Crack Your Dream <br className="hidden sm:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-500">
                                Campus Placement
                            </span>
                        </h1>

                        <p className="mt-4 lg:mt-6 text-sm sm:text-lg leading-7 sm:leading-8 text-gray-400 max-w-2xl text-center">
                            Real interview experiences from seniors who've been there. Learn from their journeys, download resumes, and ace your interviews.
                        </p>

                        {/* 👇 NEW SEARCH BAR SECTION */}
                        <div className="w-full max-w-md mt-8">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    {/* Search Icon */}
                                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    className="block w-full pl-10 pr-3 py-3 border border-slate-700 rounded-lg leading-5 bg-slate-800/50 text-gray-300 placeholder-gray-500 focus:outline-none focus:bg-slate-800 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 sm:text-sm transition-colors"
                                    placeholder="Search companies (e.g. Amazon, TCS)..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>

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

            {/* LATEST POSTS SECTION */}
            <div className='py-8 lg:py-12 border-t border-slate-800'>
                <Container>
                    <div className="flex items-center justify-between mb-6 lg:mb-8 px-2">
                        <h2 className="text-xl sm:text-2xl font-bold text-white">
                           {searchQuery ? `Results for "${searchQuery}"` : "Latest Stories"}
                        </h2>
                        {!searchQuery && (
                            <Link to="/all-posts" className="text-teal-400 hover:text-teal-300 text-sm">View All</Link>
                        )}
                    </div>

                    <div className='flex flex-wrap -mx-2'>
                        {/* 👇 UPDATED RENDERING LOGIC */}
                        {filteredPosts.length > 0 ? (
                            filteredPosts.map((post) => (
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
                        ) : (
                            // Show No Results Component if searching, else show "empty db" message
                            searchQuery ? (
                                <div className="w-full px-2">
                                    <NoResults onClear={() => setSearchQuery('')} />
                                </div>
                            ) : (
                                <div className="w-full text-center py-10">
                                    <p className="text-gray-500">No experiences shared yet.</p>
                                </div>
                            )
                        )}
                    </div>
                </Container>
            </div>
        </div>
    )
}

export default Home