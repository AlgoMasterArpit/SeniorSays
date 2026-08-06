import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Container, Pagination } from '../components'
import { usePosts } from '../hooks/usePosts'

// Senior ke apne posts — draft aur published dono ek jagah.
// Public list (Home / AllPosts) me draft kabhi nahi aate, isliye draft dhoondhne
// ki ekmatra jagah yahi hai.
function MyPosts() {
    const userData = useSelector((state) => state.auth.userData);

    // userId dene se hook "mere posts" mode me chalta hai — status filter hata deta hai.
    // App.jsx auth resolve hone tak kuch render nahi karta, isliye userData yahan pakka hai.
    const { visiblePosts, filteredPosts, currentPage, totalPages, goToPage, listRef } =
        usePosts({ userId: userData?.$id });

    const drafts = filteredPosts.filter((post) => post.status !== "active").length;

    return (
        <div ref={listRef} className='w-full py-8 min-h-screen bg-slate-900 scroll-mt-4'>
            <Container>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
                    <div>
                        <h1 className="text-2xl font-bold text-white">My Experiences</h1>
                        <p className="text-gray-500 text-sm mt-1">
                            {filteredPosts.length} total
                            {drafts > 0 && <span className="text-orange-400"> · {drafts} draft pending</span>}
                        </p>
                    </div>
                    <Link to="/add-post">
                        <button className="px-4 py-2 rounded-lg bg-teal-400 text-slate-900 font-bold hover:opacity-90">
                            + New Experience
                        </button>
                    </Link>
                </div>

                {visiblePosts.length > 0 ? (
                    <div className="flex flex-col gap-3">
                        {visiblePosts.map((post) => {
                            const isDraft = post.status !== "active";
                            return (
                                <div
                                    key={post.$id}
                                    className="bg-slate-800 border border-slate-700 rounded-xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3"
                                >
                                    <div className="min-w-0">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <h2 className="text-white font-semibold truncate">{post.title}</h2>
                                            {/* Draft ko saaf marking — warna senior ko pata hi nahi chalega
                                                ki ye post public nahi hui */}
                                            <span className={`px-2 py-0.5 rounded text-xs font-semibold border ${
                                                isDraft
                                                    ? "bg-orange-500/10 text-orange-400 border-orange-500/30"
                                                    : "bg-green-400/10 text-green-400 border-green-400/20"
                                            }`}>
                                                {isDraft ? "Draft — not public" : "Published"}
                                            </span>
                                        </div>
                                        <p className="text-gray-500 text-sm mt-1 truncate">
                                            {post.companyName} · {post.roleType} · {new Date(post.$createdAt).toLocaleDateString()}
                                        </p>
                                    </div>

                                    <div className="flex gap-2 flex-shrink-0">
                                        <Link to={`/edit-post/${post.$id}`}>
                                            <button className="px-4 py-2 rounded-lg text-sm font-semibold bg-teal-400 text-slate-900 hover:opacity-90">
                                                {isDraft ? "Finish writing" : "Edit"}
                                            </button>
                                        </Link>
                                        {/* Draft ka public page kisi kaam ka nahi — sirf published pe View */}
                                        {!isDraft && (
                                            <Link to={`/post/${post.$id}`}>
                                                <button className="px-4 py-2 rounded-lg text-sm font-semibold bg-slate-700 text-white border border-slate-600 hover:border-teal-500">
                                                    View
                                                </button>
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center py-16 bg-slate-800/40 border border-slate-700 rounded-xl">
                        <p className="text-gray-400">Abhi tak koi experience share nahi kiya.</p>
                        <Link to="/add-post" className="text-teal-400 font-semibold hover:underline mt-2 inline-block">
                            Pehla experience likhein →
                        </Link>
                    </div>
                )}

                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={goToPage}
                />
            </Container>
        </div>
    )
}

export default MyPosts
