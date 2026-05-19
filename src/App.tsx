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
import Profile from './components/profile/Profile';
// import AdminPanel from './components/admin/AdminPanel';

function App() {

  // return <AdminPanel />;

  const [activeModal, setActiveModal] = useState<'none' | 'login' | 'signup' | 'orders' | 'favorites' | 'cart'>('none');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const openLogin = () => setActiveModal('login');
  const openSignUp = () => setActiveModal('signup');
  const closeModal = () => setActiveModal('none'); 
  const openCart = () => setActiveModal('cart');

  const openOrders = () => {
    setIsSidebarOpen(false); 
    setActiveModal('orders');
  };

  const openFavorites = () => {
    setIsSidebarOpen(false); 
    setActiveModal('favorites');
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      
      <Navbar 
        onOpenLogin={openLogin} 
        onOpenSignUp={openSignUp} 
        onOpenSidebar={() => setIsSidebarOpen(true)}
        onOpenCart={openCart}
      />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      
      <Footer />

      <CartDrawer 
        isOpen={activeModal === 'cart'} 
        onClose={closeModal} 
      />

      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)}
        onOpenOrders={openOrders}
        onOpenFavorites={openFavorites}
      />

      <OrdersModal 
        isOpen={activeModal === 'orders'} 
        onClose={closeModal} 
      />

      <FavoritesModal 
        isOpen={activeModal === 'favorites'} 
        onClose={closeModal} 
      />

      {/* Modals */}
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
      
    </div>
  );
}

export default App;