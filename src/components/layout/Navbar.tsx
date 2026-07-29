import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface NavbarProps {
  onOpenLogin: () => void;
  onOpenSignUp: () => void;
  onOpenSidebar: () => void;
  onOpenCart: () => void;
  onOpenLocation?: () => void;
}

export default function Navbar({ onOpenLogin, onOpenSignUp, onOpenSidebar, onOpenCart, onOpenLocation }: NavbarProps) {
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const [orderType, setOrderType] = useState<'delivery' | 'pickup'>('delivery');

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true); 
    }
  }, []);

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100 shadow-sm">
      
      {/* --- Left Section --- */}
      <div className="flex items-center gap-4">
        <button onClick={onOpenSidebar} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        
        <Link to="/" className="text-2xl font-bold tracking-tight cursor-pointer">
          Bite<span className="text-[#05C167]">Dash</span>
        </Link>
      </div>

      {/* --- Middle Section: Toggle & Location --- */}
      <div className="hidden lg:flex items-center gap-6">
        
        <div className="flex items-center bg-gray-100 p-1 rounded-full relative">
          <button 
            onClick={() => setOrderType('delivery')}
            className={`px-5 py-2 rounded-full font-semibold text-sm transition-all duration-300 ease-in-out ${
              orderType === 'delivery' 
                ? 'bg-white shadow-sm text-black' 
                : 'text-gray-600 hover:text-black'
            }`}
          >
            Delivery
          </button>
          
          <button 
            onClick={() => setOrderType('pickup')}
            className={`px-5 py-2 rounded-full font-semibold text-sm transition-all duration-300 ease-in-out ${
              orderType === 'pickup' 
                ? 'bg-white shadow-sm text-black' 
                : 'text-gray-600 hover:text-black'
            }`}
          >
            Pickup
          </button>
        </div>
        
        <div 
          onClick={onOpenLocation} 
          className="flex items-center gap-2 hover:bg-gray-100 px-3 py-2 rounded-full cursor-pointer transition-colors"
        >
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

      {/* --- Right Section --- */}
      <div className="flex items-center gap-2 md:gap-4">
        
        <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 w-50 lg:w-64">
          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input type="text" placeholder="Search" className="bg-transparent outline-none ml-2 w-full text-sm placeholder-gray-500 text-black" />
        </div>

        {isLoggedIn ? (
          <>
            <Link to="/profile" className="hidden sm:flex items-center gap-2 px-3 py-2 font-semibold text-sm hover:bg-gray-100 rounded-full transition-colors text-black">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              Profile
            </Link>
            <button onClick={onOpenCart} className="p-2 hover:bg-gray-100 rounded-full relative transition-colors ml-1">
              <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            </button>
          </>
        ) : (
          <>
            <button onClick={onOpenLogin} className="hidden sm:block px-4 py-2 font-semibold text-sm hover:bg-gray-100 rounded-full transition-colors text-black">Log in</button>
            <button onClick={onOpenSignUp} className="px-5 py-2 font-semibold text-sm bg-black text-white rounded-full hover:bg-gray-800 transition-colors">Sign up</button>
            <button onClick={onOpenCart} className="p-2 hover:bg-gray-100 rounded-full relative transition-colors ml-1">
              <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            </button>
          </>
        )}

      </div>
    </nav>
  );
}