import { useState } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'; // Navigate අලුතින් ගත්තා

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

  const navigate = useNavigate();

  // 1. In localStorage, check the user's role to determine if they are an Admin, Restaurant Owner, or a regular Customer
  const role = localStorage.getItem('role');

  // 2. Determine if the customer layout should be shown based on their role
  const showCustomerLayout = role !== 'ADMIN' && role !== 'RESTAURANT_OWNER';

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
        
        {/* Only show Navbar for Customers, not for Admin or Shop Owner */}
        {showCustomerLayout && (
          <Navbar 
            onOpenLogin={openLogin} 
            onOpenSignUp={openSignUp} 
            onOpenSidebar={() => setIsSidebarOpen(true)}
            onOpenCart={openCart}
            onOpenLocation={openLocation}
          />
        )}
        
        <Routes>
          {/* Re direct to the appropriate page based on the user's role */}
          <Route path="/" element={
            role === 'ADMIN' ? <Navigate to="/admin" replace /> :
            role === 'RESTAURANT_OWNER' ? <Navigate to="/shop-admin" replace /> :
            <Home />
          } />

          {/* protect the Profile Page based on the user's role */}
          <Route path="/profile" element={
            role === 'ADMIN' ? <Navigate to="/admin" replace /> :
            role === 'RESTAURANT_OWNER' ? <Navigate to="/shop-admin" replace /> :
            <Profile />
          } />

          {/* Admin Panel can be accessed by Admins only */}
          <Route path="/admin" element={
            role === 'ADMIN' ? <AdminPanel /> : <Navigate to="/" replace />
          } />

          {/* Shop Panel can be accessed by Restaurant Owners only */}
          <Route path="/shop-admin" element={
            role === 'RESTAURANT_OWNER' ? <ShopPanel /> : <Navigate to="/" replace />
          } />
        </Routes>
        
        {/* only show Footer for Customers, not for Admin or Shop Owner */}
        {showCustomerLayout && <Footer />}

        {/* can't see the Cart Drawer for Admin or Shop Owner */}
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
          onOpenAdminPanel={() => {
            setIsSidebarOpen(false);
            navigate('/admin');      
          }} 
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