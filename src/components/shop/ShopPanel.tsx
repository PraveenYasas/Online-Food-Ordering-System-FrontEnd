import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function ShopPanel() {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/');
    window.location.reload();
  };

  const [activeTab, setActiveTab] = useState<'dashboard' | 'orders' | 'menu'>('orders');
  const [isFoodModalOpen, setIsFoodModalOpen] = useState(false);
  const [isAcceptSuccessOpen, setIsAcceptSuccessOpen] = useState(false);

  const [foodName, setFoodName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/v1/categories')
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error("Error fetching categories:", err));
  }, []);

  const handleSaveFood = async (e: React.FormEvent) => {
    e.preventDefault(); 

    if (!imageFile || !foodName || !price || !categoryId) {
      alert("Please fill in all fields with valid information and image!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', imageFile);

      const imageRes = await fetch('http://localhost:8080/api/v1/images/upload', {
        method: 'POST',
        body: formData
      });

      if (!imageRes.ok) throw new Error("Image upload failed");
      
      const imageUrl = await imageRes.text();

      const foodData = {
        name: foodName,
        categoryId: Number(categoryId),
        price: parseFloat(price),
        description: description,
        imageUrl: imageUrl 
      };

      const foodRes = await fetch('http://localhost:8080/api/v1/food-items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(foodData)
      });

      if (foodRes.ok) {
        alert("Food item saved successfully!");
        setIsFoodModalOpen(false);
        setFoodName(''); setCategoryId(''); setPrice(''); setDescription(''); setImageFile(null);
      } else {
        alert("Something went wrong! Please try again.");
      }

    } catch (error) {
      console.error("Error saving food:", error);
      alert("Error connecting to the server!");
    }
  };

  const [pendingOrders, setPendingOrders] = useState([
    {
      id: '#ORD-8821',
      time: '2 mins ago',
      customer: 'Praveen Yasas',
      type: 'Delivery',
      items: [
        { qty: 2, name: 'Cheese Burger', price: 1700 },
        { qty: 1, name: 'Coca Cola', price: 400 }
      ],
      total: '2,100.00'
    },
    {
      id: '#ORD-8822',
      time: '5 mins ago',
      customer: 'Kamal Perera',
      type: 'Pickup',
      items: [
        { qty: 1, name: 'Spicy Chicken Burger', price: 1200 },
        { qty: 2, name: 'French Fries', price: 900 }
      ],
      total: '2,100.00'
    }
  ]);

  const handleAcceptOrder = (orderId: string) => {
    setPendingOrders(pendingOrders.filter(order => order.id !== orderId));
    setIsAcceptSuccessOpen(true);
  };

  const handleRejectOrder = (orderId: string) => {
    setPendingOrders(pendingOrders.filter(order => order.id !== orderId));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      
      {/* Shop Owner Sidebar */}
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
            {pendingOrders.length > 0 && (
              <span className="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">{pendingOrders.length}</span>
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

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative">
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
               onClick={handleLogout}
               className="bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-xl text-sm font-bold transition-colors flex items-center gap-2"
             >
               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
               Logout
             </button>
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
            <div className="max-w-4xl">
              {pendingOrders.length === 0 ? (
                <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center flex flex-col items-center justify-center shadow-sm">
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">All Caught Up!</h3>
                  <p className="text-gray-500">There are no pending orders at the moment. Take a breather.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6">
                  {pendingOrders.map((order) => (
                    <div key={order.id} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex flex-wrap items-center justify-between border-b border-gray-100 pb-4 mb-4 gap-4">
                          <div className="flex items-center gap-3">
                              <span className="bg-yellow-50 text-yellow-700 font-bold px-3 py-1 rounded-lg text-xs uppercase tracking-wider flex items-center gap-1.5">
                                <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-pulse"></div>
                                New Order
                              </span>
                              <h3 className="text-xl font-black text-gray-900">{order.id}</h3>
                              <span className="text-sm font-medium text-gray-500">{order.time}</span>
                          </div>
                          <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200">
                             <span className="text-sm font-bold text-gray-700">{order.type}</span>
                          </div>
                        </div>

                        <div className="flex flex-col md:flex-row gap-6 mb-6">
                          <div className="flex-1 bg-gray-50 rounded-xl p-4 border border-gray-100">
                            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Order Items</h4>
                            <ul className="space-y-2">
                              {order.items.map((item, index) => (
                                <li key={index} className="flex justify-between items-center text-sm">
                                  <div className="flex items-center gap-2">
                                    <span className="font-bold text-gray-900 bg-white border border-gray-200 w-6 h-6 flex items-center justify-center rounded text-xs">{item.qty}x</span>
                                    <span className="font-medium text-gray-700">{item.name}</span>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div className="w-full md:w-64 flex flex-col justify-between">
                            <div>
                               <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Customer</h4>
                               <p className="font-semibold text-gray-800 flex items-center gap-2">
                                 <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs">{order.customer.charAt(0)}</div>
                                 {order.customer}
                               </p>
                            </div>
                            <div className="mt-4 pt-4 border-t border-gray-100">
                              <p className="text-sm text-gray-500 font-medium">Total Amount</p>
                              <p className="text-2xl font-black text-[#34A853]">LKR {order.total}</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-3 justify-end">
                          <button onClick={() => handleRejectOrder(order.id)} className="px-6 py-2.5 rounded-xl font-bold text-red-600 hover:bg-red-50 border border-transparent hover:border-red-100 transition-all">Reject Order</button>
                          <button onClick={() => handleAcceptOrder(order.id)} className="bg-[#34A853] hover:bg-[#2b8f45] text-white px-8 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-sm shadow-green-200">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                            Accept & Prepare
                          </button>
                        </div>
                    </div>
                  ))}
                </div>
              )}
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
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                </button>
              </div>
              <div className="p-6 overflow-y-auto no-scrollbar">
                
                <form className="flex flex-col gap-5" onSubmit={handleSaveFood}>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-1.5">Food Name</label>
                      <input 
                        type="text" 
                        value={foodName}
                        onChange={(e) => setFoodName(e.target.value)}
                        placeholder="e.g. Spicy Chicken Burger" 
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-[#34A853] focus:ring-1 focus:ring-[#34A853] outline-none" 
                        required 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-1.5">Food Category</label>
                      <select 
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-[#34A853] focus:ring-1 focus:ring-[#34A853] outline-none bg-white"
                        required
                      >
                        <option value="">Select a category</option>
                        {categories.map((cat) => (
                          <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-1.5">Price (LKR)</label>
                      <input 
                        type="number" 
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="e.g. 1200.00" 
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-[#34A853] focus:ring-1 focus:ring-[#34A853] outline-none" 
                        required 
                      />
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
                    <textarea 
                      rows={2} 
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Brief description about the food (ingredients, portion size...)" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-[#34A853] focus:ring-1 focus:ring-[#34A853] outline-none resize-none"
                    ></textarea>
                  </div>

                  {/* 🔥 Image File Input එක 🔥 */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-1.5">Upload Food Image</label>
                    <input 
                      type="file" 
                      id="foodImage" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setImageFile(e.target.files[0]);
                        }
                      }}
                    />
                    <label 
                      htmlFor="foodImage" 
                      className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center text-gray-500 hover:border-[#34A853] hover:bg-[#f0f9f2] transition-colors cursor-pointer group"
                    >
                      {imageFile ? (
                        <>
                           <svg className="w-8 h-8 mb-2 text-[#34A853]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                           <span className="text-sm font-bold text-[#34A853]">{imageFile.name}</span>
                        </>
                      ) : (
                        <>
                          <svg className="w-8 h-8 mb-2 text-gray-400 group-hover:text-[#34A853] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                          </svg>
                          <span className="text-sm font-medium text-gray-700 group-hover:text-[#34A853] transition-colors">Click to upload food image</span>
                          <span className="text-xs text-gray-400 mt-1">Recommended size: 800x800px (PNG, JPG)</span>
                        </>
                      )}
                    </label>
                  </div>

                  <div className="mt-2 flex gap-3 pt-4 border-t border-gray-100">
                    <button type="button" onClick={() => setIsFoodModalOpen(false)} className="flex-1 px-4 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors">Cancel</button>
                    <button type="submit" className="flex-1 bg-[#34A853] text-white px-4 py-3 rounded-lg font-bold hover:bg-[#2b8f45] transition-colors">Save Food Item</button>
                  </div>

                </form>
              </div>
            </div>
          </div>
        )}

        {/* --- ORDER ACCEPT SUCCESS MODAL --- */}
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
                className="w-full bg-[#34A853] text-white font-bold py-3.5 rounded-xl hover:bg-[#2b8f45] transition-colors shadow-sm shadow-green-200"
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