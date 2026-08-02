import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ShopPanel() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'orders' | 'menu'>('orders');
  const [isFoodModalOpen, setIsFoodModalOpen] = useState(false);
  
  // 1. අලුතින් Order Success Modal එකට State එකක් දැම්මා
  const [isAcceptSuccessOpen, setIsAcceptSuccessOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      
      {/* Shop Owner Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col md:flex">
        <div className="h-16 flex items-center px-6 border-b border-gray-100">
          <Link to="/" className="text-2xl font-bold tracking-tight cursor-pointer text-black hover:opacity-90 transition-opacity">
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
            <span className="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">3</span>
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

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">
          <h2 className="text-xl font-bold text-gray-800 capitalize">
            {activeTab === 'dashboard' ? 'C Foods - Dashboard' : activeTab === 'orders' ? 'Incoming Orders' : 'Menu Management'}
          </h2>
          <div className="flex items-center gap-4">
             <span className="font-semibold text-sm text-gray-600 border border-gray-200 px-3 py-1.5 rounded-lg flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                Store Open
             </span>
             <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600">C</div>
          </div>
        </header>

        <div className="p-8">
          
          {/* 1. SHOP DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <p className="text-gray-500 text-sm font-medium mb-1">Orders Today</p>
                <p className="text-3xl font-bold text-gray-900">24</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <p className="text-gray-500 text-sm font-medium mb-1">Revenue Today</p>
                <p className="text-3xl font-bold text-gray-900">LKR 45,200</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <p className="text-gray-500 text-sm font-medium mb-1">Top Selling Item</p>
                <p className="text-xl font-bold text-gray-900 mt-2">Cheese Burger</p>
              </div>
            </div>
          )}

          {/* 2. LIVE ORDERS */}
          {activeTab === 'orders' && (
            <div className="grid grid-cols-1 gap-4">
               <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex flex-col md:flex-row gap-4 justify-between md:items-center">
                  <div>
                     <div className="flex items-center gap-3 mb-2">
                        <span className="bg-yellow-100 text-yellow-700 font-bold px-3 py-1 rounded-md text-xs uppercase tracking-wide">New Order</span>
                        <span className="font-bold text-gray-900">#ORD-8821</span>
                        <span className="text-sm text-gray-500">2 mins ago</span>
                     </div>
                     <p className="font-medium text-gray-800">2x Cheese Burger, 1x Coca Cola</p>
                     <p className="text-sm text-gray-500 mt-1">Total: <span className="font-bold text-gray-900">LKR 2,100.00</span></p>
                  </div>
                  <div className="flex gap-2">
                     {/* 2. Button එක එබුවම Modal එක ඕපන් වෙන්න onClick එක දැම්මා */}
                     <button 
                        onClick={() => setIsAcceptSuccessOpen(true)}
                        className="bg-[#34A853] hover:bg-[#2b8f45] text-white px-6 py-2 rounded-lg font-bold transition-colors"
                     >
                        Accept & Prepare
                     </button>
                     <button className="bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-lg font-bold transition-colors">Reject</button>
                  </div>
               </div>
            </div>
          )}

          {/* 3. MENU MANAGEMENT */}
          {activeTab === 'menu' && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-bold text-lg text-gray-900">My Food Items</h3>
                <button onClick={() => setIsFoodModalOpen(true)} className="bg-[#34A853] hover:bg-[#2b8f45] text-white px-5 py-2.5 rounded-xl font-semibold transition-colors flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                  Add New Item
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
                    <div className="mt-3 flex items-center gap-2">
                       <div className="w-2 h-2 rounded-full bg-green-500"></div>
                       <span className="text-xs font-bold text-gray-600">Available</span>
                    </div>
                 </div>
              </div>
            </div>
          )}

        </div>

        {/* --- ADD FOOD MODAL --- */}
        {isFoodModalOpen && (
          <div className="fixed inset-0 z-200 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
              <div className="bg-[#34A853] p-5 text-white flex justify-between items-center shrink-0">
                <div>
                  <h2 className="text-xl font-bold">Add New Food Item</h2>
                  <p className="text-white/80 text-xs mt-1">Fill in the details to add this item to your menu</p>
                </div>
                <button onClick={() => setIsFoodModalOpen(false)} className="p-1 hover:bg-white/20 rounded-full transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-6 overflow-y-auto no-scrollbar">
                <form className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-1.5">Food Name</label>
                      <input type="text" placeholder="e.g. Spicy Chicken Burger" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-[#34A853] focus:ring-1 focus:ring-[#34A853] outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-1.5">Food Category</label>
                      <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-[#34A853] focus:ring-1 focus:ring-[#34A853] outline-none bg-white">
                        <option value="">Select a category</option>
                        <option value="Grocery">Grocery</option>
                        <option value="Soup">Soup</option>
                        <option value="Chinese">Chinese</option>
                        <option value="Burgers">Burgers</option>
                        <option value="Desserts">Desserts</option>
                        <option value="BBQ">BBQ</option>
                        <option value="Korean">Korean</option>
                        <option value="Bakery">Bakery</option>
                        <option value="Indian">Indian</option>
                        <option value="Asian">Asian</option>
                        <option value="Salads">Salads</option>
                        <option value="Smoothies">Smoothies</option>
                        <option value="Coffee">Coffee</option>
                        <option value="American">American</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-1.5">Price (LKR)</label>
                      <input type="number" placeholder="e.g. 1200.00" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-[#34A853] focus:ring-1 focus:ring-[#34A853] outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-1.5">Item Status</label>
                      <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-[#34A853] focus:ring-1 focus:ring-[#34A853] outline-none bg-white">
                        <option value="Available">Available</option>
                        <option value="Out of Stock">Out of Stock</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-1.5">Description (Optional)</label>
                    <textarea rows={2} placeholder="Brief description about the food (ingredients, portion size...)" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-[#34A853] focus:ring-1 focus:ring-[#34A853] outline-none resize-none"></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-1.5">Upload Food Image</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center text-gray-500 hover:border-[#34A853] hover:bg-[#f0f9f2] transition-colors cursor-pointer group">
                      <svg className="w-8 h-8 mb-2 text-gray-400 group-hover:text-[#34A853] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                      </svg>
                      <span className="text-sm font-medium text-gray-700 group-hover:text-[#34A853] transition-colors">Click to upload food image</span>
                      <span className="text-xs text-gray-400 mt-1">Recommended size: 800x800px (PNG, JPG)</span>
                    </div>
                  </div>
                  <div className="mt-2 flex gap-3 pt-4 border-t border-gray-100">
                    <button type="button" onClick={() => setIsFoodModalOpen(false)} className="flex-1 px-4 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors">Cancel</button>
                    <button type="button" className="flex-1 bg-[#34A853] text-white px-4 py-3 rounded-lg font-bold hover:bg-[#2b8f45] transition-colors">Save Food Item</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* --- 3. අලුතින් හදපු ORDER ACCEPT SUCCESS MODAL එක --- */}
        {isAcceptSuccessOpen && (
          <div className="fixed inset-0 z-200 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-sm rounded-24px p-8 text-center shadow-2xl">
              <div className="w-20 h-20 bg-[#e6f4ea] rounded-full flex items-center justify-center mx-auto mb-5">
                <svg className="w-10 h-10 text-[#34A853]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Accepted!</h2>
              <p className="text-gray-500 mb-8 text-sm">
                The customer has been notified that you are preparing their food.
              </p>
              <button 
                onClick={() => setIsAcceptSuccessOpen(false)}
                className="w-full bg-[#34A853] text-white font-bold py-3.5 rounded-xl hover:bg-[#2b8f45] transition-colors"
              >
                Continue Managing
              </button>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}