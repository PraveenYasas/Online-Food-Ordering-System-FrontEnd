import { useState } from 'react';
import { useCart } from './CartContext'; // Context එක Import කරගන්න

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const [paymentMethod, setPaymentMethod] = useState('cod');
  
  // Context එකෙන් ඩේටා ගන්නවා
  const { cartTotal, clearCart } = useCart();

  if (!isOpen) return null;

  // ගණන් හදන කෑල්ල ආයෙත් (Checkout එකේ යටින් පෙන්නන්න)
  const serviceFee = 2.50;
  const tax = cartTotal * 0.08;
  const promoDiscount = 5.00;
  const finalTotal = cartTotal > 0 ? (cartTotal + serviceFee + tax - promoDiscount) : 0;

  // Checkout බටන් එක එබුවම වෙන දේ
  const handleCheckout = () => {
    // ඉස්සරහට මෙතනින් තමයි ඔයාගේ Spring Boot Backend එකට Axios එකෙන් Request එක යවන්නේ.
    console.log("Placing order for LKR", finalTotal.toFixed(2));
    
    // වැඩේ ඉවර වුනාම
    alert("Order Placed Successfully!");
    clearCart(); // Cart එක හිස් කරනවා
    onClose();   // Modal එක වහනවා
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        
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
          
          {/* Delivery Details */}
          <div>
            <h3 className="font-bold text-gray-900 mb-3 text-lg">Delivery Details</h3>
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
              <div className="flex justify-between items-start mb-2">
                <span className="font-semibold text-gray-800">John Doe</span>
                <button className="text-[#34A853] text-sm font-medium hover:underline">Edit</button>
              </div>
              <p className="text-sm text-gray-600">+94 77 123 4567</p>
              <p className="text-sm text-gray-600 mt-1">123 Main Street, Colombo 04</p>
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Payment Method */}
          <div>
            <h3 className="font-bold text-gray-900 mb-3 text-lg">Payment Method</h3>
            <div className="flex flex-col gap-3">
              
              <label className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${paymentMethod === 'cod' ? 'border-[#34A853] bg-[#f0f9f2]' : 'border-gray-200 hover:border-gray-300'}`}>
                <input 
                  type="radio" 
                  name="payment" 
                  value="cod" 
                  checked={paymentMethod === 'cod'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-5 h-5 text-[#34A853] focus:ring-[#34A853]"
                />
                <div className="flex-1">
                  <span className="font-semibold text-gray-900 block">Cash on Delivery</span>
                  <span className="text-xs text-gray-500">Pay when you receive the order</span>
                </div>
              </label>

              <label className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${paymentMethod === 'card' ? 'border-[#34A853] bg-[#f0f9f2]' : 'border-gray-200 hover:border-gray-300'}`}>
                <input 
                  type="radio" 
                  name="payment" 
                  value="card" 
                  checked={paymentMethod === 'card'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-5 h-5 text-[#34A853] focus:ring-[#34A853]"
                />
                <div className="flex-1">
                  <span className="font-semibold text-gray-900 block">Credit / Debit Card</span>
                  <span className="text-xs text-gray-500">Pay securely online</span>
                </div>
              </label>

            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-5 border-t border-gray-100 bg-gray-50 shrink-0">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-600 font-medium">Total to Pay</span>
            {/* Dynamic Total */}
            <span className="text-xl font-bold text-[#34A853]">LKR {finalTotal.toFixed(2)}</span>
          </div>
          {/* onClick එකට handleCheckout ෆන්ක්ෂන් එක දුන්නා */}
          <button 
            onClick={handleCheckout} 
            className="w-full bg-[#34A853] hover:bg-[#2b8f45] transition-colors text-white font-bold py-3.5 rounded-xl text-lg"
          >
            Confirm & Place Order
          </button>
        </div>

      </div>
    </div>
  );
}

export default CheckoutModal;