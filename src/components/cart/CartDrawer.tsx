import { useState } from 'react';
import CheckoutModal from './CheckoutModal';
import { useCart } from './CartContext'; // Context එක Import කරගන්න

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  
  // Context එකෙන් Cart එකේ ඩේටා ටික ගන්නවා
  const { cartItems, cartTotal, removeFromCart } = useCart();
  
  // Cart එක හිස්ද කියලා බලනවා
  const isEmpty = cartItems.length === 0;

  // ගණන් හදන කෑල්ල (Dynamic)
  const serviceFee = 2.50;
  const tax = cartTotal * 0.08; // 8% Tax
  const promoDiscount = 5.00;
  const finalTotal = cartTotal > 0 ? (cartTotal + serviceFee + tax - promoDiscount) : 0;

  return (
    <>
      <div 
        className={`fixed inset-0 z-150 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={onClose}
      />

      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-100 md:w-112.5 bg-white z-160 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        
        {/* Header */}
        <div className="bg-[#34A853] p-6 text-white relative shrink-0">
          <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <h2 className="text-2xl font-bold tracking-tight">Your Cart</h2>
          <p className="text-white/90 text-sm mt-1">
            {isEmpty ? '0 items' : `${cartItems.length} item(s)`} • C Foods
          </p>

          {!isEmpty && (
            <div className="mt-4 bg-white/20 rounded-lg p-3 flex items-center gap-2 text-sm font-medium">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Delivery in 25-35 min
            </div>
          )}
        </div>

        {/* Body Area */}
        <div className="flex-1 overflow-y-auto no-scrollbar flex flex-col">
          
          {isEmpty ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center h-full">
              <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h3>
              <p className="text-gray-500 mb-8 text-[15px]">Add some delicious items to get started!</p>
              <button onClick={onClose} className="bg-[#34A853] hover:bg-[#2b8f45] transition-colors text-white font-bold py-3 px-8 rounded-full">
                Browse Menu
              </button>
            </div>
          ) : (
            <div className="p-6 flex flex-col gap-6">
              
              {/* Delivery Address Box */}
              <div className="border border-gray-200 rounded-xl p-4 flex gap-4">
                <div className="w-10 h-10 bg-[#e6f4ea] rounded-full flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-[#137333]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900">Delivery Address</h4>
                  <p className="text-sm text-gray-600 mt-0.5">Upazil Hardware, Now</p>
                  <button className="text-[#34A853] font-semibold text-sm mt-1 hover:underline">Change</button>
                </div>
              </div>

              {/* Order Items Header */}
              <h4 className="font-bold text-lg flex items-center gap-2 text-gray-900 mt-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                Order Items
              </h4>

              {/* Dynamic Items List (අලුතින් එකතු කරපු කෑල්ල) */}
              <div className="flex flex-col gap-4 mb-2">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-gray-900">{item.name} x {item.quantity}</p>
                      <button onClick={() => removeFromCart(item.id)} className="text-xs text-red-500 hover:underline">Remove</button>
                    </div>
                    <p className="font-medium text-gray-900">LKR {(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              
              <hr className="border-gray-100" />

              {/* Dynamic Receipt Breakdown */}
              <div className="flex flex-col gap-3">
                <div className="flex justify-between text-[15px] text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-900">LKR {cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[15px] text-gray-600">
                  <span>Delivery Fee</span>
                  <span className="font-semibold text-[#34A853]">FREE</span>
                </div>
                <div className="flex justify-between text-[15px] text-gray-600">
                  <span>Service Fee</span>
                  <span className="font-semibold text-gray-900">LKR {serviceFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[15px] text-gray-600">
                  <span>Tax (8%)</span>
                  <span className="font-semibold text-gray-900">LKR {tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[15px] text-[#34A853] font-medium">
                  <span>Promo Discount</span>
                  <span>-LKR {promoDiscount.toFixed(2)}</span>
                </div>
              </div>

              <hr className="border-gray-200 my-2" />

              {/* Final Total */}
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-gray-900">Total</span>
                <span className="text-2xl font-bold text-[#34A853]">LKR {finalTotal.toFixed(2)}</span>
              </div>

            </div>
          )}
        </div>

        {/* Footer */}
        {!isEmpty && (
          <div className="p-6 bg-white border-t border-gray-100 shrink-0">
            <button onClick={() => setIsCheckoutOpen(true)} className="w-full bg-[#34A853] hover:bg-[#2b8f45] transition-colors text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 text-lg">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
              Proceed to Checkout
            </button>
            <p className="text-center text-xs text-gray-500 mt-4">
              By placing your order, you agree to our Terms & Conditions
            </p>
          </div>
        )}

        <CheckoutModal 
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
        />

      </div>
    </>
  );
}

export default CartDrawer;