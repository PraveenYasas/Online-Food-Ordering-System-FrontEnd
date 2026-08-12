import { useState } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';

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
import ShopPanel from './components/shop/ShopPanel';

function App() {
  const [activeModal, setActiveModal] = useState<'none' | 'login' | 'signup' | 'orders' | 'favorites' | 'cart' | 'location'>('none');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState("Bandaragama, Western Province, Sri Lanka");
  
  const [searchQuery, setSearchQuery] = useState('');

  const navigate = useNavigate();

  const role = localStorage.getItem('role') || '';
  const isAdmin = role === 'ADMIN' || role === 'ROLE_ADMIN';
  const isShopOwner = role === 'RESTURANT_OWNER' || role === 'ROLE_RESTURANT_OWNER';
  
  const currentUserId = Number(localStorage.getItem('userId')) || 0;
  const showCustomerLayout = !isAdmin && !isShopOwner;

  const openLogin = () => setActiveModal('login');
  const openSignUp = () => setActiveModal('signup');
  const closeModal = () => setActiveModal('none'); 
  const openCart = () => setActiveModal('cart');
  const openLocation = () => setActiveModal('location');

  const openOrders = () => { setIsSidebarOpen(false); setActiveModal('orders'); };
  const openFavorites = () => { setIsSidebarOpen(false); setActiveModal('favorites'); };

  return (
    <CartProvider>
      <div className="min-h-screen bg-white font-sans">
        
        {showCustomerLayout && (
          <Navbar 
            onOpenLogin={openLogin} 
            onOpenSignUp={openSignUp} 
            onOpenSidebar={() => setIsSidebarOpen(true)}
            onOpenCart={openCart}
            onOpenLocation={openLocation}
            onSearch={setSearchQuery} 
            currentAddress={deliveryAddress}
          />
        )}
        
        <Routes>
          <Route path="/" element={
            isAdmin ? <Navigate to="/admin" replace /> :
            isShopOwner ? <Navigate to="/shop-admin" replace /> :
            <Home searchQuery={searchQuery} /> 
          } />

          <Route path="/profile" element={isAdmin ? <Navigate to="/admin" replace /> : isShopOwner ? <Navigate to="/shop-admin" replace /> : <Profile />} />
          <Route path="/admin" element={isAdmin ? <AdminPanel /> : <Navigate to="/" replace />} />
          <Route path="/shop-admin" element={isShopOwner ? <ShopPanel /> : <Navigate to="/" replace />} />
        </Routes>
        
        {showCustomerLayout && <Footer />}

        <CartDrawer isOpen={activeModal === 'cart'} onClose={closeModal} currentAddress={deliveryAddress} onAddressChange={setDeliveryAddress} />
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} onOpenOrders={openOrders} onOpenFavorites={openFavorites} onOpenAdminPanel={() => { setIsSidebarOpen(false); navigate('/admin'); }} />
        <OrdersModal isOpen={activeModal === 'orders'} onClose={closeModal} />
        <FavoritesModal isOpen={activeModal === 'favorites'} onClose={closeModal} userId={currentUserId} />
        <LoginModal isOpen={activeModal === 'login'} onClose={closeModal} onSwitchToSignUp={openSignUp} />
        <SignUpModal isOpen={activeModal === 'signup'} onClose={closeModal} onSwitchToLogin={openLogin} />
        
        {/* @ts-ignore */}
        <LocationModal isOpen={activeModal === 'location'} onClose={closeModal} onSelectAddress={(address: string) => setDeliveryAddress(address)} />
        
      </div>
    </CartProvider>
  );
}

export default App;