import React from 'react'
import { Signup as SignupComponent, Container } from '../components'

function Signup() {
  return (
    <div className='w-full min-h-screen bg-slate-900 py-8 flex items-center'>
        <Container>
            {/* 🔴 OLD: max-w-lg (Too small for split design)
                🟢 NEW: max-w-6xl (Enough space for Image + Form side-by-side)
            */}
            <div className='w-full max-w-6xl mx-auto'>
                <SignupComponent />
            </div>
        </Container>
    </div>
  )
}

export default Signup