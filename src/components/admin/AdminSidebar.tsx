import { Link } from 'react-router-dom';

interface AdminSidebarProps {
  activeTab: 'dashboard' | 'stores' | 'users';
  setActiveTab: (tab: 'dashboard' | 'stores' | 'users') => void;
}

function AdminSidebar({ activeTab, setActiveTab }: AdminSidebarProps) {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col md:flex shrink-0">
      <div className="h-16 flex items-center px-6 border-b border-gray-100">
        <Link to="/admin" onClick={() => setActiveTab('dashboard')} className="text-2xl font-bold tracking-tight cursor-pointer text-black hover:opacity-90 transition-opacity">
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
  );
}

export default AdminSidebar;