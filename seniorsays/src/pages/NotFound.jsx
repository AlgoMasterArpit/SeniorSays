import React from 'react'
import { Link } from 'react-router-dom'
import { Container } from '../components'

//  Ye catch-all route (path: "*") se render hota hai.
//
//  Iske bina galat URL pe React Router apna DEFAULT error screen dikhata tha —
//  khaali safed page jispe "Unexpected Application Error! 404 Not Found" likha hota,
//  na Header, na Footer, na wapas jaane ka koi rasta. User wahin phas jaata tha.
//
//  Route parent ke children me hai (App ke andar), isliye Header/Footer yahan bhi
//  mil jaate hain. Upar standalone route banate to naked page dikhta.
function NotFound() {
    return (
        <div className="w-full py-20 min-h-screen bg-slate-900">
            <Container>
                <div className="max-w-md mx-auto text-center">
                    <p className="text-7xl font-bold text-teal-400">404</p>

                    <h1 className="mt-4 text-2xl font-bold text-white">
                        Page not found
                    </h1>

                    <p className="mt-3 text-gray-400">
                        This page doesn&apos;t exist. The link may be outdated, or there&apos;s a typo in the URL.
                    </p>

                    {/*  Sirf Home ka link. /all-posts pe AuthLayout authentication={true}
                        laga hai, toh logged-out banda usko dabata to seedha /login pe
                        bounce ho jaata — 404 se aur zyada confusing. Home public hai. */}
                    <Link
                        to="/"
                        className="inline-block mt-8 px-6 py-3 rounded-lg bg-teal-500 text-slate-900 font-bold hover:bg-teal-400 transition-all"
                    >
                        Go to Home
                    </Link>
                </div>
            </Container>
        </div>
    )
}

export default NotFound
