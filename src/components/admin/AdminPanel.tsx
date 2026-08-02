import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'stores' | 'users'>('dashboard');
  
  const [ isStoreModalOpen, setIsStoreModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      
      {/* Admin Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col md:flex">
        <div className="h-16 flex items-center px-6 border-b border-gray-100">
          <Link to="/" className="text-2xl font-bold tracking-tight cursor-pointer text-black hover:opacity-90 transition-opacity">
            Bite<span className="text-[#05C167]">Dash</span> 
            <span className="text-xs font-bold text-white bg-black px-2 py-0.5 rounded ml-2">ADMIN</span>
          </Link>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'dashboard' ? 'bg-[#e6f4ea] text-[#137333]' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
            Dashboard
          </button>
          <button 
            onClick={() => setActiveTab('stores')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'stores' ? 'bg-[#e6f4ea] text-[#137333]' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
            Registered Stores
          </button>
          <button 
            onClick={() => setActiveTab('users')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'users' ? 'bg-[#e6f4ea] text-[#137333]' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            User Management
          </button>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto relative">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">
          <h2 className="text-xl font-bold text-gray-800 capitalize">
            {activeTab === 'dashboard' ? 'Platform Overview' : activeTab === 'stores' ? 'Store Management' : 'User Management'}
          </h2>
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center font-bold text-white">A</div>
          </div>
        </header>

        <div className="p-8">
          
          {/* 1. DASHBOARD TAB */}
          {activeTab === 'dashboard' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                <div className="w-14 h-14 bg-[#e6f4ea] rounded-full flex items-center justify-center text-[#137333]">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                </div>
                <div>
                  <p className="text-gray-500 text-sm font-medium">Total Stores</p>
                  <p className="text-2xl font-bold text-gray-900">12</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                </div>
                <div>
                  <p className="text-gray-500 text-sm font-medium">Total Users</p>
                  <p className="text-2xl font-bold text-gray-900">1,248</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                <div className="w-14 h-14 bg-purple-50 rounded-full flex items-center justify-center text-purple-600">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <div>
                  <p className="text-gray-500 text-sm font-medium">Platform Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">LKR 125K</p>
                </div>
              </div>
            </div>
          )}

          {/* 2. STORES MANAGEMENT TAB */}
          {activeTab === 'stores' && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-bold text-lg text-gray-900">Registered Stores</h3>
                <button 
                  onClick={() => setIsStoreModalOpen(true)}
                  className="bg-black hover:bg-gray-800 text-white px-5 py-2.5 rounded-xl font-semibold transition-colors flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                  Approve New Store
                </button>
              </div>
              <div className="p-0 overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 text-gray-500 text-sm border-b border-gray-100">
                    <tr>
                      <th className="py-4 px-6 font-medium">Store Name</th>
                      <th className="py-4 px-6 font-medium">Owner Email</th>
                      <th className="py-4 px-6 font-medium">Status</th>
                      <th className="py-4 px-6 font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6 font-semibold text-gray-900 flex items-center gap-3">
                        <div className="w-8 h-8 bg-orange-100 rounded text-orange-600 flex items-center justify-center font-bold text-xs">CF</div>
                        C Foods
                      </td>
                      <td className="py-4 px-6 text-gray-600 text-sm">owner@cfoods.com</td>
                      <td className="py-4 px-6"><span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">Active</span></td>
                      <td className="py-4 px-6 text-right">
                        <button className="text-red-500 font-medium text-sm hover:underline">Suspend</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 3. USER MANAGEMENT TAB */}
          {activeTab === 'users' && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-bold text-lg text-gray-900">Platform Users</h3>
                <div className="relative">
                  <svg className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                  <input type="text" placeholder="Search users..." className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-black" />
                </div>
              </div>
              <div className="p-0 overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 text-gray-500 text-sm border-b border-gray-100">
                    <tr>
                      <th className="py-4 px-6 font-medium">User Details</th>
                      <th className="py-4 px-6 font-medium">Role</th>
                      <th className="py-4 px-6 font-medium">Joined Date</th>
                      <th className="py-4 px-6 font-medium">Status</th>
                      <th className="py-4 px-6 font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6">
                        <p className="font-bold text-gray-900 text-sm">Praveen Yasas</p>
                        <p className="text-gray-500 text-xs">praveen@example.com</p>
                      </td>
                      <td className="py-4 px-6"><span className="bg-blue-100 text-blue-700 px-2.5 py-1 rounded text-xs font-bold">Customer</span></td>
                      <td className="py-4 px-6 text-gray-600 text-sm">Oct 12, 2023</td>
                      <td className="py-4 px-6"><span className="text-green-600 font-semibold text-sm flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-green-500"></div>Active</span></td>
                      <td className="py-4 px-6 text-right">
                        <button className="text-red-500 font-medium text-sm hover:underline">Block</button>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6">
                        <p className="font-bold text-gray-900 text-sm">Kamal Perera</p>
                        <p className="text-gray-500 text-xs">owner@cfoods.com</p>
                      </td>
                      <td className="py-4 px-6"><span className="bg-purple-100 text-purple-700 px-2.5 py-1 rounded text-xs font-bold">Shop Owner</span></td>
                      <td className="py-4 px-6 text-gray-600 text-sm">Sep 05, 2023</td>
                      <td className="py-4 px-6"><span className="text-green-600 font-semibold text-sm flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-green-500"></div>Active</span></td>
                      <td className="py-4 px-6 text-right">
                        <button className="text-red-500 font-medium text-sm hover:underline">Block</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>

        {/* --- අලුතින් ඇඩ් කරපු Approve Store Modal එක --- */}
        {isStoreModalOpen && (
          <div className="fixed inset-0 z-200 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl flex flex-col">
              <div className="bg-black p-5 text-white flex justify-between items-center">
                <h2 className="text-xl font-bold">Approve New Store</h2>
                <button onClick={() => setIsStoreModalOpen(false)} className="p-1 hover:bg-white/20 rounded-full transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-6">
                <form className="flex flex-col gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-1.5">Store Name</label>
                    <input type="text" placeholder="e.g. C Foods" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-black focus:ring-1 focus:ring-black outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-1.5">Owner Email</label>
                    <input type="email" placeholder="e.g. owner@cfoods.com" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-black focus:ring-1 focus:ring-black outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-1.5">Store Category</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-black focus:ring-1 focus:ring-black outline-none bg-white">
                      <option>Sri Lankan</option>
                      <option>Chinese</option>
                      <option>Fast Food</option>
                      <option>Beverages</option>
                    </select>
                  </div>
                  <div className="mt-4 flex gap-3">
                    <button type="button" onClick={() => setIsStoreModalOpen(false)} className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors">Cancel</button>
                    <button type="button" className="flex-1 bg-black text-white px-4 py-2.5 rounded-lg font-bold hover:bg-gray-800 transition-colors">Approve Store</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
        
      </main>
    </div>
  );
}