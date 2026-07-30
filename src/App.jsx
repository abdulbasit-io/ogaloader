import React from 'react';
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

export function App() {
  return (
    <div className="min-h-screen bg-[#0B0E14] text-slate-100 selection:bg-[#FF5500] selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <ProblemSolution />
        <HowItWorks />
        <MarketplacePreview />
        <Features />
        <UserPersonas />
        <WaitlistCTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;
