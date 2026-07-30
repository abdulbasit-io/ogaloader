import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, ShieldCheck, Truck, ShoppingBag, MapPin } from 'lucide-react';
import Logo from './Logo';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'glass-nav py-3 border-b border-slate-800/80 shadow-lg shadow-black/40'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#" className="flex items-center gap-3 focus:outline-none">
              <Logo variant="badge" />
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-full border border-slate-800/80 backdrop-blur-md">
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
                Commodity Marketplace
              </a>
              <a
                href="#features"
                className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white rounded-full hover:bg-slate-800/60 transition-all"
              >
                Platform Features
              </a>
              <a
                href="#for-you"
                className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white rounded-full hover:bg-slate-800/60 transition-all"
              >
                User Solutions
              </a>
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href="#waitlist"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#FF5500] hover:bg-[#E04B00] text-white text-sm font-semibold transition-all duration-200 shadow-md shadow-[#FF5500]/25 hover:shadow-lg hover:shadow-[#FF5500]/35 hover:-translate-y-0.5"
              >
                Get Early Access
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

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
        <div className="fixed inset-0 z-40 bg-black/70 backdrop-blur-md md:hidden flex justify-end">
          <div className="w-4/5 max-w-sm bg-[#0B0E14] h-full p-6 border-l border-slate-800 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <Logo variant="badge" />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 text-slate-400 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-3">
                <a
                  href="#how-it-works"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 text-slate-200 hover:bg-slate-800/60 rounded-lg text-base font-medium"
                >
                  How It Works
                </a>
                <a
                  href="#marketplace"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 text-slate-200 hover:bg-slate-800/60 rounded-lg text-base font-medium"
                >
                  Commodity Marketplace
                </a>
                <a
                  href="#features"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 text-slate-200 hover:bg-slate-800/60 rounded-lg text-base font-medium"
                >
                  Platform Features
                </a>
                <a
                  href="#for-you"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 text-slate-200 hover:bg-slate-800/60 rounded-lg text-base font-medium"
                >
                  User Solutions
                </a>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-800">
              <a
                href="#waitlist"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#FF5500] hover:bg-[#E04B00] text-white text-base font-semibold shadow-md"
              >
                Get Early Access
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
