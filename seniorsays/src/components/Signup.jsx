import React, { useState ,useEffect} from 'react'
import authService from '../appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../store/authSlice'
import { Logo } from './index'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import Button from './Button'
function Signup() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    //  agar already login h user and again login kar rha toh this useeffect will delete poorana session
useEffect(() => {
        const clearSession = async () => {
            try {
                // Koshish karo logout karne ki
                await authService.logout();
                console.log("Purana session clear kar diya!");
            } catch (error) {
                // Agar pehle se logout tha, toh koi baat nahi
                console.log("Session pehle se clear tha.");
            }
        };
        clearSession();
    }, []);
   const create = async (data) => {
        setError("")
        try {
            // 1. Safety Logout: Submit dabate hi purana session clear karein
            // Taaki "Session Active" wala error aaye hi nahi
            try {
                await authService.logout();
            } catch (e) {
                // Agar logout fail hua ya koi session nahi tha, toh ignore karein
                console.log("No active session to logout");
            }

            // 2. Create Account
            const userData = await authService.createAccount(data)
            
            if (userData) {
                const session = await authService.login({ email: data.email, password: data.password })
                if (session) {
                    const currentUser = await authService.getCurrentuser()
                    if (currentUser) dispatch(login(currentUser));
                    navigate("/")
                }
            }
        } catch (error) {
            // ✅ ERROR HANDLING LOGIC
            // Agar error "Session" se related hai, iska matlab account ban gaya hai 
            // par auto-login fail hua. Unhe Login page bhej do.
            const errorMessage = error.message.toLowerCase();
            
            if (errorMessage.includes("session") || errorMessage.includes("active")) {
                console.log("Account created but session active. Redirecting to login.");
                navigate("/login"); 
            } else {
                // Agar koi aur error hai (jaise "Email already exists"), toh error dikhao
                setError(error.message)
            }
        }
    }
    return (
        <div className="flex min-h-screen w-full bg-[#0f172a]">
            
            {/* ================= LEFT SIDE (BRANDING) ================= */}
            <div className="hidden lg:flex w-1/2 flex-col justify-center px-12 relative overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-teal-500/20 rounded-full blur-[120px]"></div>
                
                <div className="relative z-10">
                    <div className="mb-8">
                        <Logo width="150px" />
                    </div>
                    <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
                        Join the <br />
                        <span className="text-teal-400">Community</span>
                    </h1>
                    <p className="text-gray-400 text-lg mb-12 max-w-md">
                        Create an account to unlock full access to interview experiences, resume templates, and senior guidance.
                    </p>
                    <div className="space-y-6">
                        {[
                            "Access exclusive senior insights",
                            "Bookmark your favorite stories",
                            "Contribute to the legacy"
                        ].map((item, index) => (
                            <div key={index} className="flex items-center gap-4">
                                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-teal-500/20 text-teal-400 font-bold text-sm">
                                    {index + 1}
                                </span>
                                <span className="text-gray-300 font-medium">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ================= RIGHT SIDE (FORM) ================= */}
            <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
                <div className="w-full max-w-md">
                    <div className="mb-10 text-center lg:text-left">
                        <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
                        <p className="text-gray-400">Start your placement journey today</p>
                    </div>

                    {error && <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded text-red-500 text-sm text-center">{error}</div>}

                    <form onSubmit={handleSubmit(create)} className="space-y-5">
                        
                        {/* Full Name */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">Full Name</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <input
                                    placeholder="John Doe"
                                    className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:border-teal-400 text-white placeholder-gray-500 transition-colors"
                                    {...register("name", { required: true })}
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">Email</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <input
                                    type="email"
                                    placeholder="you@college.edu"
                                    className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:border-teal-400 text-white placeholder-gray-500 transition-colors"
                                    {...register("email", { required: true })}
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:border-teal-400 text-white placeholder-gray-500 transition-colors"
                                    {...register("password", { required: true })}
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-400 text-slate-900 font-bold py-3 px-4 rounded-lg transition-all transform active:scale-95"
                        >
                            Create Account
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                        </Button>
                    </form>

                    <p className="mt-8 text-center text-gray-400 text-sm">
                        Already have an account?{' '}
                        <Link to="/login" className="text-teal-400 font-semibold hover:text-teal-300 hover:underline">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Signup

//  ye data jo pass kar rhe ye kha se aaya?
// handleSubmit function ne turant saare inputs (jinke upar register laga tha) ko check kiya aur unka ek Packet (Object) banaya.

// Wo packet kuch aisa dikhta hai:

// JavaScript
 
// // Yeh hai wo 'data' variable
// {
//     name: "Amit Kumar",      // register("name") se aaya
//     email: "amit@test.com",  // register("email") se aaya
//     password: "12345"        // register("password") se aaya
// }



// const create = async(data) => { // <--- Yahan wo packet receive hua 'data' naam se
// console.log(data.email) // Print karega: amit@test.com
    
//     // Phir humne us packet ko aage Appwrite ko de diya
//     const userData = await authService.createAccount(data) 
// }