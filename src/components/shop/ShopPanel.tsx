import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import ShopSidebar from './ShopSidebar';
import ShopHeader from './ShopHeader';
import ShopDashboardTab from './ShopDashboardTab';
import ShopOrdersTab from './ShopOrdersTab';
import ShopMenuTab from './ShopMenuTab';
import AddFoodModal from './AddFoodModal';

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
      <ShopSidebar activeTab={activeTab} setActiveTab={setActiveTab} pendingOrdersCount={pendingOrders.length} />

      <main className="flex-1 overflow-y-auto relative">
        <ShopHeader activeTab={activeTab} onLogout={handleLogout} />

        <div className="p-8">
          {activeTab === 'dashboard' && <ShopDashboardTab />}
          
          {activeTab === 'orders' && (
            <ShopOrdersTab 
              pendingOrders={pendingOrders}
              onAccept={handleAcceptOrder}
              onReject={handleRejectOrder}
              onDeliver={handleDeliverOrder}
            />
          )}

          {activeTab === 'menu' && (
            <ShopMenuTab onOpenAddFood={() => setIsFoodModalOpen(true)} />
          )}
        </div>

        {/* Modals */}
        <AddFoodModal 
          isOpen={isFoodModalOpen} 
          onClose={() => setIsFoodModalOpen(false)} 
          categories={categories} 
          token={token} 
        />

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