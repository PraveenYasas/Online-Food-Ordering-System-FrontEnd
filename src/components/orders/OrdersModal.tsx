interface OrdersModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const mockOrders = [
  {
    id: "#ORD-2024-001",
    date: "2026-05-08 at 2:30 PM",
    status: "Delivered",
    restaurant: "C Foods",
    address: "123 Main Street, Colombo",
    items: [
      { qty: 2, name: "Chicken Cheese Kottu", unitPrice: 1350.00, total: 2700.00 },
      { qty: 1, name: "Chicken Fried Rice", unitPrice: 950.00, total: 950.00 }
    ],
    totalAmount: 3650.00
  },
  {
    id: "#ORD-2024-002",
    date: "2026-05-08 at 5:45 PM",
    status: "In Progress",
    restaurant: "Shanghai Family Restaurant",
    address: "123 Main Street, Colombo",
    eta: "15 min",
    driver: { name: "Mike Fernando", phone: "+94 77 987 6543", initial: "M" },
    items: [
      { qty: 1, name: "Spicy Noodles", unitPrice: 850.00, total: 850.00 },
      { qty: 1, name: "Seafood Paella", unitPrice: 1899.00, total: 1899.00 }
    ],
    totalAmount: 2749.00
  },
  {
    id: "#ORD-2024-003",
    date: "2026-05-07 at 7:15 PM",
    status: "Cancelled",
    restaurant: "Korean Mummy",
    address: "123 Main Street, Colombo",
    items: [
      { qty: 1, name: "Grilled Steak", unitPrice: 2450.00, total: 2450.00 },
      { qty: 2, name: "Chocolate Lava Cake", unitPrice: 650.00, total: 1300.00 }
    ],
    totalAmount: 3750.00
  }
];

function OrdersModal({ isOpen, onClose }: OrdersModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-120 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 md:p-6">
      
      {/* Modal Container */}
      <div className="bg-gray-50 w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Header - Vibrant Blue */}
        <div className="bg-[#3b5cf2] p-6 text-white relative shrink-0">
          <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <h2 className="text-3xl font-bold tracking-tight">My Orders</h2>
          <p className="text-white/90 text-[15px] mt-1">Track your order history</p>
        </div>

        {/* Scrollable Body */}
        <div className="p-4 md:p-6 overflow-y-auto no-scrollbar flex flex-col gap-6">
          
          {mockOrders.map((order) => (
            <div key={order.id} className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 md:p-6">
              
              {/* Order Header (ID, Date, Status Badge) */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-100 pb-4 mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{order.id}</h3>
                  <p className="text-sm text-gray-500 mt-1">{order.date}</p>
                </div>

                {/* Status Badges */}
                {order.status === 'Delivered' && (
                  <div className="flex items-center gap-1.5 px-4 py-1.5 bg-[#e6f4ea] text-[#137333] border border-[#ceead6] rounded-full font-semibold text-sm">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    Delivered
                  </div>
                )}
                {order.status === 'In Progress' && (
                  <div className="flex items-center gap-1.5 px-4 py-1.5 bg-[#e8f0fe] text-[#1a73e8] border border-[#d2e3fc] rounded-full font-semibold text-sm">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    In Progress
                  </div>
                )}
                {order.status === 'Cancelled' && (
                  <div className="flex items-center gap-1.5 px-4 py-1.5 bg-[#fce8e6] text-[#c5221f] border border-[#fad2cf] rounded-full font-semibold text-sm">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    Cancelled
                  </div>
                )}
              </div>

              {/* Order Info (Restaurant & Address) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-b border-gray-100 pb-4 mb-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium mb-0.5">Restaurant</p>
                    <p className="text-sm font-bold text-gray-900">{order.restaurant}</p>
                  </div>
                </div>

                {order.eta && (
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <div>
                      <p className="text-xs text-blue-500 font-medium mb-0.5">Arriving in</p>
                      <p className="text-sm font-bold text-blue-600">{order.eta}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium mb-0.5">Delivery Address</p>
                    <p className="text-sm font-bold text-gray-900">{order.address}</p>
                  </div>
                </div>
              </div>

              {/* Items List */}
              <div className="mb-6">
                <h4 className="text-[15px] font-bold text-gray-900 mb-3">Order Items</h4>
                <div className="flex flex-col gap-3">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <span className="bg-[#e6f4ea] text-[#137333] font-bold text-sm px-2.5 py-1.5 rounded-md">
                          {item.qty}x
                        </span>
                        <div>
                          <p className="text-sm font-bold text-gray-900">{item.name}</p>
                          <p className="text-xs text-gray-500">LKR {item.unitPrice.toFixed(2)} each</p>
                        </div>
                      </div>
                      <span className="font-bold text-gray-900">LKR {item.total.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Driver Info (If In Progress) */}
              {order.driver && (
                <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 flex justify-between items-center mb-4">
                  <div>
                    <p className="text-xs font-bold text-blue-800 mb-2">Driver Information</p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-500 text-white font-bold rounded-full flex items-center justify-center">
                        {order.driver.initial}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900 leading-tight">{order.driver.name}</p>
                        <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                          {order.driver.phone}
                        </p>
                      </div>
                    </div>
                  </div>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-bold px-4 py-2.5 rounded-lg transition-colors">
                    Contact Driver
                  </button>
                </div>
              )}

              {/* Total Amount Box */}
              <div className="bg-[#ebfbf0] border border-[#bbf2cd] rounded-xl p-4 flex justify-between items-center mb-5">
                <span className="font-bold text-gray-900">Total Amount</span>
                <span className="text-xl font-bold text-[#137333]">LKR {order.totalAmount.toFixed(2)}</span>
              </div>

              {/* Action Buttons based on Status */}
              <div className="flex flex-wrap gap-3">
                {order.status === 'Delivered' && (
                  <>
                    <button className="flex-1 min-w-30 bg-[#34A853] hover:bg-[#2b8f45] text-white font-bold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                      Reorder
                    </button>
                    <button className="flex-1 min-w-30 border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold py-2.5 rounded-lg transition-colors">
                      Leave Review
                    </button>
                    <button className="flex-1 min-w-30 border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold py-2.5 rounded-lg transition-colors">
                      Get Help
                    </button>
                  </>
                )}
                
                {order.status === 'In Progress' && (
                  <>
                    <button className="flex-2 min-w-50 bg-[#3b5cf2] hover:bg-[#324fcc] text-white font-bold py-2.5 rounded-lg transition-colors">
                      Track Order
                    </button>
                    <button className="flex-1 min-w-30 border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold py-2.5 rounded-lg transition-colors">
                      Get Help
                    </button>
                  </>
                )}

                {order.status === 'Cancelled' && (
                  <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold px-6 py-2.5 rounded-lg transition-colors">
                    Get Help
                  </button>
                )}
              </div>

            </div>
          ))}

        </div>
      </div>
    </div>
  );
}

export default OrdersModal;