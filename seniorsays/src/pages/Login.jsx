import React from 'react'
import { Login as LoginComponent, Container } from '../components' // 1. Container Import kiya

function Login() {
  return (
    // 2. Styling Updates:
    // min-h-screen: Screen ki height cover karega
    // bg-slate-900: Dark background match karega
    // flex items-center: Form ko vertical center (beech) mein layega
    <div className='w-full min-h-screen bg-slate-900 py-8 flex items-center'>
        
        <Container>
            {/* 3. Width Control: 
               Mobile par 100% width lega.
               Desktop par 'max-w-lg' (approx 500px) tak hi failega aur 'mx-auto' se center rahega.
            */}
            <div className='w-full max-w-lg mx-auto'>
                <LoginComponent />
            </div>
        </Container>
        
    </div>
  )
}

export default Login