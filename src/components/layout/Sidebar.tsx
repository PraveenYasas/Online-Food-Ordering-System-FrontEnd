import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenOrders: () => void;
  onOpenFavorites: () => void;
  onOpenAdminPanel: () => void;
}

function Sidebar({ isOpen, onClose, onOpenOrders, onOpenFavorites, onOpenAdminPanel }: SidebarProps) {
  
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const role = localStorage.getItem("role");
    setUserRole(role);
  }, [isOpen]);

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    localStorage.removeItem("role");
    window.location.href = '/';
  };

  const handleOpenShopPanel = () => {
    onClose();
    navigate('/shop-admin');
  };

  return (
    <>
      {/* Background Overlay */}
      <div 
        className={`fixed inset-0 z-100 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={onClose}
      />

      {/* Sidebar Panel */}
      <div 
        className={`fixed top-0 left-0 h-full w-280px bg-white z-110 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          
          <Link 
            to="/profile" 
            onClick={onClose}
            className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded-xl transition-colors cursor-pointer w-full"
          >
            <div className="w-12 h-12 bg-[#e6f4ea] text-[#34A853] rounded-full flex items-center justify-center font-bold text-xl shadow-inner shrink-0">
              {userRole === 'ADMIN' ? 'A' : userRole === 'SHOP_OWNER' ? 'S' : 'P'}
            </div>
            {/* Name Details */}
            <div>
              <h2 className="text-[18px] font-bold text-black leading-tight">
                {userRole === 'ADMIN' ? 'System Admin' : userRole === 'SHOP_OWNER' ? 'Shop Owner' : 'Praveen Yasas'}
              </h2>
              <span className="text-sm text-[#05C167] font-semibold hover:underline">View account</span>
            </div>
          </Link>
          
          {/* Close Button (X) */}
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors shrink-0 ml-2">
            <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* 2. Menu Links */}
        <div className="flex-1 overflow-y-auto py-2">
          <nav className="flex flex-col">
            
            <Link to="/" onClick={onClose} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-100 transition-colors">
              <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
              <span className="font-semibold text-[16px] text-black">Home</span>
            </Link>

            {userRole !== 'ADMIN' && userRole !== 'SHOP_OWNER' && (
              <>
                <button onClick={onOpenOrders} className="w-full flex items-center gap-4 px-6 py-4 hover:bg-gray-100 transition-colors text-left">
                  <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                  <span className="font-semibold text-[16px] text-black">Orders</span>
                </button>

                <button onClick={onOpenFavorites} className="w-full flex items-center gap-4 px-6 py-4 hover:bg-gray-100 transition-colors text-left">
                  <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                  <span className="font-semibold text-[16px] text-black">Favorites</span>
                </button>
              </>
            )}

            {userRole === 'ADMIN' && (
              <button onClick={onOpenAdminPanel} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-100 transition-colors w-full text-left">
                <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                <span className="font-semibold text-[16px] text-black">Admin Panel</span>
              </button>
            )}

            {userRole === 'SHOP_OWNER' && (
              <button onClick={handleOpenShopPanel} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-100 transition-colors w-full text-left">
                <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                <span className="font-semibold text-[16px] text-black">Shop Dashboard</span>
              </button>
            )}

          </nav>
        </div>

        {/* 3. Bottom Section (Sign out) */}
        <div className="border-t border-gray-200 py-4 mt-auto">
          <button 
            onClick={handleLogout}
            className="w-full text-left px-6 py-3 font-semibold text-[16px] text-black hover:bg-gray-100 transition-colors flex items-center gap-4"
          >
            <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            Sign out
          </button>
        </div>

      </div>
    </>
  );
}

export default Sidebar;