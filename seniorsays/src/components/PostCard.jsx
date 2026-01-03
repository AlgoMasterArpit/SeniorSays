import React from 'react'
import { Link } from 'react-router-dom'

function PostCard({
    $id,/* yha id ko dollar id karke likhte*/
    title,
    // featuredImage prop removed since we don't need it anymore
    companyName = "Company", 
    status = "Pending",
    jobType = "Full Time",
    rating = "0",
    authorName = "Senior",
    batchYear = "2024",
    postDate = "Recently",
   
}) {

    // Helper: Badge Colors
    const getStatusColor = (currentStatus) => {
        const lowerStatus = currentStatus?.toLowerCase();
        if (lowerStatus === 'selected') return 'text-green-400 bg-green-400/10 border-green-400/20';
        if (lowerStatus === 'rejected') return 'text-red-400 bg-red-400/10 border-red-400/20';
        return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
    }

    return (

        //    {`/post/${$id}`} Isi se agle page (Post.jsx) ko pata chalega ki kaunsa experience kholna hai.
        <Link to={`/post/${$id}`} className='w-full h-full block group'>

            {/* group: Ye ek Tailwind trick hai. Humne poore card ko group bola hai, taaki jab hum card par hover karein, toh andar ka Arrow move kare. */}
            <div className='bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-teal-400 transition-all duration-300 hover:-translate-y-1 shadow-lg h-full flex flex-col justify-between'>
                
                {/* TOP SECTION: Letter Avatar & Title */}
                <div>
                   
                    <div className='flex gap-4 items-start mb-4'>
                        
                        {/* Company Letter Avatar (Always shows first letter) */}
                        <div className='w-12 h-12 flex-shrink-0 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center shadow-inner'>
                            <span className='text-2xl font-bold text-teal-400'>
                                 {/* Agar Company hai "Amazon", toh charAt(0) lega "A". */}
                                {companyName.charAt(0).toUpperCase()}
                            </span>
                        </div>
                        
                        {/* Title & Company Name */}
                        <div>
                            <h2 className='text-lg font-bold text-white leading-tight group-hover:text-teal-400 transition-colors'>
                                {title}
                            </h2>
                            <div className="text-gray-500 text-sm mt-2">
                {/* 👇 Yahan Logic Lagayein */}
                By: <span className="font-semibold text-blue-600">
                    {authorName ? authorName : "Anonymous Senior"}
                </span>
            </div>
                            <p className='text-gray-400 text-sm mt-1'>{companyName}</p>
                        </div>
                    </div>

                    {/* BADGES ROW */}
                    <div className='flex flex-wrap gap-2 mb-6'>
                        {/* Status */}
                        <span className={`px-3 py-1 rounded-md text-xs font-semibold border ${getStatusColor(status)}`}>
                            {status}
                        </span>
                        
                        {/* Type */}
                        <span className='px-3 py-1 rounded-md text-xs font-semibold bg-slate-700 text-gray-300 border border-slate-600'>
                            {jobType}
                        </span>

                        {/* Rating */}
                        <span className='px-3 py-1 rounded-md text-xs font-semibold bg-teal-900/30 text-teal-400 border border-teal-500/30 flex items-center gap-1'>
                             ★ {rating}/5
                        </span>
                    </div>
                </div>

                {/* FOOTER: Author & Arrow */}
                <div className='flex items-center justify-between pt-4 border-t border-slate-700 mt-auto'>
                    <div className='flex flex-col'>
                         <span className='text-sm text-gray-300 flex items-center gap-2 font-medium'>
                            <span className="text-lg">👤</span> {authorName} <span className='text-gray-500 text-xs'>({batchYear})</span>
                         </span>
                         <span className='text-xs text-gray-500 mt-1 pl-1'>📅 {postDate}</span>
                    </div>
                    
                    <div className='text-slate-500 group-hover:text-teal-400 group-hover:translate-x-1 transition-transform'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                        </svg>
                    </div>
                </div>

            </div>
        </Link>
    )
}

export default PostCard