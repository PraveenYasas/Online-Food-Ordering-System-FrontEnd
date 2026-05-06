import { Bars3Icon, MagnifyingGlassIcon, ShoppingCartIcon, MapPinIcon } from '@heroicons/react/24/outline'
import { NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-4 py-2 bg-white sticky top-0 z-50 shadow-sm">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-100 rounded-full transition">
            <Bars3Icon className="h-6 w-6 text-black" />
          </button>
          <NavLink to="/" className="flex items-center">
            <h1 className="text-2xl font-bold tracking-tighter text-black">
              Bite<span className="text-[#05C167]">Dash</span>
            </h1>
          </NavLink>
        </div>

        <div className="hidden lg:flex bg-gray-100 p-1 rounded-full">
          <button className="px-6 py-2 bg-white rounded-full font-bold text-sm shadow-sm">Delivery</button>
          <button className="px-6 py-2 rounded-full font-bold text-sm hover:bg-gray-200 transition">Pickup</button>
        </div>

        <div className="hidden md:flex items-center gap-1 cursor-pointer hover:bg-gray-100 p-2 rounded-full transition">
          <MapPinIcon className="h-5 w-5" />
          <span className="font-bold text-sm">Upazil Hardware • Now</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M6 9l6 6 6-6"></path></svg>
        </div>
      </div>

      <div className="hidden sm:flex flex-1 max-w-md mx-4 relative">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />
        </div>
        <input 
          type="text" 
          placeholder="Search" 
          className="w-full bg-gray-100 rounded-full py-2.5 pl-10 pr-4 outline-none focus:ring-2 focus:ring-gray-200"
        />
      </div>

      <div className="flex items-center gap-2">
        <button className="px-4 py-2 font-bold text-sm hover:bg-gray-100 rounded-full transition">Log in</button>
        <button className="px-5 py-2 font-bold text-sm bg-black text-white rounded-full hover:bg-gray-800 transition">Sign up</button>
        <button className="p-2 hover:bg-gray-100 rounded-full transition relative">
          <ShoppingCartIcon className="h-6 w-6" />
        </button>
      </div>
    </nav>
  )
}