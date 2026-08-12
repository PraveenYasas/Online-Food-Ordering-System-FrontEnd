import { useState } from 'react';
import CheckoutModal from './CheckoutModal';
import { useCart } from './CartContext'; 

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentAddress: string;
  onAddressChange: (address: string) => void;
}

function CartDrawer({ isOpen, onClose, currentAddress, onAddressChange }: CartDrawerProps) {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [tempAddress, setTempAddress] = useState("");

  const { cartItems, cartTotal, removeFromCart, decreaseQuantity, addToCart, orderType } = useCart();

  const isEmpty = cartItems.length === 0;
  const currentRestaurantName = cartItems.length > 0 ? cartItems[0].restaurantName : "Unknown";

  const serviceFee = orderType === 'delivery' ? 2.50 : 0.00; 
  const tax = cartTotal * 0.08; 
  const promoDiscount = 5.00;
  const finalTotal = cartTotal > 0 ? (cartTotal + serviceFee + tax - promoDiscount) : 0;

  const handleEditClick = () => {
    setTempAddress(currentAddress);
    setIsEditingAddress(true);
  };

  const handleSaveAddress = () => {
    onAddressChange(tempAddress); 
    setIsEditingAddress(false);
  };

  return (
    <>
      <div 
        className={`fixed inset-0 z-150 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={onClose}
      />

      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-100 md:w-112.5 bg-white z-160 transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        
        {/* Header */}
        <div className="bg-[#34A853] p-6 text-white relative shrink-0">
          <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          <h2 className="text-2xl font-bold tracking-tight">Your Cart</h2>
          <p className="text-white/90 text-sm mt-1">{isEmpty ? '0 items' : `${cartItems.length} item(s)`} • {currentRestaurantName}</p>
          {!isEmpty && (
            <div className="mt-4 bg-white/20 rounded-lg p-3 flex items-center gap-2 text-sm font-medium">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> 
              {orderType === 'delivery' ? 'Delivery in 25-35 min' : 'Ready for Pickup in 15-20 min'} {/* 🔥 */}
            </div>
          )}
        </div>

        {/* Body Area */}
        <div className="flex-1 overflow-y-auto no-scrollbar flex flex-col">
          {isEmpty ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center h-full">
              <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h3>
              <p className="text-gray-500 mb-8 text-[15px]">Add some delicious items to get started!</p>
              <button onClick={onClose} className="bg-[#34A853] hover:bg-[#2b8f45] transition-colors text-white font-bold py-3 px-8 rounded-full">Browse Menu</button>
            </div>
          ) : (
            <div className="p-6 flex flex-col gap-6">
              
              {/* Delivery Address Box - Hide if Pickup */}
              {orderType === 'delivery' ? (
                <div className="border border-gray-200 rounded-xl p-4 flex gap-4">
                  <div className="w-10 h-10 bg-[#e6f4ea] rounded-full flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-[#137333]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900">Delivery Address</h4>
                    
                    {isEditingAddress ? (
                      <div className="mt-2 flex flex-col gap-2">
                        <input 
                          type="text" 
                          value={tempAddress}
                          onChange={(e) => setTempAddress(e.target.value)}
                          className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-[#34A853]"
                          autoFocus
                        />
                        <div className="flex gap-2">
                          <button onClick={handleSaveAddress} className="bg-[#34A853] text-white px-3 py-1 rounded text-xs font-bold transition-colors hover:bg-[#2b8f45]">Save</button>
                          <button onClick={() => setIsEditingAddress(false)} className="bg-gray-200 text-gray-700 px-3 py-1 rounded text-xs font-bold transition-colors hover:bg-gray-300">Cancel</button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <p className="text-sm text-gray-600 mt-0.5">{currentAddress}</p>
                        <button onClick={handleEditClick} className="text-[#34A853] font-semibold text-sm mt-1 hover:underline">Change</button>
                      </>
                    )}
                  </div>
                </div>
              ) : (
                <div className="border border-[#34A853]/30 bg-[#e6f4ea]/50 rounded-xl p-4 flex gap-4">
                  <div className="w-10 h-10 bg-[#e6f4ea] rounded-full flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-[#137333]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-[#137333]">Store Pickup</h4>
                    <p className="text-sm text-gray-600 mt-0.5">Collect your order at {currentRestaurantName}</p>
                  </div>
                </div>
              )}

              {/* Order Items Header */}
              <h4 className="font-bold text-lg flex items-center gap-2 text-gray-900 mt-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg> Order Items
              </h4>

              <div className="flex flex-col gap-4 mb-2">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center bg-gray-50 p-3 rounded-xl border border-gray-100">
                    <div className="flex flex-col gap-1">
                      <p className="font-bold text-gray-900">{item.name}</p>
                      <p className="font-medium text-gray-500 text-sm">LKR {item.price.toFixed(2)}</p>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="flex items-center bg-white border border-gray-200 rounded-lg shadow-sm">
                        <button onClick={() => decreaseQuantity(item.id)} className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 hover:text-black transition-colors rounded-l-lg"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg></button>
                        <span className="w-8 text-center font-bold text-gray-900 text-sm">{item.quantity}</span>
                        <button onClick={() => addToCart(item)} className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 hover:text-black transition-colors rounded-r-lg"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg></button>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="w-8 h-8 flex items-center justify-center text-red-400 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                    </div>
                  </div>
                ))}
              </div>
              
              <hr className="border-gray-100" />

              {/* Dynamic Receipt Breakdown */}
              <div className="flex flex-col gap-3">
                <div className="flex justify-between text-[15px] text-gray-600"><span>Subtotal</span><span className="font-semibold text-gray-900">LKR {cartTotal.toFixed(2)}</span></div>
                {orderType === 'delivery' && <div className="flex justify-between text-[15px] text-gray-600"><span>Delivery Fee</span><span className="font-semibold text-[#34A853]">FREE</span></div>}
                <div className="flex justify-between text-[15px] text-gray-600"><span>Service Fee</span><span className="font-semibold text-gray-900">LKR {serviceFee.toFixed(2)}</span></div>
                <div className="flex justify-between text-[15px] text-gray-600"><span>Tax (8%)</span><span className="font-semibold text-gray-900">LKR {tax.toFixed(2)}</span></div>
                <div className="flex justify-between text-[15px] text-[#34A853] font-medium"><span>Promo Discount</span><span>-LKR {promoDiscount.toFixed(2)}</span></div>
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
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 012-2h2a2 2 0 012 2" /></svg>
              Proceed to Checkout
            </button>
            <p className="text-center text-xs text-gray-500 mt-4">By placing your order, you agree to our Terms & Conditions</p>
          </div>
        )}

        <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />

      </div>
    </>
  );
}

export default CartDrawer;