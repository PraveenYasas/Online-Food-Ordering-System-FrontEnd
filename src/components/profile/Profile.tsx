import { useState } from 'react';
import { Link } from 'react-router-dom';

function Profile() {
  const [activeTab, setActiveTab] = useState<'personal' | 'addresses' | 'payments'>('personal');

  // Log out වෙන function එක
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/"; 
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-12">
      <div className="max-w-6xl mx-auto">
        
        {/* --- Header with Back Button --- */}
        <div className="flex items-center gap-4 mb-8">
          {/* Back Button */}
          <Link to="/" className="p-2.5 bg-white border border-gray-200 hover:bg-gray-100 rounded-full transition-colors shadow-sm group">
            <svg className="w-6 h-6 text-gray-700 group-hover:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">My Profile</h1>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          
          {/* ================= LEFT SIDEBAR ================= */}
          <div className="w-full md:w-1/3 lg:w-1/4 flex flex-col gap-4 shrink-0">
            
            {/* Profile Avatar Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center relative">
              <button className="absolute top-4 right-4 p-2 text-gray-400 hover:text-[#34A853] transition-colors rounded-full hover:bg-gray-50">
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
              </button>
              <div className="w-24 h-24 bg-[#e6f4ea] text-[#34A853] rounded-full flex items-center justify-center text-4xl font-bold mb-4 shadow-inner relative group cursor-pointer">
                P
                <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
              </div>
              <h2 className="text-xl font-bold text-gray-900">Praween Yasas</h2>
              <p className="text-gray-500 text-sm mt-1">praween@example.com</p>
            </div>

            {/* Navigation Menu */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-3 flex flex-col gap-1">
              <button 
                onClick={() => setActiveTab('personal')} 
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-semibold transition-colors ${activeTab === 'personal' ? 'bg-[#e6f4ea] text-[#34A853]' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                Personal Info
              </button>
              
              <button 
                onClick={() => setActiveTab('addresses')} 
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-semibold transition-colors ${activeTab === 'addresses' ? 'bg-[#e6f4ea] text-[#34A853]' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                Saved Addresses
              </button>

              <button 
                onClick={() => setActiveTab('payments')} 
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-semibold transition-colors ${activeTab === 'payments' ? 'bg-[#e6f4ea] text-[#34A853]' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                Payment Methods
              </button>

              {/* Logout Button in Profile Menu */}
              <div className="border-t border-gray-100 mt-2 pt-2">
                <button 
                  onClick={handleLogout}
                  className="flex items-center w-full gap-3 px-4 py-3.5 rounded-xl font-semibold text-red-600 hover:bg-red-50 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                  Log out
                </button>
              </div>
            </div>
          </div>

          {/* ================= RIGHT CONTENT AREA ================= */}
          <div className="w-full md:w-2/3 lg:w-3/4">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 min-h-125">
              
              {/* 1. Personal Info Tab */}
              {activeTab === 'personal' && (
                <div className="animate-fade-in">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-gray-900">Personal Information</h3>
                  </div>
                  
                  <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">First Name</label>
                      <input type="text" defaultValue="Praween" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-[#34A853] focus:ring-1 focus:ring-[#34A853] transition-colors" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">Last Name</label>
                      <input type="text" defaultValue="Yasas" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-[#34A853] focus:ring-1 focus:ring-[#34A853] transition-colors" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">Email Address</label>
                      <input type="email" defaultValue="praween@example.com" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-[#34A853] focus:ring-1 focus:ring-[#34A853] transition-colors bg-gray-50 text-gray-600" readOnly />
                      <p className="text-xs text-gray-500 mt-1.5">Email address cannot be changed.</p>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">Phone Number</label>
                      <input type="tel" defaultValue="+94 77 123 4567" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-[#34A853] focus:ring-1 focus:ring-[#34A853] transition-colors" />
                    </div>
                    <div className="md:col-span-2 pt-4">
                      <button type="button" className="bg-[#34A853] hover:bg-[#2b8f45] text-white font-bold py-3 px-8 rounded-xl transition-colors shadow-sm">
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* 2. Saved Addresses Tab */}
              {activeTab === 'addresses' && (
                <div className="animate-fade-in">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-gray-900">Saved Addresses</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Existing Address */}
                    <div className="border border-gray-200 rounded-xl p-5 relative group hover:border-[#34A853] hover:shadow-md transition-all cursor-pointer">
                      <div className="flex items-start gap-3">
                        <div className="bg-[#e6f4ea] p-2.5 rounded-full text-[#34A853]">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-gray-900 text-lg">Home</h4>
                            <span className="bg-gray-100 text-gray-600 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Default</span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1 leading-relaxed">No 123, Main Street,<br/>Bandaragama, Sri Lanka.</p>
                        </div>
                      </div>
                      <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1.5 text-gray-500 hover:text-[#34A853] bg-white border border-gray-200 hover:border-[#34A853] shadow-sm rounded-md"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg></button>
                        <button className="p-1.5 text-gray-500 hover:text-red-500 bg-white border border-gray-200 hover:border-red-500 shadow-sm rounded-md"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                      </div>
                    </div>

                    {/* Add New Address Button */}
                    <button className="border-2 border-dashed border-gray-300 rounded-xl p-5 flex flex-col items-center justify-center text-gray-500 hover:bg-[#e6f4ea] hover:text-[#34A853] hover:border-[#34A853] transition-all min-h-35">
                      <div className="bg-white p-2 rounded-full shadow-sm mb-2">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
                      </div>
                      <span className="font-semibold">Add New Address</span>
                    </button>
                  </div>
                </div>
              )}

              {/* 3. Payment Methods Tab */}
              {activeTab === 'payments' && (
                <div className="animate-fade-in">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-gray-900">Payment Methods</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Existing Card */}
                    <div className="border border-gray-200 rounded-xl p-5 relative group hover:border-[#34A853] hover:shadow-md transition-all cursor-pointer">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-14 h-9 bg-[#1434CB] rounded-md flex items-center justify-center text-white font-bold text-sm italic shadow-sm">
                          VISA
                        </div>
                        <span className="bg-gray-100 text-gray-600 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Default</span>
                      </div>
                      <p className="font-bold text-gray-900 tracking-widest mb-1 text-lg">•••• •••• •••• 4242</p>
                      <p className="text-sm text-gray-500 font-medium">Expires 12/28</p>
                      <button className="absolute top-4 right-4 p-1.5 text-gray-500 hover:text-red-500 bg-white border border-gray-200 hover:border-red-500 shadow-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </div>

                    {/* Add New Card Button */}
                    <button className="border-2 border-dashed border-gray-300 rounded-xl p-5 flex flex-col items-center justify-center text-gray-500 hover:bg-[#e6f4ea] hover:text-[#34A853] hover:border-[#34A853] transition-all min-h-35">
                      <div className="bg-white p-2 rounded-full shadow-sm mb-2">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
                      </div>
                      <span className="font-semibold">Add Payment Method</span>
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Profile;