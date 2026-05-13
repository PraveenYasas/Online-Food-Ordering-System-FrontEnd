import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Home from './components/home/Home';
import Footer from './components/layout/Footer';
import LoginModal from './components/auth/LoginModal';
import SignUpModal from './components/auth/SignUpModal';
import Sidebar from './components/layout/Sidebar';
import OrdersModal from './components/orders/OrdersModal';

export default function App() {

  const [activeModal, setActiveModal] = useState<'none' | 'login' | 'signup' | 'orders'>('none');

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const openLogin = () => setActiveModal('login');
  const openSignUp = () => setActiveModal('signup');
  const closeModal = () => setActiveModal('none'); 

  const openOrders = () => {
    setIsSidebarOpen(false); 
    setActiveModal('orders');
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      
      <Navbar 
        onOpenLogin={openLogin} 
        onOpenSignUp={openSignUp} 
        onOpenSidebar={() => setIsSidebarOpen(true)}
      />
      
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      
      <Footer />

      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)}
        onOpenOrders={openOrders}
      />

      <OrdersModal 
        isOpen={activeModal === 'orders'} 
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