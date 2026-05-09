interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void; // Login එකට මාරු වෙන්න
}

function SignUpModal({ isOpen, onClose, onSwitchToLogin }: SignUpModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-[#2b9d58] p-6 text-white relative shrink-0">
          <button onClick={onClose} className="absolute top-4 right-4 p-1 hover:bg-white/20 rounded-full transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <h2 className="text-[28px] font-bold tracking-tight">Join us!</h2>
        </div>

        {/* Form Area - Scrollable */}
        <div className="p-6 overflow-y-auto no-scrollbar">
          <form className="flex flex-col gap-4">
            
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-semibold text-gray-800 mb-1.5">First Name</label>
                <input type="text" placeholder="John" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#2b9d58] focus:ring-1 focus:ring-[#2b9d58]" />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-semibold text-gray-800 mb-1.5">Last Name</label>
                <input type="text" placeholder="Doe" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#2b9d58] focus:ring-1 focus:ring-[#2b9d58]" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1.5">Phone Number</label>
              <input type="tel" placeholder="+1 (555) 000-0000" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#2b9d58] focus:ring-1 focus:ring-[#2b9d58]" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1.5">Email Address</label>
              <input type="email" placeholder="you@example.com" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#2b9d58] focus:ring-1 focus:ring-[#2b9d58]" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1.5">Password</label>
              <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#2b9d58] focus:ring-1 focus:ring-[#2b9d58]" />
            </div>

            <label className="flex items-center gap-2 cursor-pointer mt-2">
              <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#2b9d58] focus:ring-[#2b9d58]" />
              <span className="text-sm text-gray-700 font-medium">
                I agree to the <a href="#" className="text-[#2b9d58] hover:underline">Terms</a>
              </span>
            </label>

            <button type="submit" className="w-full bg-[#34A853] hover:bg-[#2b8f45] text-white font-bold py-3 rounded-lg transition-colors mt-2 text-lg">
              Create Account
            </button>

            <div className="text-center mt-4">
              <span className="text-gray-600 text-sm">Already have an account? </span>
              <button type="button" onClick={onSwitchToLogin} className="text-[#2b9d58] font-bold text-sm hover:underline">
                Sign In
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUpModal;