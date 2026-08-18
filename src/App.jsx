import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustBar from './components/TrustBar';
import ProblemSolution from './components/ProblemSolution';
import HowItWorks from './components/HowItWorks';
import MarketplacePreview from './components/MarketplacePreview';
import Features from './components/Features';
import UserPersonas from './components/UserPersonas';
import WaitlistCTA from './components/WaitlistCTA';
import Footer from './components/Footer';

// New Product Suite Components
import CommodityMarketplace from './components/CommodityMarketplace';
import ProductDetailModal from './components/ProductDetailModal';
import NegotiationModal from './components/NegotiationModal';
import LogisticsView from './components/LogisticsView';
import EscrowView from './components/EscrowView';
import SellerYardView from './components/SellerYardView';
import TruckerDispatchView from './components/TruckerDispatchView';
import UserProfileModal from './components/UserProfileModal';

function AppContent() {
  const { currentView, userRole, selectedProduct, setSelectedProduct, profileModalOpen, setProfileModalOpen } = useApp();
  const [activeModal, setActiveModal] = useState(null); // null | 'product_detail' | 'negotiation'

  const handleOpenProductDetail = (product) => {
    setSelectedProduct(product);
    setActiveModal('product_detail');
  };

  const handleOpenNegotiation = (product) => {
    setSelectedProduct(product);
    setActiveModal('negotiation');
  };

  const handleCloseModal = () => {
    setActiveModal(null);
  };

  return (
    <div className="min-h-screen bg-[#0B0E14] text-slate-100 selection:bg-[#FF5500] selection:text-white">
      <Navbar />

      <main>
        {/* Dynamic Route Switching */}
        {currentView === 'landing' && (
          <>
            <Hero />
            <TrustBar />
            <ProblemSolution />
            <HowItWorks />
            <MarketplacePreview />
            <Features />
            <UserPersonas />
            <WaitlistCTA />
          </>
        )}

        {/* Commodity Marketplace Homepage */}
        {currentView === 'marketplace' && userRole === 'buyer' && (
          <CommodityMarketplace
            onOpenProductDetail={handleOpenProductDetail}
            onOpenNegotiation={handleOpenNegotiation}
          />
        )}

        {/* Logistics & Freight Matcher */}
        {currentView === 'logistics' && userRole === 'buyer' && (
          <LogisticsView onOpenNegotiation={handleOpenNegotiation} />
        )}

        {/* Escrow & Transactions Center */}
        {currentView === 'transactions' && userRole === 'buyer' && (
          <EscrowView />
        )}

        {/* Seller Role Portal Override */}
        {userRole === 'seller' && currentView !== 'landing' && (
          <SellerYardView />
        )}

        {/* Trucker Role Portal Override */}
        {userRole === 'trucker' && currentView !== 'landing' && (
          <TruckerDispatchView />
        )}
      </main>

      <Footer />

      {/* Global Modals */}
      {activeModal === 'product_detail' && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={handleCloseModal}
          onOpenNegotiation={handleOpenNegotiation}
        />
      )}

      {activeModal === 'negotiation' && (
        <NegotiationModal
          product={selectedProduct}
          onClose={handleCloseModal}
        />
      )}

      {profileModalOpen && (
        <UserProfileModal onClose={() => setProfileModalOpen(false)} />
      )}
    </div>
  );
}

export function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
