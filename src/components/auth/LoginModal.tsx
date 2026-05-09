interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToSignUp: () => void; // Sign up එකට මාරු වෙන්න
}

function LoginModal({ isOpen, onClose, onSwitchToSignUp }: LoginModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-2xl overflow-hidden shadow-2xl flex flex-col">
        
        {/* Header */}
        <div className="bg-[#2b9d58] p-6 text-white relative">
          <button onClick={onClose} className="absolute top-4 right-4 p-1 hover:bg-white/20 rounded-full transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <h2 className="text-[28px] font-bold tracking-tight">Welcome Back!</h2>
          <p className="text-white/90 text-[15px] mt-1">Sign in to continue ordering</p>
        </div>

        {/* Form */}
        <div className="p-6">
          <form className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1.5">Email Address</label>
              <input type="email" placeholder="you@example.com" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#2b9d58] focus:ring-1 focus:ring-[#2b9d58]" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1.5">Password</label>
              <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#2b9d58] focus:ring-1 focus:ring-[#2b9d58]" />
            </div>

            <div className="flex items-center justify-between mt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#2b9d58] focus:ring-[#2b9d58]" />
                <span className="text-sm text-gray-700 font-medium">Remember me</span>
              </label>
              <a href="#" className="text-sm font-semibold text-[#2b9d58] hover:underline">Forgot Password?</a>
            </div>

            <button type="submit" className="w-full bg-[#34A853] hover:bg-[#2b8f45] text-white font-bold py-3 rounded-lg transition-colors mt-2 text-lg">
              Sign In
            </button>

            {/* Social Login */}
            <div className="relative flex items-center py-4">
              <div className="grow border-t border-gray-200"></div>
              <span className="shrink-0 mx-4 text-gray-400 text-sm">Or continue with</span>
              <div className="grow border-t border-gray-200"></div>
            </div>

            <div className="flex gap-4">
              <button type="button" className="flex-1 flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2.5 hover:bg-gray-50 transition-colors font-semibold text-gray-700">
                <span className="text-red-500 font-bold text-lg">G</span> Google
              </button>
              <button type="button" className="flex-1 flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2.5 hover:bg-gray-50 transition-colors font-semibold text-gray-700">
                <span className="text-blue-600 font-bold text-lg">f</span> Facebook
              </button>
            </div>

            <div className="text-center mt-4">
              <span className="text-gray-600 text-sm">Don't have an account? </span>
              <button type="button" onClick={onSwitchToSignUp} className="text-[#2b9d58] font-bold text-sm hover:underline">
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;