import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Splash, Onboarding, Login, Signup, OTP, LocationSelection } from './pages/AuthPages';
import { Home, Explore, CategoryDetail, ProductDetails, Favorites } from './pages/MainPages';
import { Cart, OrderSuccess, OrderFailed } from './pages/CheckoutPages';
import { useUIStore } from './stores';
import { Spinner } from './components/Components';

// Global styles for animations
const GlobalStyles = () => (
  <style>{`
    @keyframes slideUp {
      from { transform: translateY(100%); }
      to { transform: translateY(0); }
    }
    .animate-slide-up {
      animation: slideUp 0.3s ease-out forwards;
    }
    @keyframes slideLeft {
      from { transform: translateX(100%); }
      to { transform: translateX(0); }
    }
    .animate-slide-left {
      animation: slideLeft 0.3s ease-out forwards;
    }
  `}</style>
);

const LoadingOverlay: React.FC = () => {
  const isLoading = useUIStore((state) => state.isLoading);
  
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-black/30 z-[100] flex items-center justify-center backdrop-blur-sm">
      <div className="bg-white p-6 rounded-2xl shadow-xl flex flex-col items-center gap-4">
        <Spinner size="lg" color="primary" />
        <span className="text-dark font-semibold">Loading...</span>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <>
      <GlobalStyles />
      <LoadingOverlay />
      <HashRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Splash />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/otp" element={<OTP />} />
          <Route path="/location" element={<LocationSelection />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/order-failed" element={<OrderFailed />} />

          {/* Protected App Routes */}
          <Route element={<Layout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/category/:categoryId" element={<CategoryDetail />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/cart" element={<Cart />} />
            {/* Account placeholder */}
            <Route path="/account" element={<div className="p-8 text-center">Account Settings</div>} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
    </>
  );
};

export default App;