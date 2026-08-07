import { useState, useEffect } from 'react';

interface OrdersModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface OrderDetailDTO {
  id: number;
  foodItemId: number;
  foodItemName: string;
  quantity: number;
  price: number;
}

interface OrderDTO {
  id: number;
  orderDate: string;
  totalAmount: number;
  status: string;
  restaurantName: string;
  deliveryAddress: string;
  arrivalTime: string;
  driverName?: string;
  driverPhone?: string;
  orderDetails: OrderDetailDTO[];
}

function OrdersModal({ isOpen, onClose }: OrdersModalProps) {
  const [orders, setOrders] = useState<OrderDTO[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchMyOrders();
    }
  }, [isOpen]);

  const fetchMyOrders = async () => {
    setLoading(true);
    const token = localStorage.getItem('token');
    const userId = 4;

    try {
      const response = await fetch(`http://localhost:8080/api/v1/orders/user/${userId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        data.sort((a: OrderDTO, b: OrderDTO) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime());
        setOrders(data);
      } else {
        console.error("Failed to fetch orders");
      }
    } catch (error) {
      console.error("Error loading orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async (orderId: number) => {
    const confirmCancel = window.confirm("Are you sure you want to cancel this order?");
    if (!confirmCancel) return;

    const token = localStorage.getItem('token');
    
    try {
      const response = await fetch(`http://localhost:8080/api/v1/orders/${orderId}/status?status=Cancelled`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        fetchMyOrders();
      } else {
        alert("Failed to cancel the order. Please try again.");
      }
    } catch (error) {
      console.error("Error cancelling order:", error);
      alert("Server error while cancelling order.");
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', month: 'short', day: 'numeric', 
      hour: '2-digit', minute: '2-digit' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-120 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 md:p-6">
      <div className="bg-gray-50 w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        
        <div className="bg-[#3b5cf2] p-6 text-white relative shrink-0">
          <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <h2 className="text-3xl font-bold tracking-tight">My Orders</h2>
          <p className="text-white/90 text-[15px] mt-1">Track your order history</p>
        </div>

        <div className="p-4 md:p-6 overflow-y-auto no-scrollbar flex flex-col gap-6">
          
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3b5cf2]"></div>
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm">
               <span className="text-5xl mb-4 block opacity-50">🛒</span>
               <h3 className="text-lg font-bold text-gray-900">No Orders Yet</h3>
               <p className="text-gray-500 mt-2">Looks like you haven't placed any orders.</p>
            </div>
          ) : (
            orders.map((order) => (
              <div key={order.id} className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 md:p-6">
                
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-100 pb-4 mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">#ORD-{order.id.toString().padStart(4, '0')}</h3>
                    <p className="text-sm text-gray-500 mt-1">{formatDate(order.orderDate)}</p>
                  </div>

                  {order.status === 'Delivered' && (
                    <div className="flex items-center gap-1.5 px-4 py-1.5 bg-[#e6f4ea] text-[#137333] border border-[#ceead6] rounded-full font-semibold text-sm">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      Delivered
                    </div>
                  )}
                  {order.status === 'Pending' && (
                    <div className="flex items-center gap-1.5 px-4 py-1.5 bg-[#e8f0fe] text-[#1a73e8] border border-[#d2e3fc] rounded-full font-semibold text-sm">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      Processing
                    </div>
                  )}
                  {order.status === 'Cancelled' && (
                    <div className="flex items-center gap-1.5 px-4 py-1.5 bg-[#fce8e6] text-[#c5221f] border border-[#fad2cf] rounded-full font-semibold text-sm">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                      Cancelled
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-b border-gray-100 pb-4 mb-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                      <span className="text-xl">🏪</span>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium mb-0.5">Restaurant</p>
                      <p className="text-sm font-bold text-gray-900">{order.restaurantName || "BiteDash Shop"}</p>
                    </div>
                  </div>

                  {order.arrivalTime && (
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
                        <span className="text-xl">⏱️</span>
                      </div>
                      <div>
                        <p className="text-xs text-blue-500 font-medium mb-0.5">Estimated Time</p>
                        <p className="text-sm font-bold text-blue-600">{order.arrivalTime}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                      <span className="text-xl">📍</span>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium mb-0.5">Delivery Address</p>
                      <p className="text-sm font-bold text-gray-900 line-clamp-2">{order.deliveryAddress || "Not specified"}</p>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-[15px] font-bold text-gray-900 mb-3">Order Items</h4>
                  <div className="flex flex-col gap-3">
                    {order.orderDetails?.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center bg-gray-50 p-2.5 rounded-lg">
                        <div className="flex items-center gap-3">
                          <span className="bg-[#e6f4ea] text-[#137333] font-bold text-sm px-2.5 py-1.5 rounded-md">
                            {item.quantity}x
                          </span>
                          <div>
                            <p className="text-sm font-bold text-gray-900">{item.foodItemName}</p>
                            <p className="text-xs text-gray-500">LKR {item.price.toFixed(2)} each</p>
                          </div>
                        </div>
                        <span className="font-bold text-gray-900">LKR {(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-[#ebfbf0] border border-[#bbf2cd] rounded-xl p-4 flex justify-between items-center mb-5">
                  <span className="font-bold text-gray-900">Total Amount</span>
                  <span className="text-xl font-bold text-[#137333]">LKR {order.totalAmount.toFixed(2)}</span>
                </div>

                <div className="flex flex-wrap gap-3">
                  {order.status === 'Delivered' && (
                    <>
                      <button className="flex-1 min-w-30 bg-[#34A853] hover:bg-[#2b8f45] text-white font-bold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                        Reorder
                      </button>
                    </>
                  )}
                  
                  {order.status === 'Pending' && (
                    <>
                      <button className="flex-2 min-w-50 bg-[#3b5cf2] hover:bg-[#324fcc] text-white font-bold py-2.5 rounded-lg transition-colors">
                        Track Order
                      </button>
                      
                      {/* 🔥 Cancel Order Button */}
                      <button 
                        onClick={() => handleCancelOrder(order.id)}
                        className="flex-1 min-w-30 border border-red-200 bg-red-50 hover:bg-red-100 text-red-600 font-bold py-2.5 rounded-lg transition-colors"
                      >
                        Cancel Order
                      </button>
                    </>
                  )}

                  {order.status === 'Cancelled' && (
                    <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold px-6 py-2.5 rounded-lg transition-colors w-full sm:w-auto">
                      Get Help
                    </button>
                  )}
                </div>

              </div>
            ))
          )}

        </div>
      </div>
    </div>
  );
}

export default OrdersModal;