import { useState } from 'react';
import { useCart } from './CartContext';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isEditing, setIsEditing] = useState(false); 
  
  // Dynamic Delivery Data
  const [deliveryInfo, setDeliveryInfo] = useState({
    name: 'Praveen Yasas',
    phone: '+94 77 123 4567',
    address: 'Bandaragama, Western Province, Sri Lanka'
  });
  
  const { cartTotal, clearCart } = useCart();

  if (!isOpen) {
    if (isSuccess) setIsSuccess(false);
    if (isEditing) setIsEditing(false);
    return null;
  }

  const serviceFee = 2.50;
  const tax = cartTotal * 0.08;
  const promoDiscount = 5.00;
  const finalTotal = cartTotal > 0 ? (cartTotal + serviceFee + tax - promoDiscount) : 0;

  const handleCheckout = () => {
    setIsSuccess(true);
    clearCart(); 
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-200 flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={!isSuccess ? onClose : undefined}
      />

      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col min-h-300px max-h-[90vh] transition-all duration-300">
        
        {isSuccess ? (
          // ================= SUCCESS MESSAGE UI =================
          <div className="p-10 flex flex-col items-center justify-center text-center h-full animate-fade-in my-auto">
            <div className="w-24 h-24 bg-[#e6f4ea] rounded-full flex items-center justify-center mb-6 shadow-inner">
              <svg className="w-12 h-12 text-[#34A853]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">Order Placed!</h2>
            <p className="text-gray-500 mb-8 font-medium">Your delicious food is being prepared and will be with you shortly.</p>
            <div className="w-8 h-8 border-4 border-[#34A853] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          // ================= CHECKOUT FORM UI =================
          <>
            {/* Header */}
            <div className="bg-[#34A853] p-5 text-white flex justify-between items-center shrink-0">
              <h2 className="text-xl font-bold">Checkout</h2>
              <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Body */}
            <div className="p-6 overflow-y-auto flex-1 flex flex-col gap-6">
              
              {/* Delivery Details Section */}
              <div>
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Delivery Details</h3>
                
                {isEditing ? (
                  // Edit Mode Form
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 animate-fade-in">
                    <div className="flex flex-col gap-3">
                      <div>
                        <label className="text-xs font-bold text-gray-500 mb-1 block">Full Name</label>
                        <input 
                          type="text" 
                          value={deliveryInfo.name} 
                          onChange={(e) => setDeliveryInfo({...deliveryInfo, name: e.target.value})} 
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#34A853]/50 focus:border-[#34A853] outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-gray-500 mb-1 block">Phone Number</label>
                        <input 
                          type="tel" 
                          value={deliveryInfo.phone} 
                          onChange={(e) => setDeliveryInfo({...deliveryInfo, phone: e.target.value})} 
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#34A853]/50 focus:border-[#34A853] outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-gray-500 mb-1 block">Delivery Address</label>
                        <textarea 
                          value={deliveryInfo.address} 
                          onChange={(e) => setDeliveryInfo({...deliveryInfo, address: e.target.value})} 
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#34A853]/50 focus:border-[#34A853] outline-none transition-all resize-none"
                          rows={2}
                        />
                      </div>
                      <div className="flex gap-2 mt-2">
                        <button onClick={() => setIsEditing(false)} className="flex-1 bg-[#34A853] hover:bg-[#2b8f45] text-white py-2 rounded-lg font-bold text-sm transition-colors">Save</button>
                        <button onClick={() => setIsEditing(false)} className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 rounded-lg font-bold text-sm transition-colors">Cancel</button>
                      </div>
                    </div>
                  </div>
                ) : (
                  // View Mode Card
                  <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:border-[#34A853] transition-colors group">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                         <div className="w-8 h-8 bg-[#e6f4ea] rounded-full flex items-center justify-center text-[#137333]">
                           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                         </div>
                         <span className="font-bold text-gray-900">{deliveryInfo.name}</span>
                      </div>
                      <button onClick={() => setIsEditing(true)} className="text-[#34A853] text-sm font-bold bg-[#e6f4ea] px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">Edit</button>
                    </div>
                    <div className="pl-10">
                      <p className="text-sm text-gray-600 flex items-center gap-2">
                        <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                        {deliveryInfo.phone}
                      </p>
                      <p className="text-sm text-gray-600 mt-1.5 flex items-start gap-2 leading-tight">
                        <svg className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        {deliveryInfo.address}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <hr className="border-gray-100" />

              {/* Payment Method */}
              <div>
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Payment Method</h3>
                <div className="flex flex-col gap-3">
                  <label className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${paymentMethod === 'cod' ? 'border-[#34A853] bg-[#f0f9f2] shadow-sm' : 'border-gray-200 hover:border-gray-300'}`}>
                    <input 
                      type="radio" 
                      name="payment" 
                      value="cod" 
                      checked={paymentMethod === 'cod'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-5 h-5 text-[#34A853] focus:ring-[#34A853]"
                    />
                    <div className="flex-1">
                      <span className="font-bold text-gray-900 block">Cash on Delivery</span>
                      <span className="text-xs text-gray-500 font-medium">Pay when you receive the order</span>
                    </div>
                  </label>

                  <label className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${paymentMethod === 'card' ? 'border-[#34A853] bg-[#f0f9f2] shadow-sm' : 'border-gray-200 hover:border-gray-300'}`}>
                    <input 
                      type="radio" 
                      name="payment" 
                      value="card" 
                      checked={paymentMethod === 'card'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-5 h-5 text-[#34A853] focus:ring-[#34A853]"
                    />
                    <div className="flex-1">
                      <span className="font-bold text-gray-900 block">Credit / Debit Card</span>
                      <span className="text-xs text-gray-500 font-medium">Pay securely online</span>
                    </div>
                  </label>
                </div>
              </div>

            </div>

            {/* Footer */}
            <div className="p-5 border-t border-gray-100 bg-gray-50 shrink-0">
              <div className="flex justify-between items-center mb-4">
                {/* මම මෙතන font-medium සහ font-bold විදියට ඔරිජිනල් සයිස් එකට හැදුවා */}
                <span className="text-gray-600 font-medium">Total to Pay</span>
                <span className="text-xl font-bold text-[#34A853]">LKR {finalTotal.toFixed(2)}</span>
              </div>
              <button 
                onClick={handleCheckout} 
                className="w-full bg-[#34A853] hover:bg-[#2b8f45] transition-colors text-white font-bold py-3.5 rounded-xl text-lg flex justify-center items-center gap-2"
              >
                Confirm & Place Order
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  );
}

export default CheckoutModal;