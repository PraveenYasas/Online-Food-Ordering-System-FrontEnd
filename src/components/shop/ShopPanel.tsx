import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import ShopSidebar from './ShopSidebar';
import ShopHeader from './ShopHeader';
import ShopDashboardTab from './ShopDashboardTab';
import ShopOrdersTab from './ShopOrdersTab';

function ShopPanel() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/');
    window.location.reload();
  };

  const [activeTab, setActiveTab] = useState<'dashboard' | 'orders' | 'menu'>('orders');
  const [isAcceptSuccessOpen, setIsAcceptSuccessOpen] = useState(false);
  
  const [isFoodModalOpen, setIsFoodModalOpen] = useState(false);
  const [foodName, setFoodName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [categories, setCategories] = useState<any[]>([]);

  const [pendingOrders, setPendingOrders] = useState<any[]>([]);
  const token = localStorage.getItem('token'); 

  useEffect(() => {
    fetch('http://localhost:8080/api/v1/categories', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error("Error fetching categories:", err));

    const fetchLiveOrders = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/v1/orders/all', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          const live = data.filter((o: any) => o.status === 'Pending' || o.status === 'Processing');
          live.sort((a: any, b: any) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime());
          setPendingOrders(live);
        }
      } catch (error) {
        console.error("Error fetching live orders:", error);
      }
    };

    fetchLiveOrders();
    const intervalId = setInterval(fetchLiveOrders, 10000);
    return () => clearInterval(intervalId);
  }, [token]);

  const handleAcceptOrder = async (orderId: number) => {
    try {
      const res = await fetch(`http://localhost:8080/api/v1/orders/${orderId}/status?status=Processing`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setPendingOrders(pendingOrders.map(order => order.id === orderId ? { ...order, status: 'Processing' } : order));
        setIsAcceptSuccessOpen(true);
      }
    } catch (error) {
      console.error("Error accepting order:", error);
    }
  };

  const handleRejectOrder = async (orderId: number) => {
    const confirmReject = window.confirm("Are you sure you want to reject this order?");
    if (!confirmReject) return;
    try {
      const res = await fetch(`http://localhost:8080/api/v1/orders/${orderId}/status?status=Cancelled`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setPendingOrders(pendingOrders.filter(order => order.id !== orderId));
      }
    } catch (error) {
      console.error("Error rejecting order:", error);
    }
  };

  const handleDeliverOrder = async (orderId: number) => {
    try {
      const res = await fetch(`http://localhost:8080/api/v1/orders/${orderId}/status?status=Delivered`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setPendingOrders(pendingOrders.filter(order => order.id !== orderId));
      }
    } catch (error) {
      console.error("Error delivering order:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      
      <ShopSidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        pendingOrdersCount={pendingOrders.length} 
      />

      <main className="flex-1 overflow-y-auto relative">
        <ShopHeader activeTab={activeTab} onLogout={handleLogout} />

        <div className="p-8">
          
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && <ShopDashboardTab />}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <ShopOrdersTab 
              pendingOrders={pendingOrders}
              onAccept={handleAcceptOrder}
              onReject={handleRejectOrder}
              onDeliver={handleDeliverOrder}
            />
          )}

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
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-4xl mb-3">🍔</div>
                    <h4 className="font-bold text-gray-900">Cheese Burger</h4>
                    <p className="text-[#34A853] font-semibold mt-1">LKR 850.00</p>
                 </div>
              </div>
            </div>
          )}

        </div>

        {/* Order Accept Success Modal */}
        {isAcceptSuccessOpen && (
          <div className="fixed inset-0 z-200 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
             <div className="bg-white w-full max-w-sm rounded-2xl p-8 text-center shadow-2xl">
               <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Accepted!</h2>
               <p className="text-gray-500 mb-8 text-sm">Now preparing the food.</p>
               <button onClick={() => setIsAcceptSuccessOpen(false)} className="w-full bg-[#34A853] text-white font-bold py-3.5 rounded-xl">Continue Managing</button>
             </div>
          </div>
        )}

      </main>
    </div>
  );
}

export default ShopPanel;