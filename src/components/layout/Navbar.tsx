import { Bars3Icon } from '@heroicons/react/24/outline'
import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-100 rounded-full transition">
            <Bars3Icon className="h-6 w-6 text-black" />
          </button>
          
          <NavLink to="/" className="flex items-center">
            {/* මෙන්න මචං අලුත් නම සහ style එක */}
            <h1 className="text-2xl font-bold tracking-tighter text-black">
              Bite<span className="font-black text-green-600">Dash</span>
            </h1>
          </NavLink>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Auth Buttons */}
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