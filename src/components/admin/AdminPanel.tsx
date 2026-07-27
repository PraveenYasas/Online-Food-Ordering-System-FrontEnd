import { useState } from 'react';

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'stores' | 'menu'>('dashboard');
  
  // Modal states
  const [isStoreModalOpen, setIsStoreModalOpen] = useState(false);
  const [isFoodModalOpen, setIsFoodModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      
      {/* Admin Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col hidden md:flex">
        <div className="h-16 flex items-center px-6 border-b border-gray-100">
          <span className="text-2xl font-black tracking-tighter">
            Bite<span className="text-[#34A853]">Dash</span> <span className="text-sm font-medium text-gray-400 ml-1">Admin</span>
          </span>
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
            Restaurants & Stores
          </button>
          <button 
            onClick={() => setActiveTab('menu')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'menu' ? 'bg-[#e6f4ea] text-[#137333]' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
            Menu Management
          </button>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto relative">
        
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">
          <h2 className="text-xl font-bold text-gray-800 capitalize">
            {activeTab === 'dashboard' ? 'Overview' : activeTab === 'stores' ? 'Store Management' : 'Food Items'}
          </h2>
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center font-bold text-[#34A853]">A</div>
          </div>
        </header>

        {/* Dynamic Tab Content */}
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
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                </div>
                <div>
                  <p className="text-gray-500 text-sm font-medium">Total Food Items</p>
                  <p className="text-2xl font-bold text-gray-900">148</p>
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
                  className="bg-[#34A853] hover:bg-[#2b8f45] text-white px-5 py-2.5 rounded-xl font-semibold transition-colors flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                  Add New Store
                </button>
              </div>
              <div className="p-0">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 text-gray-500 text-sm">
                    <tr>
                      <th className="py-4 px-6 font-medium">Store Name</th>
                      <th className="py-4 px-6 font-medium">Owner</th>
                      <th className="py-4 px-6 font-medium">Status</th>
                      <th className="py-4 px-6 font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6 font-semibold text-gray-900">C Foods</td>
                      <td className="py-4 px-6 text-gray-600">Kamal Perera</td>
                      <td className="py-4 px-6"><span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">Active</span></td>
                      <td className="py-4 px-6 text-right">
                        <button className="text-[#34A853] font-medium hover:underline">Manage</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 3. MENU MANAGEMENT TAB */}
          {activeTab === 'menu' && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-bold text-lg text-gray-900">Food Items</h3>
                <button 
                  onClick={() => setIsFoodModalOpen(true)}
                  className="bg-[#34A853] hover:bg-[#2b8f45] text-white px-5 py-2.5 rounded-xl font-semibold transition-colors flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                  Add Food Item
                </button>
              </div>
              
              <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                 <div className="border border-gray-200 rounded-xl p-4 flex flex-col items-center text-center relative group">
                    <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                       <button className="bg-white shadow p-1.5 rounded-lg text-blue-600 hover:bg-blue-50"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg></button>
                       <button className="bg-white shadow p-1.5 rounded-lg text-red-600 hover:bg-red-50"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                    </div>
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-4xl mb-3">🍔</div>
                    <h4 className="font-bold text-gray-900">Cheese Burger</h4>
                    <p className="text-[#34A853] font-semibold mt-1">LKR 850.00</p>
                    <span className="text-xs text-gray-500 mt-1">Store: C Foods</span>
                 </div>
              </div>
            </div>
          )}

        </div>

        {/* --- MODALS --- */}
        
        {/* Add Store Modal */}
        {isStoreModalOpen && (
          <div className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl flex flex-col">
              <div className="bg-[#34A853] p-5 text-white flex justify-between items-center">
                <h2 className="text-xl font-bold">Add New Store</h2>
                <button onClick={() => setIsStoreModalOpen(false)} className="p-1 hover:bg-white/20 rounded-full">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              <div className="p-6">
                <form className="flex flex-col gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-1.5">Store Name</label>
                    <input type="text" placeholder="e.g. C Foods" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-[#34A853] focus:ring-1 focus:ring-[#34A853] outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-1.5">Owner Name</label>
                    <input type="text" placeholder="e.g. Kamal Perera" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-[#34A853] focus:ring-1 focus:ring-[#34A853] outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-1.5">Store Category</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-[#34A853] focus:ring-1 focus:ring-[#34A853] outline-none bg-white">
                      <option>Sri Lankan</option>
                      <option>Chinese</option>
                      <option>Fast Food</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-1.5">Upload Cover Image</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center text-gray-500 hover:border-[#34A853] hover:bg-[#f0f9f2] transition-colors cursor-pointer">
                      <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                      <span className="text-sm font-medium">Click to upload image</span>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-3">
                    <button type="button" onClick={() => setIsStoreModalOpen(false)} className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50">Cancel</button>
                    <button type="button" className="flex-1 bg-[#34A853] text-white px-4 py-2.5 rounded-lg font-bold hover:bg-[#2b8f45]">Save Store</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Add Food Modal */}
        {isFoodModalOpen && (
          <div className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl flex flex-col">
              <div className="bg-[#34A853] p-5 text-white flex justify-between items-center">
                <h2 className="text-xl font-bold">Add Food Item</h2>
                <button onClick={() => setIsFoodModalOpen(false)} className="p-1 hover:bg-white/20 rounded-full">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              <div className="p-6">
                <form className="flex flex-col gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-1.5">Food Name</label>
                    <input type="text" placeholder="e.g. Cheese Burger" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-[#34A853] focus:ring-1 focus:ring-[#34A853] outline-none" />
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="block text-sm font-semibold text-gray-800 mb-1.5">Price (LKR)</label>
                      <input type="number" placeholder="0.00" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-[#34A853] focus:ring-1 focus:ring-[#34A853] outline-none" />
                    </div>
                    <div className="flex-1">
                       <label className="block text-sm font-semibold text-gray-800 mb-1.5">Store</label>
                       <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-[#34A853] focus:ring-1 focus:ring-[#34A853] outline-none bg-white">
                         <option>C Foods</option>
                       </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-1.5">Upload Food Image</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center text-gray-500 hover:border-[#34A853] hover:bg-[#f0f9f2] transition-colors cursor-pointer">
                      <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                      <span className="text-sm font-medium">Click to upload image</span>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-3">
                    <button type="button" onClick={() => setIsFoodModalOpen(false)} className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50">Cancel</button>
                    <button type="button" className="flex-1 bg-[#34A853] text-white px-4 py-2.5 rounded-lg font-bold hover:bg-[#2b8f45]">Save Food</button>
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