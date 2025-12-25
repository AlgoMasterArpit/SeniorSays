 import React from "react";
  import {Container,LogoutBtn,Logo} from '../index'
   import { Link } from "react-router-dom";
    import { useSelector } from "react-redux";
     import { useNavigate } from "react-router-dom";
  function Header(){
 const authStatus=useSelector((state)=> state.auth.status)/*yha useselector me callback jayega jisme  state jaati 
  now state.auth used kyuki name  = auth written in  authslice wali file and we are accessing status written
  in initialState me status in the same file*/
   const navigate = useNavigate()
   //  when we have nav bar toh we make navitems , jo ki array of objects hota h
   //  this way we are  easily able to make navbar kyuki har ek cheez ka fir tum button bnaoge that  not production practice 
const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: 'All Experiences',
      slug: "/all-posts",
      active: true,
    },
    {
      name: 'Add Experience', // <--- NEW ITEM ADDED
      slug: "/add-post",
      active: authStatus, // Sirf tab dikhega jab user Logged In hoga
    },
    {
      name: 'Login',
      slug: "/login",
      active: !authStatus,
    },
    {
      name: 'Signup',
      slug: "/signup",
      active: !authStatus,
    },
  ]
  return (
    <header className='py-4 shadow bg-slate-900 border-b border-slate-800'>
      <Container>
        <nav className='flex items-center'>
          
          {/* ✅ 1. LOGO SECTION (Added this back) */}
          <div className='mr-4'>
            <Link to='/'>
              <Logo width='70px' />
            </Link>
          </div>

          {/* ✅ 2. NAVIGATION LINKS */}
          <ul className='flex ml-auto items-center'>
            {navItems.map((item) => 
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className='inline-block px-6 py-2 duration-200 text-white hover:text-teal-400 font-medium'
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
 
            {/* Logout Button */
            }
            {/* { Condition && ( Jo_Dikhana_Hai ) }
            
             if logged in tabhi dikhega logout button */}
            {authStatus && (
              <li className='ml-4'>
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