import React from 'react'
import { Container, Logo, LogoutBtn } from '../index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  const navItems = [
    { name: 'Home', slug: "/", active: true }, 
    { name: 'Login', slug: "/login", active: !authStatus },
    { name: 'Signup', slug: "/signup", active: !authStatus },
    { name: 'All Experiences', slug: "/all-posts", active: authStatus },
    { name: 'Add Experience', slug: "/add-post", active: authStatus },
  ]

  return (
    <header className='py-4 shadow bg-slate-900 border-b border-slate-700'>
      <Container>
        <nav className='flex flex-wrap items-center justify-between'>
          
          {/* 1. Logo Section (Mobile par Center, Desktop par Left) */}
          <div className='w-full md:w-auto flex justify-center md:justify-start mb-4 md:mb-0'>
            <Link to='/'>
              <Logo width='100px' /> {/* Logo thoda bada kiya */}
            </Link>
          </div>

          {/* 2. Navigation Links 
             - w-full: Mobile par poori line lega (Next line mein aayega)
             - justify-center: Links beech mein dikhenge
          */}
          <ul className='flex flex-wrap items-center justify-center gap-3 w-full md:w-auto ml-auto'>
            {navItems.map((item) => 
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    // Mobile: px-3 py-1 (Chota button), Desktop: px-6 py-2 (Bada)
                    className='inline-block px-3 py-1 md:px-5 md:py-2 duration-200 hover:bg-teal-500 hover:text-slate-900 rounded-full text-white text-xs md:text-sm font-semibold border border-slate-600 hover:border-teal-500'
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            
            {/* Logout Button */}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>

        </nav>
      </Container>
    </header>
  )
}

export default Header

  //   const authStatus=useSelector((state)=> state.auth.status)/*yha useselector me callback jayega jisme  state jaati 
  // now state.auth used kyuki name  = auth written in  authslice wali file and we are accessing status written
  // in initialState me status in the same file*/
  //  const navigate = useNavigate()
  //  //  when we have nav bar toh we make navitems , jo ki array of objects hota h
  //  //  this way we are  easily able to make navbar kyuki har ek cheez ka fir tum button bnaoge that  not production practice 
