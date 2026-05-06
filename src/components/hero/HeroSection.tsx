import { NavLink } from 'react-router-dom'
// මෙන්න හරිම path එක
import heroBg from '../../assets/hero/Hero.jpg' 

export default function HeroSection() {
  
  // Nikan log wena function eka
  const handleFakeLogin = () => {
    // Local storage ekata dummy token ekak daanawa
    localStorage.setItem("token", "fake-jwt-token-12345");
    
    // Page eka refresh karanawa ethakota Home.tsx eke logic eka trigger wenawa
    window.location.reload();
  };

  return (
    <section className="relative h-[550px] w-full flex items-center px-4 sm:px-12 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img 
          src={heroBg} 
          alt="Food Background" 
          className="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-4xl w-full">
        <h1 className="text-[48px] md:text-[54px] font-bold leading-tight mb-8 tracking-tight text-white drop-shadow-lg">
          Order delivery near you
        </h1>

        <div className="flex flex-col md:flex-row items-stretch gap-2">
          {/* Address Input */}
          <div className="flex-1 flex items-center bg-white px-4 py-4 shadow-sm border border-transparent focus-within:border-black transition-all rounded-md md:rounded-none">
            <svg className="w-6 h-6 mr-3 text-black" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
            <input 
              type="text" 
              placeholder="Enter delivery address" 
              className="w-full outline-none text-lg font-medium placeholder-gray-500"
            />
          </div>

          {/* Time Selector */}
          <div className="flex items-center bg-white px-4 py-4 min-w-[170px] shadow-sm border border-transparent focus-within:border-black cursor-pointer rounded-md md:rounded-none">
            <svg className="w-6 h-6 mr-2 text-black" fill="currentColor" viewBox="0 0 24 24">
              <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
            </svg>
            <select className="bg-transparent outline-none font-bold text-[16px] w-full cursor-pointer appearance-none">
              <option>Deliver now</option>
              <option>Schedule for later</option>
            </select>
          </div>

          {/* Find Food Button - Meka click kalama log wenawa */}
          <button 
            onClick={handleFakeLogin} 
            className="bg-black text-white px-10 py-4 font-bold text-lg hover:bg-zinc-800 transition-colors duration-200 rounded-md md:rounded-none"
          >
            Find Food
          </button>
        </div>

        <p className="mt-4 text-[16px] font-semibold text-white drop-shadow-md">
          Or <NavLink to="/login" className="underline hover:no-underline">Sign In</NavLink>
        </p>
      </div>
    </section>
  )
}