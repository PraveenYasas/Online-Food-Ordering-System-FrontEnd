import { Bars3Icon } from '@heroicons/react/24/outline'
import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="flex items-center gap-6">
        {/* Mobile Menu Icon & Logo - image_fbf3ab.png kalla */}
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-100 rounded-full transition">
            <Bars3Icon className="h-6 w-6 text-black" />
          </button>
          
          <NavLink to="/" className="flex items-center">
            <h1 className="text-2xl font-bold tracking-tighter text-black">
              Uber <span className="font-black">Eats</span>
            </h1>
          </NavLink>
        </div>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-4">
        {/* External Link Style */}
        <a 
          href="https://www.uber.com/ride" 
          target="_blank" 
          rel="noreferrer"
          className="hidden md:flex items-center gap-1 font-semibold text-sm hover:bg-gray-100 px-4 py-2 rounded-full transition"
        >
          Get a ride
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"></path>
          </svg>
        </a>

        {/* Auth Buttons - AMS style NavLinks[cite: 1, 2] */}
        <NavLink 
          to="/login" 
          className="px-4 py-2 font-bold text-sm hover:bg-gray-100 rounded-full transition"
        >
          Log in
        </NavLink>
        
        <NavLink 
          to="/signup" 
          className="px-4 py-2 font-bold text-sm bg-black text-white rounded-full hover:bg-gray-800 transition shadow-sm"
        >
          Sign up
        </NavLink>
      </div>
    </nav>
  )
}

export default Navbar