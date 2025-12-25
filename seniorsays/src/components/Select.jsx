import React, { useId } from 'react'

function Select({
    options, // Expecting an array like ["active", "inactive"]
    label,
    className = "",
    ...props
}, ref) {
    
  const id = useId()

  return (
    <div className='w-full'>
      {label && <label htmlFor={id} className=''> {label} </label>}
      
      <select
        {...props}
        id={id}
        ref={ref}
        className={`px-3 py-2 rounded-lg bg-slate-800 text-white outline-none focus:bg-slate-700 focus:border-teal-400 border border-slate-600 w-full duration-200 ${className}`}
      >
        
        {/* Loop through the options array to create <option> tags */}
        {/*  we put ques mark bcs  ,options me agar value nhi hui and we looped to
         it will crash so we put ques mark */}
        {options?.map((option) => (
            //  option is unique so we used it as key and value me option denge kyuki usme actual value option ki aayegi
            
            <option key={option} value={option}>
                {option}
            </option>
        ))}

      </select>
    </div>
  )
}

// Another way to wrap with forwardRef (syntax choice, works the same as Input.jsx)
export default React.forwardRef(Select)  