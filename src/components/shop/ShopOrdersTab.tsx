interface ShopOrdersTabProps {
  pendingOrders: any[];
  onAccept: (id: number) => void;
  onReject: (id: number) => void;
  onDeliver: (id: number) => void;
}

function ShopOrdersTab({ pendingOrders, onAccept, onReject, onDeliver }: ShopOrdersTabProps) {
  if (pendingOrders.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center flex flex-col items-center justify-center shadow-sm max-w-4xl">
        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
          <span className="text-4xl">🎉</span>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-1">All Caught Up!</h3>
        <p className="text-gray-500">There are no pending orders at the moment. Take a breather.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl grid grid-cols-1 gap-6">
      {pendingOrders.map((order) => (
        <div key={order.id} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-wrap items-center justify-between border-b border-gray-100 pb-4 mb-4 gap-4">
              <div className="flex items-center gap-3">
                  <span className={`font-bold px-3 py-1 rounded-lg text-xs uppercase tracking-wider flex items-center gap-1.5 ${order.status === 'Pending' ? 'bg-yellow-50 text-yellow-700' : 'bg-blue-50 text-blue-700'}`}>
                    <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${order.status === 'Pending' ? 'bg-yellow-500' : 'bg-blue-500'}`}></div>
                    {order.status === 'Pending' ? 'New Order' : 'Preparing (Processing)'}
                  </span>
                  <h3 className="text-xl font-black text-gray-900">#ORD-{order.id.toString().padStart(4, '0')}</h3>
                  <span className="text-sm font-medium text-gray-500">
                    {new Date(order.orderDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
              </div>
              <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200">
                 <span className="text-sm font-bold text-gray-700">Delivery</span>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 mb-6">
              <div className="flex-1 bg-gray-50 rounded-xl p-4 border border-gray-100">
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Order Items</h4>
                <ul className="space-y-2">
                  {order.orderDetails?.map((item: any, index: number) => (
                    <li key={index} className="flex justify-between items-center text-sm">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-900 bg-white border border-gray-200 w-6 h-6 flex items-center justify-center rounded text-xs">{item.quantity}x</span>
                        <span className="font-medium text-gray-700">{item.foodItemName}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="w-full md:w-64 flex flex-col justify-between">
                <div>
                   <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Customer</h4>
                   <p className="font-semibold text-gray-800 flex items-center gap-2">
                     <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs">C</div>
                     Customer Name
                   </p>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-500 font-medium">Total Amount</p>
                  <p className="text-2xl font-black text-[#34A853]">LKR {order.totalAmount.toFixed(2)}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3 justify-end">
              {order.status === 'Pending' && (
                <>
                  <button onClick={() => onReject(order.id)} className="px-6 py-2.5 rounded-xl font-bold text-red-600 hover:bg-red-50 border border-transparent hover:border-red-100 transition-all">Reject Order</button>
                  <button onClick={() => onAccept(order.id)} className="bg-[#34A853] hover:bg-[#2b8f45] text-white px-8 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-sm shadow-green-200">
                    Accept & Prepare
                  </button>
                </>
              )}
              
              {order.status === 'Processing' && (
                <button onClick={() => onDeliver(order.id)} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-sm shadow-blue-200">
                  Mark as Delivered
                </button>
              )}
            </div>
        </div>
      ))}
    </div>
  );
}

export default ShopOrdersTab;