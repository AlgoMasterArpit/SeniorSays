import React from 'react';

function Logo({ className = "100px" }) {
  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      {/* The Teal Lightning Bolt Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-8 h-8 text-teal-400"
      >
        <path
          fillRule="evenodd"
          d="M14.615 1.595a.75.75 0 0 1 .359.852L12.982 9.75h7.268a.75.75 0 0 1 .548 1.262l-10.5 11.25a.75.75 0 0 1-1.272-.71l1.992-7.302H3.75a.75.75 0 0 1-.548-1.262l10.5-11.25a.75.75 0 0 1 .913-.143Z"
          clipRule="evenodd"
        />
      </svg>

      {/* The Text: Senior (White) Says (Teal) */}
      <div className="text-2xl font-bold tracking-tight">
        <span className="text-white">Senior</span>
        <span className="text-teal-400">Says</span>
      </div>
    </div>
  );
}

export default Logo;