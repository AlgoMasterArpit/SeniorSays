import React from 'react'

function NoResults({ onClear }) {
  return (
    <div className="w-full p-8 text-center border border-slate-800 rounded-xl bg-slate-900/50 mt-4">
      <div className="flex flex-col items-center justify-center gap-2">
        <p className="text-gray-400 text-lg font-medium">
          No experiences found matching your filters.
        </p>
        
        {/* Clear Filters Button */}
        <button 
          onClick={onClear}
          className="mt-2 px-4 py-2 text-sm font-semibold text-white transition-all bg-transparent border rounded-lg border-slate-700 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-slate-900"
        >
          Clear Filters
        </button>
      </div>
    </div>
  )
}

export default NoResults