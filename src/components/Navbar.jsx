import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, ArrowLeft, ShoppingBag, Truck, CreditCard, ShieldCheck, Zap, Package, MessageSquare, Layers, User, Building2 } from 'lucide-react';
import Logo from './Logo';
import { useApp } from '../context/AppContext';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentView, navigateTo, userRole, switchRole, setProfileModalOpen } = useApp();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLaunchApp = () => {
    switchRole('buyer');
    navigateTo('marketplace');
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#0B0E14]/95 py-3 border-b border-slate-800 shadow-xl backdrop-blur-md'
            : 'bg-[#0B0E14]/90 py-4 border-b border-slate-800/50 backdrop-blur-md'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            
            {/* Brand Logo & Icon-Only Back Link */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigateTo('landing')}
                className="flex items-center gap-3 focus:outline-none text-left"
              >
                <Logo variant="badge" />
              </button>

              {currentView !== 'landing' && (
                <div className="group relative hidden lg:flex items-center">
                  <button
                    onClick={() => navigateTo('landing')}
                    className="p-2.5 rounded-full bg-slate-800/90 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/80 transition-all shadow-sm"
                    aria-label="Back to Website"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>

                  {/* Clean Tooltip without Emojis */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2.5 px-3 py-1 bg-[#0B0E14] text-white text-xs font-extrabold rounded-xl border border-slate-700 shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap z-50">
                    Back to Website
                  </div>
                </div>
              )}
            </div>

            {/* ------------------------------------------------------------- */}
            {/* CASE 1: LANDING PAGE NAVIGATION                                */}
            {/* ------------------------------------------------------------- */}
            {currentView === 'landing' ? (
              <>
                <div className="hidden md:flex items-center gap-1 bg-slate-900/80 p-1.5 rounded-full border border-slate-800/80 backdrop-blur-md">
                  <a
                    href="#how-it-works"
                    className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white rounded-full hover:bg-slate-800/60 transition-all"
                  >
                    How It Works
                  </a>
                  <a
                    href="#marketplace"
                    className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white rounded-full hover:bg-slate-800/60 transition-all"
                  >
                    Marketplace
                  </a>
                  <a
                    href="#features"
                    className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white rounded-full hover:bg-slate-800/60 transition-all"
                  >
                    Why Ogaloader
                  </a>
                  <a
                    href="#for-you"
                    className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white rounded-full hover:bg-slate-800/60 transition-all"
                  >
                    For You
                  </a>
                </div>

                {/* Desktop CTA: Launch App Button */}
                <div className="hidden md:flex items-center gap-3">
                  <button
                    onClick={handleLaunchApp}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#FF5500] hover:bg-[#E04B00] text-white text-sm font-semibold transition-all duration-200 shadow-md shadow-[#FF5500]/25 hover:shadow-lg hover:shadow-[#FF5500]/35 hover:-translate-y-0.5"
                  >
                    Launch App
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </>
            ) : (
              /* ------------------------------------------------------------- */
              /* CASE 2: MAIN PRODUCT SUITE NAVIGATION (Simple Icon Tooltips)   */
              /* ------------------------------------------------------------- */
              <>
                {/* Center Tabs by Role */}
                <div className="hidden lg:flex items-center gap-1.5 bg-slate-900/90 p-1.5 rounded-full border border-slate-800 backdrop-blur-md">
                  
                  {/* BUYER NAVIGATION */}
                  {userRole === 'buyer' && (
                    <>
                      {/* Buy Goods Tab */}
                      <div className="group relative flex items-center">
                        <button
                          onClick={() => navigateTo('marketplace')}
                          className={`p-2.5 rounded-full transition-all ${
                            currentView === 'marketplace'
                              ? 'bg-[#0038A8] text-white shadow-md ring-2 ring-blue-400/30'
                              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                          }`}
                          aria-label="Buy Goods"
                        >
                          <ShoppingBag className="w-4 h-4" />
                        </button>
                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2.5 px-3 py-1 bg-[#0B0E14] text-white text-xs font-extrabold rounded-xl border border-slate-700 shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap z-50">
                          Buy Goods
                        </div>
                      </div>

                      {/* Find Trucks Tab */}
                      <div className="group relative flex items-center">
                        <button
                          onClick={() => navigateTo('logistics')}
                          className={`p-2.5 rounded-full transition-all ${
                            currentView === 'logistics'
                              ? 'bg-[#0038A8] text-white shadow-md ring-2 ring-blue-400/30'
                              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                          }`}
                          aria-label="Find Trucks"
                        >
                          <Truck className="w-4 h-4" />
                        </button>
                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2.5 px-3 py-1 bg-[#0B0E14] text-white text-xs font-extrabold rounded-xl border border-slate-700 shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap z-50">
                          Find Trucks
                        </div>
                      </div>

                      {/* Safe Payments Tab */}
                      <div className="group relative flex items-center">
                        <button
                          onClick={() => navigateTo('transactions')}
                          className={`p-2.5 rounded-full transition-all ${
                            currentView === 'transactions'
                              ? 'bg-[#0038A8] text-white shadow-md ring-2 ring-blue-400/30'
                              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                          }`}
                          aria-label="Safe Payments"
                        >
                          <CreditCard className="w-4 h-4" />
                        </button>
                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2.5 px-3 py-1 bg-[#0B0E14] text-white text-xs font-extrabold rounded-xl border border-slate-700 shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap z-50">
                          Safe Payments
                        </div>
                      </div>
                    </>
                  )}

                  {/* SELLER NAVIGATION */}
                  {userRole === 'seller' && (
                    <>
                      <div className="group relative flex items-center">
                        <button
                          onClick={() => navigateTo('marketplace')}
                          className={`p-2.5 rounded-full transition-all ${
                            currentView === 'marketplace'
                              ? 'bg-amber-600 text-white shadow-md ring-2 ring-amber-400/30'
                              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                          }`}
                          aria-label="Seller Sales & Goods"
                        >
                          <Package className="w-4 h-4" />
                        </button>
                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2.5 px-3 py-1 bg-[#0B0E14] text-white text-xs font-extrabold rounded-xl border border-slate-700 shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap z-50">
                          Seller Sales & Goods
                        </div>
                      </div>

                      <div className="group relative flex items-center">
                        <button
                          onClick={() => navigateTo('transactions')}
                          className={`p-2.5 rounded-full transition-all ${
                            currentView === 'transactions'
                              ? 'bg-amber-600 text-white shadow-md ring-2 ring-amber-400/30'
                              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                          }`}
                          aria-label="Sales Payments & Payouts"
                        >
                          <CreditCard className="w-4 h-4" />
                        </button>
                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2.5 px-3 py-1 bg-[#0B0E14] text-white text-xs font-extrabold rounded-xl border border-slate-700 shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap z-50">
                          Sales Payments & Payouts
                        </div>
                      </div>
                    </>
                  )}

                  {/* TRUCKER NAVIGATION */}
                  {userRole === 'trucker' && (
                    <>
                      <div className="group relative flex items-center">
                        <button
                          onClick={() => navigateTo('logistics')}
                          className={`p-2.5 rounded-full transition-all ${
                            currentView === 'logistics'
                              ? 'bg-emerald-600 text-white shadow-md ring-2 ring-emerald-400/30'
                              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                          }`}
                          aria-label="Driver Trips & Earnings"
                        >
                          <Truck className="w-4 h-4" />
                        </button>
                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2.5 px-3 py-1 bg-[#0B0E14] text-white text-xs font-extrabold rounded-xl border border-slate-700 shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap z-50">
                          Driver Trips & Earnings
                        </div>
                      </div>

                      <div className="group relative flex items-center">
                        <button
                          onClick={() => navigateTo('transactions')}
                          className={`p-2.5 rounded-full transition-all ${
                            currentView === 'transactions'
                              ? 'bg-emerald-600 text-white shadow-md ring-2 ring-emerald-400/30'
                              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                          }`}
                          aria-label="Freight Earnings & Wallet"
                        >
                          <CreditCard className="w-4 h-4" />
                        </button>
                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2.5 px-3 py-1 bg-[#0B0E14] text-white text-xs font-extrabold rounded-xl border border-slate-700 shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap z-50">
                          Freight Earnings & Wallet
                        </div>
                      </div>
                    </>
                  )}

                </div>

                {/* Right Side Mode Switcher & Profile Buttons */}
                <div className="hidden md:flex items-center gap-2.5">
                  
                  {/* Mode Switcher Toolbar */}
                  <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 p-1.5 rounded-full">
                    
                    {/* Buyer Mode Button */}
                    <div className="group relative flex items-center">
                      <button
                        onClick={() => switchRole('buyer')}
                        className={`p-2 rounded-full text-xs font-bold transition-all ${
                          userRole === 'buyer'
                            ? 'bg-blue-600 text-white border border-blue-500/40 shadow-sm ring-2 ring-blue-500/20'
                            : 'text-slate-400 hover:text-white'
                        }`}
                        aria-label="Buyer View"
                      >
                        <ShoppingBag className="w-4 h-4" />
                      </button>
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2.5 px-3 py-1 bg-[#0B0E14] text-white text-xs font-extrabold rounded-xl border border-slate-700 shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap z-50">
                        Buyer View
                      </div>
                    </div>

                    {/* Seller Mode Button */}
                    <div className="group relative flex items-center">
                      <button
                        onClick={() => switchRole('seller')}
                        className={`p-2 rounded-full text-xs font-bold transition-all ${
                          userRole === 'seller'
                            ? 'bg-amber-600 text-white border border-amber-500/40 shadow-sm ring-2 ring-amber-500/20'
                            : 'text-slate-400 hover:text-white'
                        }`}
                        aria-label="Seller View"
                      >
                        <Building2 className="w-4 h-4" />
                      </button>
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2.5 px-3 py-1 bg-[#0B0E14] text-white text-xs font-extrabold rounded-xl border border-slate-700 shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap z-50">
                        Seller View
                      </div>
                    </div>

                    {/* Trucker Mode Button */}
                    <div className="group relative flex items-center">
                      <button
                        onClick={() => switchRole('trucker')}
                        className={`p-2 rounded-full text-xs font-bold transition-all ${
                          userRole === 'trucker'
                            ? 'bg-emerald-600 text-white border border-emerald-500/40 shadow-sm ring-2 ring-emerald-500/20'
                            : 'text-slate-400 hover:text-white'
                        }`}
                        aria-label="Trucker View"
                      >
                        <Truck className="w-4 h-4" />
                      </button>
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2.5 px-3 py-1 bg-[#0B0E14] text-white text-xs font-extrabold rounded-xl border border-slate-700 shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap z-50">
                        Trucker View
                      </div>
                    </div>
                  </div>

                  {/* My Profile Button */}
                  <div className="group relative flex items-center">
                    <button
                      onClick={() => setProfileModalOpen(true)}
                      className="p-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-bold border border-slate-700 transition-all shadow-sm"
                      aria-label="My Profile"
                    >
                      <User className="w-4 h-4" />
                    </button>
                    <div className="absolute top-full right-0 mt-2.5 px-3 py-1 bg-[#0B0E14] text-white text-xs font-extrabold rounded-xl border border-slate-700 shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap z-50">
                      My Profile
                    </div>
                  </div>

                </div>
              </>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-slate-800/80 text-slate-300 hover:text-white border border-slate-700/60"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-16 z-30 bg-[#0B0E14]/98 backdrop-blur-xl md:hidden border-b border-slate-800 p-6 flex flex-col justify-between">
          <div className="space-y-4">
            {currentView === 'landing' ? (
              <>
                <a
                  href="#how-it-works"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2.5 text-base font-semibold text-slate-200 border-b border-slate-800/80"
                >
                  How It Works
                </a>
                <a
                  href="#marketplace"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2.5 text-base font-semibold text-slate-200 border-b border-slate-800/80"
                >
                  Marketplace
                </a>
                <a
                  href="#features"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2.5 text-base font-semibold text-slate-200 border-b border-slate-800/80"
                >
                  Why Ogaloader
                </a>
                <a
                  href="#for-you"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2.5 text-base font-semibold text-slate-200 border-b border-slate-800/80"
                >
                  For You
                </a>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleLaunchApp();
                  }}
                  className="w-full py-3.5 rounded-xl bg-[#FF5500] text-white text-base font-bold flex items-center justify-center gap-2 shadow-lg mt-4"
                >
                  <span>Launch App</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigateTo('landing');
                  }}
                  className="w-full py-3 text-left font-bold text-slate-300 flex items-center gap-2 border-b border-slate-800"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Website
                </button>

                {userRole === 'buyer' && (
                  <>
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        navigateTo('marketplace');
                      }}
                      className="w-full py-3 text-left font-bold text-white flex items-center gap-2 border-b border-slate-800"
                    >
                      <ShoppingBag className="w-5 h-5 text-blue-400" />
                      Buy Goods
                    </button>
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        navigateTo('logistics');
                      }}
                      className="w-full py-3 text-left font-bold text-white flex items-center gap-2 border-b border-slate-800"
                    >
                      <Truck className="w-5 h-5 text-orange-400" />
                      Find Trucks
                    </button>
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        navigateTo('transactions');
                      }}
                      className="w-full py-3 text-left font-bold text-white flex items-center gap-2 border-b border-slate-800"
                    >
                      <CreditCard className="w-5 h-5 text-emerald-400" />
                      Safe Payments
                    </button>
                  </>
                )}

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setProfileModalOpen(true);
                  }}
                  className="w-full py-3 text-left font-bold text-white flex items-center gap-2 border-b border-slate-800"
                >
                  <User className="w-5 h-5 text-purple-400" />
                  My Profile
                </button>

                <div className="pt-4 space-y-2">
                  <div className="text-xs font-bold text-slate-400 uppercase">Switch View:</div>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => {
                        switchRole('buyer');
                        setMobileMenuOpen(false);
                      }}
                      className="py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs text-center"
                    >
                      Buyer
                    </button>
                    <button
                      onClick={() => {
                        switchRole('seller');
                        setMobileMenuOpen(false);
                      }}
                      className="py-2.5 rounded-xl bg-amber-600 text-white font-bold text-xs text-center"
                    >
                      Seller
                    </button>
                    <button
                      onClick={() => {
                        switchRole('trucker');
                        setMobileMenuOpen(false);
                      }}
                      className="py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs text-center"
                    >
                      Trucker
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
