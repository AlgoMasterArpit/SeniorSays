import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

export default function Protected({children, authentication = true}) {

    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    
    // Redux store se poocho: "Kya user abhi login hai?"
    const authStatus = useSelector(state => state.auth.status)

    useEffect(() => {
        // TODO: make it more easy to understand

        // if (authStatus === true){
        //     navigate("/")
        // } else if (authStatus === false) {
        //     navigate("/login")
        // }
        
        // PAHALA CHECK:
        // Hame chahiye authentication (authentication = true matlab page private  h) 
        // lekin user ka status hai false (authStatus !== true)
        // Matlab: Private page par bina login kiye aana chahta hai -> Login par bhejo

        // true&fasle!==true=>matlab true ho gya and it send to login page
        if(authentication && authStatus !== authentication){
            navigate("/login")
        } 
        
        // DUSRA CHECK:
        // Hame authentication nahi chahiye (authentication = false, matlab page is public jaise Login page)
        // lekin user ka status hai true (authStatus !== false)
        // Matlab: User already login hai fir bhi Login page khol raha hai -> Home par bhejo
        else if(!authentication && authStatus !== authentication){
            navigate("/")
        }
        
        // Checking khatam, ab page dikha do
        setLoader(false)

    }, [authStatus, navigate, authentication])

  // Jab tak checking chal rahi hai, tab tak "Loading..." dikhao, warna content (children)

//    agar useeffect se pta chala user login h toh loader false hua  and ye return vala code  chala
  return loader ? <div className='flex items-center justify-center min-h-screen bg-slate-900'>
      {/* Yeh ek ghumne wala gola (Spinner) hai */}
      <div className="w-16 h-16 border-4 border-slate-900 border-t-teal-400 rounded-full animate-spin"></div>
      {/* Optional Text */}
      <span className="ml-4 text-teal-400 text-xl font-semibold">Loading SeniorSays...</span>
    </div> : <>{children}</>
}