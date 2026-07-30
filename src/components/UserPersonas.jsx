import React, { useState } from 'react';
import { Building2, Store, Truck, CheckCircle2 } from 'lucide-react';

export function UserPersonas() {
  const [activeTab, setActiveTab] = useState('buyers');

  const personas = {
    buyers: {
      title: 'Commercial Buyers & Contractors',
      icon: Building2,
      subtitle: 'Source bulk construction & ag commodities with guaranteed delivery.',
      benefits: [
        'Single-checkout material order + freight dispatch',
        'Transparent price breakdown without broker markups',
        'Escrow protection: funds released only upon site delivery POD',
        'Live GPS progress tracking to schedule site unloading teams',
      ],
    },
    sellers: {
      title: 'Quarry & Commodity Suppliers',
      icon: Store,
      subtitle: 'Expand regional distribution without managing transport fleets.',
      benefits: [
        'Direct access to commercial buyers across regional corridors',
        'T+1 automated payout on digital Proof of Delivery',
        'Digital Seller Dashboard for live inventory & price management',
        'Zero transport liability—Ogaloader handles vehicle matching',
      ],
    },
    drivers: {
      title: 'Truck Drivers & Transporters',
      icon: Truck,
      subtitle: 'Continuous load flow and return-trip load optimization.',
      benefits: [
        'Eliminate empty return miles with origin-matched commodity loads',
        'Guaranteed freight payouts into verified mobile wallet',
        'Electronic Waybills (e-Waybills) for hassle-free checkpoint clearance',
        'Roadside assistance & emergency SOS support protocol',
      ],
    },
  };

  const currentPersona = personas[activeTab];

  return (
    <section id="for-you" className="py-20 md:py-28 bg-[#F8FAFC] relative border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF5500]/10 border border-[#FF5500]/20 text-[#FF5500] text-xs font-bold uppercase tracking-wider">
            Target User Solutions
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Tailored Value Across the Ecosystem
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Designed to bring structural efficiency and financial security to all trade participants.
          </p>
        </div>

        {/* Persona Selector Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 bg-slate-200/80 rounded-2xl border border-slate-300">
            <button
              onClick={() => setActiveTab('buyers')}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                activeTab === 'buyers'
                  ? 'bg-[#0038A8] text-white shadow-md'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              For Commercial Buyers
            </button>
            <button
              onClick={() => setActiveTab('sellers')}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                activeTab === 'sellers'
                  ? 'bg-[#0038A8] text-white shadow-md'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              For Material Suppliers
            </button>
            <button
              onClick={() => setActiveTab('drivers')}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                activeTab === 'drivers'
                  ? 'bg-[#0038A8] text-white shadow-md'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              For Transporters & Drivers
            </button>
          </div>
        </div>

        {/* Persona Details Card */}
        <div className="max-w-4xl mx-auto p-8 sm:p-10 rounded-2xl bg-white border border-slate-200 shadow-xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-b border-slate-100 pb-6 mb-6">
            <div className="p-3.5 rounded-xl bg-orange-50 border border-orange-200 text-[#FF5500]">
              <currentPersona.icon className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900">{currentPersona.title}</h3>
              <p className="text-sm text-slate-600 mt-1">{currentPersona.subtitle}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {currentPersona.benefits.map((benefit, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                <CheckCircle2 className="w-5 h-5 text-[#16A34A] flex-shrink-0 mt-0.5" />
                <span className="text-sm text-slate-800 font-medium leading-relaxed">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

export default UserPersonas;
