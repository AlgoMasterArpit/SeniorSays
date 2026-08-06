import React from 'react'
import { Container, PostCard, Pagination } from '../components'
import NoResults from '../components/NoResults'; // 👈 IMPORT ADDED
import { usePosts } from '../hooks/usePosts';

function AllPosts() {
    // Data, search aur pagination — sab hook me. Home bhi yahi use karta hai.
    // Hook sirf status="active" posts laata hai, toh drafts ab yahan nahi aayenge.
    const {
        visiblePosts, filteredPosts,
        searchQuery, setSearchQuery,
        currentPage, totalPages, goToPage, listRef,
    } = usePosts();

  return (
    <div ref={listRef} className='w-full py-8 scroll-mt-4'>
        <Container>
            {/* 👇 SEARCH BAR SECTION ADDED */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <h1 className="text-2xl font-bold text-white">
                    All Experiences
                    {searchQuery && <span className="text-gray-400 text-base font-normal ml-2">({filteredPosts.length} found)</span>}
                </h1>
                <div className="relative w-full md:w-1/3">
                    <input
                        type="text"
                        className="w-full px-4 py-2 pl-10 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-teal-500 placeholder-gray-500"
                        placeholder="Search companies, roles..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {/* Search Icon */}
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>
            </div>

            <div className='flex flex-wrap'>
                {/* 👇 UPDATED RENDERING LOGIC — visiblePosts = current page ke 10 cards */}
                {visiblePosts.length > 0 ? (
                    visiblePosts.map((post) => (
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
                    ))
                ) : (
                    // 👇 SHOW NO RESULTS COMPONENT
                    searchQuery ? (
                        <div className="w-full">
                            <NoResults onClear={() => setSearchQuery('')} />
                        </div>
                    ) : (
                        <div className="w-full text-center text-gray-500 mt-10">
                            No posts available yet.
                        </div>
                    )
                )}
            </div>

            {/* 👇 PAGINATION (ek hi page ho toh khud ko render nahi karta) */}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={goToPage}
            />
            </Container>
    </div>
  )
}

export default AllPosts