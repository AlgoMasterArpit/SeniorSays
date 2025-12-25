import React from "react";

function Button({
    children,               // The text inside (e.g., "Login", "Sign Up")
    type = "button",        // Default type
    bgColor = "bg-teal-400", // Default color (Your Brand Color)
    textColor = "text-slate-900", // Default text color
    className = "",         // Any extra classes you want to add later
    ...props                // Any other props (onClick, disabled, etc.)
}) {
    return (
        <button
            type={type}
            className={`px-4 py-2 rounded-lg font-bold duration-200 hover:opacity-90 ${bgColor} ${textColor} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}

export default Button;