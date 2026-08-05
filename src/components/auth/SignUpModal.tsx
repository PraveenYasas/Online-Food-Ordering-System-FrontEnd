import { useState } from 'react';
import api from '../../services/api'; // Get the API service

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}

export default function SignUpModal({ isOpen, onClose, onSwitchToLogin }: SignUpModalProps) {
  // Form State for the catch user input
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      // Transfer the data to the Backend's Register Endpoint
      await api.post('/auth/register', formData);
      setSuccess(true);
      
      // Change to the Login Modal after 2 seconds to give the user feedback that the registration was successful
      setTimeout(() => {
        setSuccess(false);
        onSwitchToLogin();
      }, 2000);
      
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-120 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-[#2b9d58] p-6 text-white relative shrink-0">
          <button onClick={onClose} className="absolute top-4 right-4 p-1 hover:bg-white/20 rounded-full transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          <h2 className="text-[28px] font-bold tracking-tight">Join us and start ordering!</h2>
        </div>

        {/* Form Area */}
        <div className="p-6 overflow-y-auto no-scrollbar">
          
          {error && <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">{error}</div>}
          {success && <div className="mb-4 p-3 bg-green-50 text-green-600 text-sm rounded-lg border border-green-100">Account created successfully! Redirecting...</div>}

          <form className="flex flex-col gap-4" onSubmit={handleRegister}>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-semibold text-gray-800 mb-1.5">First Name</label>
                <input type="text" name="firstName" required value={formData.firstName} onChange={handleChange} placeholder="John" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#34A853] focus:ring-1 focus:ring-[#34A853]" />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-semibold text-gray-800 mb-1.5">Last Name</label>
                <input type="text" name="lastName" required value={formData.lastName} onChange={handleChange} placeholder="Doe" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#34A853] focus:ring-1 focus:ring-[#34A853]" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1.5">Email Address</label>
              <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="you@example.com" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#34A853] focus:ring-1 focus:ring-[#34A853]" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1.5">Phone Number</label>
              <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} placeholder="0771234567" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#34A853] focus:ring-1 focus:ring-[#34A853]" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1.5">Password</label>
              <input type="password" name="password" required value={formData.password} onChange={handleChange} placeholder="••••••••" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#34A853] focus:ring-1 focus:ring-[#34A853]" />
            </div>

            <button type="submit" disabled={isLoading} className="w-full bg-[#34A853] hover:bg-[#2b8f45] disabled:bg-gray-400 text-white font-bold py-3 rounded-lg transition-colors mt-2 text-lg">
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>

            <div className="text-center mt-2">
              <span className="text-gray-600 text-sm">Already have an account? </span>
              <button type="button" onClick={onSwitchToLogin} className="text-[#34A853] font-bold text-sm hover:underline">Sign In</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}