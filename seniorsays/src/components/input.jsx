import React, { useId } from 'react'

const Input = React.forwardRef( function Input({
    label, /*means username , email vagera*/
    type = "text",
    className = "",
    ...props
}, ref) {

    const id = useId()

    return (
        <div className='w-full'>
            {label && <label 
                className='inline-block mb-1 pl-1 text-gray-300' 
               
               htmlFor={id}>
                {/* this generate unique it */}
                    {label}
                </label>
            }
            <input
                type={type}
                className={`px-3 py-2 rounded-lg bg-slate-800 text-white outline-none focus:bg-slate-700 focus:border-teal-400 border border-slate-600 w-full duration-200 ${className}`}
                ref={ref} // <--- This is where the magic happens
                {...props}
                id={id}
            />
        </div>
    )
})

//  here label and input me same id pass karne ki wajah se 
//  they are connected  
export default Input

// The <input>: This is the Box. It is the actual interactive field where the user types their text (like their email or password).

// In SeniorSays: It is that dark rectangle with the Teal border.

// The <label>: This is the Name Tag. It is the text sitting right above or beside the box that tells the user what they are supposed to type inside.

// In SeniorSays: It is the text that says "Email:" or "Password:".