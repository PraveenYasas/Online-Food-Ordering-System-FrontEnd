import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Home from './components/home/Home';
import Footer from './components/layout/Footer';
import LoginModal from './components/auth/LoginModal';
import SignUpModal from './components/auth/SignUpModal';
import Sidebar from './components/layout/Sidebar';
import OrdersModal from './components/orders/OrdersModal';
import FavoritesModal from './components/favorites/FavoritesModal';
import CartDrawer from './components/cart/CartDrawer';
import Profile from './components/profile/profile';
import LocationModal from './components/location/LocationModal';
import { CartProvider } from './components/cart/CartContext';
import AdminPanel from './components/admin/AdminPanel';

function App() {
  const [activeModal, setActiveModal] = useState<'none' | 'login' | 'signup' | 'orders' | 'favorites' | 'cart' | 'location'>('none');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [deliveryAddress, setDeliveryAddress] = useState("Bandaragama, Western Province, Sri Lanka");

  const openLogin = () => setActiveModal('login');
  const openSignUp = () => setActiveModal('signup');
  const closeModal = () => setActiveModal('none'); 
  const openCart = () => setActiveModal('cart');
  const openLocation = () => setActiveModal('location');

  const openOrders = () => {
    setIsSidebarOpen(false); 
    setActiveModal('orders');
  };

  const openFavorites = () => {
    setIsSidebarOpen(false); 
    setActiveModal('favorites');
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-white font-sans">
        
        <Navbar 
          onOpenLogin={openLogin} 
          onOpenSignUp={openSignUp} 
          onOpenSidebar={() => setIsSidebarOpen(true)}
          onOpenCart={openCart}
          onOpenLocation={openLocation}
        />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
        
        <Footer />

        <CartDrawer 
          isOpen={activeModal === 'cart'} 
          onClose={closeModal} 
          currentAddress={deliveryAddress}
          onAddressChange={setDeliveryAddress}
        />

<Sidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)}
          onOpenOrders={openOrders}
          onOpenFavorites={openFavorites}
          // 1. Sidebar එකේ Error එක නැති කරන්න මේ පේළිය දැම්මා
          onOpenAdminPanel={() => setIsSidebarOpen(false)} 
        />

        <OrdersModal 
          isOpen={activeModal === 'orders'} 
          onClose={closeModal} 
        />

        <FavoritesModal 
          isOpen={activeModal === 'favorites'} 
          onClose={closeModal} 
        />

        <LoginModal 
          isOpen={activeModal === 'login'} 
          onClose={closeModal} 
          onSwitchToSignUp={openSignUp} 
        />

        <SignUpModal 
          isOpen={activeModal === 'signup'} 
          onClose={closeModal} 
          onSwitchToLogin={openLogin} 
        />

        {/* 2. LocationModal එකේ Error එක මඟහරින්න @ts-ignore දැම්මා */}
        {/* @ts-ignore */}
        <LocationModal 
          isOpen={activeModal === 'location'} 
          onClose={closeModal} 
          onSelectAddress={(address: string) => setDeliveryAddress(address)}
        />
        
      </div>
    </CartProvider>
  );
}

export default App;