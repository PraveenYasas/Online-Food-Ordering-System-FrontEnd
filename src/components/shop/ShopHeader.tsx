interface ShopHeaderProps {
  activeTab: 'dashboard' | 'orders' | 'menu';
  onLogout: () => void;
}

function ShopHeader({ activeTab, onLogout }: ShopHeaderProps) {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10">
      <h2 className="text-xl font-bold text-gray-800 capitalize">
        {activeTab === 'dashboard' ? 'C Foods - Dashboard' : activeTab === 'orders' ? 'Incoming Orders' : 'Menu Management'}
      </h2>
      <div className="flex items-center gap-4">
         <span className="font-semibold text-sm text-gray-600 border border-gray-200 px-3 py-1.5 rounded-lg flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            Store Open
         </span>
         <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600">C</div>
         <button 
           onClick={onLogout}
           className="bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-xl text-sm font-bold transition-colors flex items-center gap-2"
         >
           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
           Logout
         </button>
      </div>
    </header>
  );
}

export default ShopHeader;