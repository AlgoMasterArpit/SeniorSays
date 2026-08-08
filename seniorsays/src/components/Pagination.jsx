import React from 'react'

// Prev / Next pagination. Home aur AllPosts dono isi ko use karte hain.
// Native <button disabled> use kiya hai — pehle/aakhri page pe browser khud click rok deta hai,
// alag se koi guard likhne ki zaroorat nahi.
function Pagination({ currentPage, totalPages, onPageChange }) {
    // Ek hi page hai (ya kuch bhi nahi) -> pagination dikhane ka matlab nahi
    if (totalPages <= 1) return null;

    const btn = "px-4 py-2 rounded-lg text-sm font-semibold border transition-colors " +
        "bg-slate-800 text-gray-300 border-slate-700 hover:border-teal-500 hover:text-teal-400 " +
        "disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-slate-700 disabled:hover:text-gray-300";

    return (
        <div className="w-full flex items-center justify-center gap-3 mt-8">
            <button
                type="button"
                className={btn}
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
            >
                ← Prev
            </button>

            <span className="text-gray-400 text-sm px-2">
                Page <span className="text-white font-semibold">{currentPage}</span> of {totalPages}
            </span>

            <button
                type="button"
                className={btn}
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
            >
                Next →
            </button>
        </div>
    )
}

export default Pagination
