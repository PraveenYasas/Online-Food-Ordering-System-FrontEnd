import heroBg from '../../assets/hero/Hero.jpg'; 

function HeroSection() {
  return (
    <section className="relative w-full h-125 lg:h-137.5 flex items-center justify-center">
      
      <div className="absolute inset-0 z-0">
        <img 
          src={heroBg} 
          alt="Hero Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="relative z-10 w-full max-w-5xl px-4 sm:px-6 lg:px-8 flex flex-col items-start">
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-8 drop-shadow-lg">
          Order delivery near you
        </h1>

        <div className="w-full max-w-4xl bg-white rounded-xl p-2 flex flex-col md:flex-row items-center gap-2 shadow-xl">
          
          <div className="flex-1 flex items-center bg-gray-50 hover:bg-gray-100 transition-colors rounded-lg px-4 py-3 w-full">
            <svg className="w-6 h-6 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <input 
              type="text" 
              placeholder="Enter delivery address" 
              className="w-full bg-transparent outline-none text-gray-800 text-lg placeholder-gray-500"
            />
          </div>

          <div className="flex items-center bg-gray-50 hover:bg-gray-100 transition-colors rounded-lg px-4 py-3 w-full md:w-55 cursor-pointer">
            <svg className="w-6 h-6 text-black mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <select className="bg-transparent outline-none text-black font-semibold text-lg w-full cursor-pointer appearance-none">
              <option>Deliver now</option>
              <option>Schedule later</option>
            </select>
          </div>

          <button className="w-full md:w-auto bg-black text-white font-bold text-lg px-8 py-3 rounded-lg hover:bg-zinc-800 transition-colors">
            Find Food
          </button>
          
        </div>

        <div className="mt-6">
          <a href="/login" className="text-white font-semibold text-lg underline hover:text-gray-200 transition-colors cursor-pointer drop-shadow-md">
            Or Sign in
          </a>
        </div>

      </div>
    </section>
  );
}

export default HeroSection;