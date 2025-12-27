import React from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useCartStore } from '../stores';

const NavIcon = ({ icon, label, to }: { icon: React.ReactNode; label: string; to: string }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex flex-col items-center gap-1 transition-colors ${
          isActive ? 'text-primary' : 'text-dark'
        }`
      }
    >
      {icon}
      <span className="text-xs font-semibold">{label}</span>
    </NavLink>
  );
};

const Header: React.FC = () => {
  const cartItems = useCartStore((state) => state.items);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  
  return (
    <header className="hidden md:flex items-center justify-between py-4 px-8 border-b border-gray-100 bg-white sticky top-0 z-50">
       <div className="flex items-center gap-2">
         {/* Simple Carrot Icon SVG */}
         <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.4857 7.72895L9.62312 2.76813C9.3361 2.52554 8.90796 2.5739 8.6798 2.87274L7.54516 4.35964C8.42841 4.70678 9.20819 5.28911 9.8091 6.06899C10.4216 6.86411 10.7497 7.82823 10.75 8.82895C10.7503 9.82967 10.4227 10.7941 9.81057 11.5896L14.0722 15.1963C16.9429 17.6253 21.242 17.2711 23.6709 14.4004C26.1002 11.5298 25.746 7.23075 22.8753 4.80145C20.9328 3.15764 18.2392 2.84478 16.0336 3.9189L15.4857 7.72895Z" fill="#53B175"/>
            <path d="M0.938842 19.3248C3.0682 21.1265 6.22066 20.826 7.99427 18.6651L12.5714 13.2554C13.0645 12.6094 13.3283 11.8335 13.3281 11.0284C13.3278 10.2233 13.0637 9.44755 12.5709 8.80164C12.087 8.17387 11.4595 7.70517 10.7487 7.42588L0.279155 20.1044C0.470473 19.8805 0.692484 19.6192 0.938842 19.3248Z" fill="#F3603F"/>
        </svg>
        <span className="text-2xl font-bold text-dark">nectar</span>
       </div>

       <nav className="flex items-center gap-8">
          <NavIcon 
            to="/home" 
            label="Shop" 
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>}
          />
          <NavIcon 
            to="/explore" 
            label="Explore" 
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>}
          />
          <NavIcon 
            to="/favorites" 
            label="Favourite" 
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>}
          />
          <div className="relative">
             <NavIcon 
              to="/cart" 
              label="Cart" 
              icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
            />
            {cartCount > 0 && (
              <span className="absolute -top-1 right-2 bg-primary text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div>
          <NavIcon 
            to="/account" 
            label="Account" 
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            }
          />
       </nav>
    </header>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8 hidden md:block mt-auto">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        <div className="space-y-4">
           {/* Logo */}
           <div className="flex items-center gap-2">
             <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.4857 7.72895L9.62312 2.76813C9.3361 2.52554 8.90796 2.5739 8.6798 2.87274L7.54516 4.35964C8.42841 4.70678 9.20819 5.28911 9.8091 6.06899C10.4216 6.86411 10.7497 7.82823 10.75 8.82895C10.7503 9.82967 10.4227 10.7941 9.81057 11.5896L14.0722 15.1963C16.9429 17.6253 21.242 17.2711 23.6709 14.4004C26.1002 11.5298 25.746 7.23075 22.8753 4.80145C20.9328 3.15764 18.2392 2.84478 16.0336 3.9189L15.4857 7.72895Z" fill="#53B175"/>
                <path d="M0.938842 19.3248C3.0682 21.1265 6.22066 20.826 7.99427 18.6651L12.5714 13.2554C13.0645 12.6094 13.3283 11.8335 13.3281 11.0284C13.3278 10.2233 13.0637 9.44755 12.5709 8.80164C12.087 8.17387 11.4595 7.70517 10.7487 7.42588L0.279155 20.1044C0.470473 19.8805 0.692484 19.6192 0.938842 19.3248Z" fill="#F3603F"/>
            </svg>
            <span className="text-2xl font-bold text-dark">nectar</span>
           </div>
           <p className="text-graytext text-sm">Best groceries delivered to your doorstep.</p>
           <div className="flex gap-4 mt-4">
              {/* Social Placeholders */}
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-dark hover:bg-primary hover:text-white transition-colors cursor-pointer">
                 <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </div>
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-dark hover:bg-primary hover:text-white transition-colors cursor-pointer">
                 <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </div>
           </div>
        </div>

        <div>
           <h4 className="font-bold text-dark text-lg mb-6">Links</h4>
           <ul className="space-y-4 text-graytext text-sm">
             <li className="hover:text-primary cursor-pointer">About Us</li>
             <li className="hover:text-primary cursor-pointer">Delivery Information</li>
             <li className="hover:text-primary cursor-pointer">Privacy Policy</li>
             <li className="hover:text-primary cursor-pointer">Terms & Conditions</li>
           </ul>
        </div>

        <div>
           <h4 className="font-bold text-dark text-lg mb-6">Support</h4>
           <ul className="space-y-4 text-graytext text-sm">
             <li className="hover:text-primary cursor-pointer">Help Center</li>
             <li className="hover:text-primary cursor-pointer">Contact Us</li>
             <li className="hover:text-primary cursor-pointer">Return Policy</li>
             <li className="hover:text-primary cursor-pointer">FAQs</li>
           </ul>
        </div>

         <div>
           <h4 className="font-bold text-dark text-lg mb-6">Install App</h4>
           <p className="text-graytext text-sm mb-4">From App Store or Google Play</p>
           <div className="flex gap-2">
             <button className="bg-black text-white px-3 py-2 rounded-lg text-xs flex items-center gap-2 hover:bg-gray-800 transition-colors">
                 <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 12.5c-.2 2.6 1.9 3.5 2 3.6-.1.2-.2.6-.4.9-.3.6-.7 1.2-1.3 1.2-.6 0-.7-.3-1.4-.3-.6 0-.8.4-1.4.4-.6 0-1.1-.6-1.5-1.3-.7-1.2-1.2-3.4-.1-5.3.6-1 1.6-1.6 2.7-1.7.5 0 1 .2 1.4.4.4.2.8.4 1.3.4.6 0 1.2-.2 1.7-.5-1.9-.9-3.2-2.9-3.2-5.1 0-1.1.4-2.1 1.1-2.9 1.1-.1 2.4.6 3.1 1.6.6 1 .5 2.5 0 3.5 0 0 .1 0 .2 0zm-3.3 5.4c0-.5.4-.9.9-.9.5 0 .9.4.9.9 0 .5-.4.9-.9.9-.5 0-.9-.4-.9-.9z"/></svg>
                 App Store
             </button>
             <button className="bg-black text-white px-3 py-2 rounded-lg text-xs flex items-center gap-2 hover:bg-gray-800 transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.17L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" /></svg>
                 Google Play
             </button>
           </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 text-center text-graytext text-sm pt-8 border-t border-gray-100">
        &copy; 2024 Nectar Grocery. All rights reserved.
      </div>
    </footer>
  )
}

export const Layout: React.FC = () => {
  const location = useLocation();
  const cartItems = useCartStore((state) => state.items);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Hide Nav on specific pages for mobile if needed
  const isCheckout = location.pathname.includes('/checkout');

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-1 overflow-y-auto pb-24 md:pb-0 flex flex-col">
        <div className="max-w-7xl mx-auto w-full md:p-6 flex-1">
          <Outlet />
        </div>
        <Footer />
      </main>
      
      {/* Mobile Bottom Nav */}
      {!isCheckout && (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 py-4 px-6 flex justify-between items-center z-50 rounded-t-2xl shadow-[0_-5px_15px_rgba(0,0,0,0.05)]">
          <NavIcon 
            to="/home" 
            label="Shop" 
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>}
          />
          <NavIcon 
            to="/explore" 
            label="Explore" 
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>}
          />
          <div className="relative">
            <NavIcon 
              to="/cart" 
              label="Cart" 
              icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
            />
            {cartCount > 0 && (
              <span className="absolute -top-1 right-2 bg-primary text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div>
          <NavIcon 
            to="/favorites" 
            label="Favourite" 
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>}
          />
          <NavIcon 
            to="/account" 
            label="Account" 
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            }
          />
        </nav>
      )}
    </div>
  );
};