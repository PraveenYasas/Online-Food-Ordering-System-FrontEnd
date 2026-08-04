import React, { useState } from 'react';
import api from '../../services/api';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToSignUp: () => void;
}

function LoginModal({ isOpen, onClose, onSwitchToSignUp }: LoginModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); 
    setIsLoading(true);
    setError('');
    
    try {
      // Send the Login Request to the Backend
      const response = await api.post('/auth/login', { email, password });
      
      // Catch Token and Role
      const token = response.data.token;
      const role = response.data.role; // Backend should return the user's role upon successful login

      // Save in LocalStorage for future requests
      localStorage.setItem("token", token); 
      localStorage.setItem("role", role);

      // If the Role is ADMIN or RESTURANT_OWNER, redirect to the respective dashboard, otherwise reload the page
      if (role === 'ADMIN') {
        window.location.href = '/admin';
      } else if (role === 'RESTURANT_OWNER') {
        window.location.href = '/shop-admin';
      } else {
        window.location.reload(); 
      }
      
    } catch (err: any) {
      setError('Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-100 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-2xl overflow-hidden shadow-2xl flex flex-col">
        
        <div className="bg-[#2b9d58] p-6 text-white relative">
          <button onClick={onClose} className="absolute top-4 right-4 p-1 hover:bg-white/20 rounded-full transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          <h2 className="text-[28px] font-bold tracking-tight">Welcome Back!</h2>
          <p className="text-white/90 text-[15px] mt-1">Sign in to continue ordering</p>
        </div>

        <div className="p-6">
          {error && <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">{error}</div>}
          
          <form className="flex flex-col gap-4" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1.5">Email Address</label>
              <input type="email" required placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#2b9d58] focus:ring-1 focus:ring-[#2b9d58]" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1.5">Password</label>
              <input type="password" required placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#2b9d58] focus:ring-1 focus:ring-[#2b9d58]" />
            </div>

            <button type="submit" disabled={isLoading} className="w-full bg-[#34A853] hover:bg-[#2b8f45] disabled:bg-gray-400 text-white font-bold py-3 rounded-lg transition-colors mt-4 text-lg">
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>

            <div className="text-center mt-4">
              <span className="text-gray-600 text-sm">Don't have an account? </span>
              <button type="button" onClick={onSwitchToSignUp} className="text-[#2b9d58] font-bold text-sm hover:underline">Sign Up</button>
            </div>
            
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;