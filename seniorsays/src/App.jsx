import React, {useState, useEffect} from 'react'
import {useDispatch} from 'react-redux'
import authService from './appwrite/auth'
 import {login, logout} from './store/authSlice'
 import { Header ,Footer} from './components'
import { Outlet } from 'react-router-dom'

function App() {
  // shuru me there will be a loader in website that will load the fdata from appwrite , suki starting state is true
   const [loading , setloading]=useState(true)
const  dispatch= useDispatch()
//  humne useeffect chala ki agar user exist karta , yaani login h
//  to tum usko diapatch karo to store me jo auth.slice me 
//  login  h usme userData will change
//  else store me dikhayegga ki aap log out hi ho 

useEffect(()=>{
 authService.getCurrentuser()
 .then ((userData)=>{
if ( userData){
  dispatch(login(userData))
}
else {
  dispatch(logout())
}

 } )
 .finally(()=>setloading(false))/*  if user exist ya fir we have logout wala page the 
 loading will be off*/

},[])
  return !loading?(
    <div className='min-h-screen w-full flex flex-wrap content-between  bg-slate-900'>
      <div className='w-full block'>
        <Header/>
       <main>
           <Outlet /> 
        </main>
        <Footer/>
      </div>
    </div>
  ):<div className='flex items-center justify-center min-h-screen bg-slate-900'>
      {/* Yeh ek ghumne wala gola (Spinner) hai */}
      <div className="w-16 h-16 border-4 border-slate-900 border-t-teal-400 rounded-full animate-spin"></div>
      {/* Optional Text */}
      <span className="ml-4 text-teal-400 text-xl font-semibold">Loading SeniorSays...</span>
    </div>

}

export default App
