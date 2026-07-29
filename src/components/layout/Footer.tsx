function Footer() {
  return (
    <footer className="bg-black text-white pt-16 pb-8 px-6 lg:px-12">
      
      {/* Top Section - Grid (Columns 4කට කැඩෙනවා ලොකු screens වල) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        
        {/* 1. Logo & Social Icons */}
        <div>
          <div className="text-3xl font-bold tracking-tight mb-6 cursor-pointer">
            Bite<span className="text-[#05C167]">Dash</span>
          </div>
          <div className="flex items-center gap-4">
            {/* Facebook */}
            <a href="#" className="hover:text-gray-400 transition-colors">
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.891h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </a>
            {/* Twitter / X */}
            <a href="#" className="hover:text-gray-400 transition-colors">
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              </svg>
            </a>
            {/* Instagram */}
            <a href="#" className="hover:text-gray-400 transition-colors">
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>

        {/* 2. Get Help */}
        <div>
          <h3 className="text-lg font-bold mb-5">Get Help</h3>
          <ul className="space-y-4 text-[15px] text-gray-300">
            <li><a href="#" className="hover:text-white hover:underline transition-all">Add your restaurant</a></li>
            <li><a href="#" className="hover:text-white hover:underline transition-all">Sign up to deliver</a></li>
            <li><a href="#" className="hover:text-white hover:underline transition-all">Create a business account</a></li>
          </ul>
        </div>

        {/* 3. Restaurants near me */}
        <div>
          <h3 className="text-lg font-bold mb-5">Restaurants near me</h3>
          <ul className="space-y-4 text-[15px] text-gray-300">
            <li><a href="#" className="hover:text-white hover:underline transition-all">View all cities</a></li>
            <li><a href="#" className="hover:text-white hover:underline transition-all">View all countries</a></li>
            <li><a href="#" className="hover:text-white hover:underline transition-all">Pickup near me</a></li>
            <li><a href="#" className="hover:text-white hover:underline transition-all">About Bite Dash</a></li>
          </ul>
        </div>

        {/* 4. Download the app */}
        <div>
          <h3 className="text-lg font-bold mb-5">Download the app</h3>
          <div className="space-y-4">
            {/* App Store Button */}
            <button className="flex items-center justify-center gap-3 w-full sm:w-auto min-w-50 bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.04 2.26-.82 3.59-.8 1.48.05 2.6.72 3.32 1.83-2.99 1.63-2.52 5.56.36 6.78-.65 1.71-1.77 3.56-2.35 4.36zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
              </svg>
              <div className="flex flex-col items-start">
                <span className="text-[10px] leading-tight">Download on the</span>
                <span className="text-[15px] font-bold leading-tight">App Store</span>
              </div>
            </button>
            
            {/* Google Play Button */}
            <button className="flex items-center justify-center gap-3 w-full sm:w-auto min-w-50 bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.609 1.814L13.792 12l-10.183 10.186a1.994 1.994 0 01-.609-1.42V3.234c0-.528.216-1.034.609-1.42zM15.405 13.613l-1.613-1.613 1.613-1.613 4.28 2.45a1.002 1.002 0 010 1.74l-4.28 2.45-1.613-1.613 1.613-1.613zM14.6 12.808L4.417 22.99a1.996 1.996 0 01-1.417.61L14.6 12.808zM14.6 11.192L3 2.518A2 2 0 014.417 1.01L14.6 11.192z"/>
              </svg>
              <div className="flex flex-col items-start">
                <span className="text-[10px] leading-tight">GET IT ON</span>
                <span className="text-[15px] font-bold leading-tight">Google Play</span>
              </div>
            </button>
          </div>
        </div>

      </div>

      {/* Horizontal Divider */}
      <hr className="border-gray-800 mb-8" />

      {/* Bottom Section - Copyright & Links */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-[14px] text-gray-400">
        
        {/* Left side links */}
        <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
          <a href="#" className="hover:text-white transition-colors">Pricing</a>
          <a href="#" className="hover:text-white transition-colors">Do not sell or share my personal information</a>
        </div>
        
        {/* Right side Copyright text */}
        <div className="text-center md:text-right">
          © 2026 Bite Dash Technologies Inc.
        </div>

      </div>

    </footer>
  );
}

export default Footer;