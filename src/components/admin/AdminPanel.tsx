import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AddStoreModal from './AddStoreModal';

export default function AdminPanel() {
  const navigate = useNavigate();

  // State Management
  const [activeTab, setActiveTab] = useState<'dashboard' | 'stores' | 'users'>('dashboard');
  const [isStoreModalOpen, setIsStoreModalOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/');
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto relative">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">
          <h2 className="text-xl font-bold text-gray-800 capitalize">
            {activeTab === 'dashboard' ? 'Platform Overview' : activeTab === 'stores' ? 'Store Management' : 'User Management'}
          </h2>
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center font-bold text-white">A</div>
             <button onClick={handleLogout} className="bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-xl text-sm font-bold transition-colors flex items-center gap-2">
               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
               Logout
             </button>
          </div>
        </header>

        <div className="p-8">
          {/* DASHBOARD TAB */}
          {activeTab === 'dashboard' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                <div className="w-14 h-14 bg-[#e6f4ea] rounded-full flex items-center justify-center text-[#137333]">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                </div>
                <div><p className="text-gray-500 text-sm font-medium">Total Stores</p><p className="text-2xl font-bold text-gray-900">12</p></div>
              </div>
            </div>
          )}

          {/* STORES MANAGEMENT TAB */}
          {activeTab === 'stores' && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-bold text-lg text-gray-900">Registered Stores</h3>
                <button onClick={() => setIsStoreModalOpen(true)} className="bg-black hover:bg-gray-800 text-white px-5 py-2.5 rounded-xl font-semibold transition-colors flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                  Approve New Store
                </button>
              </div>
              <div className="p-0 overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 text-gray-500 text-sm border-b border-gray-100">
                    <tr><th className="py-4 px-6 font-medium">Store Name</th><th className="py-4 px-6 font-medium">Owner Email</th><th className="py-4 px-6 font-medium text-right">Actions</th></tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6 font-semibold text-gray-900">C Foods</td>
                      <td className="py-4 px-6 text-gray-600 text-sm">owner@cfoods.com</td>
                      <td className="py-4 px-6 text-right"><button className="text-red-500 font-medium text-sm hover:underline">Suspend</button></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* USER MANAGEMENT TAB */}
          {activeTab === 'users' && (
             <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-bold text-lg text-gray-900">Platform Users</h3>
                <p className="text-gray-500 mt-2 text-sm">User table content goes here...</p>
             </div>
          )}
        </div>

        <AddStoreModal isOpen={isStoreModalOpen} onClose={() => setIsStoreModalOpen(false)} />
        
      </main>
    </div>
  );
}