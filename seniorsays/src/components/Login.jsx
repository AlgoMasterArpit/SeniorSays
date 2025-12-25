
//                 {/*  apos= apostraphe , nbps= non breaking space  ,   to give space between text and signup butt on */}
//                 Don&apos;t have an account?&nbsp;
//                

//             {/* Error Message Display (Only if error exists) */}
//             {error && <p className="text-red-500 mt-8 text-center">{error}</p>}

//             {/* The Actual Form */}
//             {/* handleSubmit ek wrapper hai jo React Hook Form deta hai */}
//            

//                    
//                         // Yahan 'register' wahi "wire" hai jo Input.jsx ke forwardRef me ja rahi hai
//                         
//                      
//             
import React, { useState,useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import { Button, Logo } from "./index" // Hum Button use karenge, par Input custom banayenge design match karne ke liye
import { useDispatch } from "react-redux"
import authService from "../appwrite/auth"
import { useForm } from "react-hook-form"

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState("")
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
    const login = async (data) => {
        // / Purane errors saaf karo good practice for login and signup
        setError("")
        try {
            // // 1. Appwrite se Login karo (Session banao)
            const session = await authService.login(data)
            if (session) {
                // / 2. Agar login success, toh User ka data mangwao
                //                 //  userdata aise hi nikalta h
                const userData = await authService.getCurrentuser()
                // / 3. Redux Store ko update karo ki "Bhai, user aa gaya hai"
                if (userData) dispatch(authLogin(userData));
                // Home page par bhej do 
                navigate("/")
            }
        } catch (error) {
            //  Agar password galat hai ya user nahi mila, to error dikhao
            setError(error.message)
        }
    }

    return (
        <div className="flex min-h-screen w-full bg-[#0f172a]">

            {/* ================= LEFT SIDE (BRANDING) ================= */}
            {/* Hidden on mobile, visible on lg screens */}
            <div className="hidden lg:flex w-1/2 flex-col justify-center px-12 relative overflow-hidden">
                {/* Background Glow */}
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-teal-500/20 rounded-full blur-[120px]"></div>

                <div className="relative z-10">
                    <div className="mb-8">
                        <Logo width="150px" />
                    </div>

                    <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
                        Your Journey to <br />
                        <span className="text-teal-400">Success Starts Here</span>
                    </h1>

                    <p className="text-gray-400 text-lg mb-12 max-w-md">
                        Join thousands of students who've cracked their dream placements with real interview experiences and insider tips.
                    </p>

                    {/* Feature List */}
                    <div className="space-y-6">
                        {[
                            "Read real interview experiences",
                            "Download resumes that got selected",
                            "Share your story to help juniors"
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

                    {/* Header */}
                    <div className="mb-10 text-center lg:text-left">
                        <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
                        <p className="text-gray-400">Enter your credentials to continue</p>
                    </div>

                    {error && <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded text-red-500 text-sm text-center">{error}</div>}
                    {/* handleSubmit ek wrapper hai jo React Hook Form deta hai */}
                    <form onSubmit={handleSubmit(login)} className="space-y-5">

                        {/* Email Input with Icon */}
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

                        {/* Password Input with Icon */}
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

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            className="w-full flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-400 text-slate-900 font-bold py-3 px-4 rounded-lg transition-all transform active:scale-95"
                        >
                            Sign In
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                        </Button>
                    </form>

                    {/* Footer */}
                    <p className="mt-8 text-center text-gray-400 text-sm">
                        Don't have an account?{' '}
                        <Link to="/signup" className="text-teal-400 font-semibold hover:text-teal-300 hover:underline">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login


//  logic flow
// User Click Submit -> handleSubmit -> login(data) -> authService.login() -> Redux Update -> Maps Home.



// Form Bharna: User ne Email/Pass dala. (useForm ne data collect kiya).

// Submit Click: login() function chala.

// Verification: authService.login() ne Appwrite se baat ki. ye user exist karta h ya nhi

// Stamp Lagana: Agar sab sahi raha, toh dispatch(authLogin(userData)) ne user par "Logged In" ka stamp lagaya.

// Entry: Maps("/") ne user ko Home Page par bhej diya.


// Isne Input.jsx ko bulaya taaki user Email aur Password type kar sake.

// Isne Button.jsx ko bulaya "Sign In" click karne ke liye.

// Isne Logo.jsx ko dikhaya taaki brand pata chale.

// Jab user "Sign In" dabata hai, yeh file authService (jo humne appwrite/auth.js mein banaya) ko kaam par lagati hai:

// "Jaao Appwrite check karke aao ki ye email aur password sahi hai ya nahi?"

// Agar password galat hai, toh yeh screen par Error dikha deta hai (setError)


//  why we use handleSubmit?
// answer

// Scenario 1: Bina handleSubmit ke (onSubmit={login}) ❌
// Agar user ne form submit kiya, toh browser seedha Boss (login) ke paas aayega. Aapko (Boss ko) ye sab khud karna padega:

// 🛑 Stop Reload: Page refresh hone se roko (e.preventDefault()).

// 🔍 Find Data: Form ke andar ghus kar ek-ek field dhundho (e.target.email.value).

// ✅ Check Errors: Check karo ki email khali toh nahi? Format sahi hai?

// 📦 Bundle Data: Data ko ek object {email, password} mein pack karo.

// 🚀 Send: Phir server ko bhejo.

