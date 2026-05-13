interface NavbarProps {
  onOpenLogin: () => void;
  onOpenSignUp: () => void;
  onOpenSidebar: () => void;
}

function Navbar({ onOpenLogin, onOpenSignUp, onOpenSidebar }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100 shadow-sm">
      <div className="flex items-center gap-4">
        <button onClick={onOpenSidebar} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        
        <div className="text-2xl font-bold tracking-tight cursor-pointer">
          Bite<span className="text-[#05C167]">Dash</span>
        </div>
      </div>

      {/* 2. Middle Section: Toggle & Location */}
      <div className="hidden lg:flex items-center gap-6">
        <div className="flex items-center bg-gray-100 p-1 rounded-full">
          <button className="bg-white px-5 py-2 rounded-full font-semibold text-sm shadow-sm text-black">
            Delivery
          </button>
          <button className="px-5 py-2 rounded-full font-semibold text-sm text-gray-600 hover:text-black transition-colors">
            Pickup
          </button>
        </div>
        
        <div className="flex items-center gap-2 hover:bg-gray-100 px-3 py-2 rounded-full cursor-pointer transition-colors">
          <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="font-medium text-sm text-black">Upazil Hardware • Now</span>
          <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* 3. Right Section: Search, Cart, Login, Sign up */}
      <div className="flex items-center gap-2 md:gap-4">
        
        {/* Search Bar */}
        <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 w-50 lg:w-64">
          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input 
            type="text" 
            placeholder="Search" 
            className="bg-transparent outline-none ml-2 w-full text-sm placeholder-gray-500 text-black" 
          />
        </div>

        {/* Cart Icon */}
        <button className="p-2 hover:bg-gray-100 rounded-full relative transition-colors ml-1 hidden sm:block">
          <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </button>

        {/* Auth Buttons */}
        <button 
          onClick={onOpenLogin} 
          className="hidden sm:block px-4 py-2 font-semibold text-sm hover:bg-gray-100 rounded-full transition-colors text-black"
        >
          Log in
        </button>
        <button 
          onClick={onOpenSignUp} 
          className="px-5 py-2 font-semibold text-sm bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
        >
          Sign up
        </button>
      </div>

    </nav>
  );
}

export default Navbar;