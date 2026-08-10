import { Link } from 'react-router-dom';

interface ShopSidebarProps {
  activeTab: 'dashboard' | 'orders' | 'menu';
  setActiveTab: (tab: 'dashboard' | 'orders' | 'menu') => void;
  pendingOrdersCount: number;
}

function ShopSidebar({ activeTab, setActiveTab, pendingOrdersCount }: ShopSidebarProps) {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col md:flex shrink-0">
      <div className="h-16 flex items-center px-6 border-b border-gray-100">
        <Link to="/shop-admin" onClick={() => setActiveTab('dashboard')} className="text-2xl font-bold tracking-tight cursor-pointer text-black hover:opacity-90 transition-opacity">
          Bite<span className="text-[#05C167]">Dash</span> 
          <span className="text-xs font-bold text-white bg-blue-600 px-2 py-0.5 rounded ml-2">SHOP</span>
        </Link>
      </div>
      
      <nav className="flex-1 p-4 space-y-1">
        <button 
          onClick={() => setActiveTab('dashboard')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'dashboard' ? 'bg-[#e6f4ea] text-[#137333]' : 'text-gray-600 hover:bg-gray-50'}`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
          Shop Overview
        </button>
        
        <button 
          onClick={() => setActiveTab('orders')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'orders' ? 'bg-[#e6f4ea] text-[#137333]' : 'text-gray-600 hover:bg-gray-50'}`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
          Live Orders
          {pendingOrdersCount > 0 && (
            <span className="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">{pendingOrdersCount}</span>
          )}
        </button>
        
        <button 
          onClick={() => setActiveTab('menu')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'menu' ? 'bg-[#e6f4ea] text-[#137333]' : 'text-gray-600 hover:bg-gray-50'}`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
          My Menu
        </button>
      </nav>
    </aside>
  );
}

export default ShopSidebar;