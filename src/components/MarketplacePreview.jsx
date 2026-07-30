import React, { useState } from 'react';
import { Calculator, ArrowRight, ShieldCheck, Info } from 'lucide-react';

export function MarketplacePreview() {
  const [selectedCommodity, setSelectedCommodity] = useState('cement');
  const [tonnage, setTonnage] = useState(30);
  const [route, setRoute] = useState('lagos-ibadan');

  const commodities = [
    { id: 'cement', name: 'Portland Cement (50kg bags)', unitPrice: 82000, perTonBags: 20, unitLabel: 'ton' },
    { id: 'granite', name: '3/4 Quarry Granite', unitPrice: 18500, perTonBags: 1, unitLabel: 'ton' },
    { id: 'sand', name: 'Sharp Clean River Sand', unitPrice: 14000, perTonBags: 1, unitLabel: 'ton' },
    { id: 'maize', name: 'Yellow Maize Bulk', unitPrice: 480000, perTonBags: 1, unitLabel: 'ton' },
  ];

  const routes = [
    { id: 'lagos-ibadan', name: 'Lagos Corridor → Ibadan Yard (130 km)', freightPerTon: 12500, estHours: '3.5 hrs' },
    { id: 'lagos-ogun', name: 'Apapa Port → Sagamu Interchange (65 km)', freightPerTon: 8500, estHours: '2.0 hrs' },
    { id: 'lagos-kano', name: 'Lagos Coast → Kano Commercial Hub (980 km)', freightPerTon: 52000, estHours: '24 hrs' },
  ];

  const currentCommodityObj = commodities.find(c => c.id === selectedCommodity) || commodities[0];
  const currentRouteObj = routes.find(r => r.id === route) || routes[0];

  const productCost = currentCommodityObj.unitPrice * tonnage;
  const freightCost = currentRouteObj.freightPerTon * tonnage;
  const gitInsurance = Math.round(productCost * 0.005); // 0.5% GIT Insurance
  const totalEscrow = productCost + freightCost + gitInsurance;

  return (
    <section id="marketplace" className="py-20 md:py-28 bg-[#F8FAFC] relative border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF5500]/10 border border-[#FF5500]/20 text-[#FF5500] text-xs font-bold uppercase tracking-wider">
            Bulk Commodity Exchange
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Live Commodity & Freight Calculation
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Select material specifications and corridor destination for an instant transparent freight breakdown.
          </p>
        </div>

        {/* Interactive Calculator & Catalog Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Commodity Selector Controls */}
          <div className="lg:col-span-6 p-8 rounded-2xl bg-white border border-slate-200 shadow-xl space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              
              <div className="flex items-center gap-2 text-[#FF5500] text-sm font-bold uppercase tracking-wider">
                <Calculator className="w-5 h-5" />
                Commodity & Dispatch Simulator
              </div>

              {/* 1. Commodity Selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Select Bulk Material Grade
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {commodities.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setSelectedCommodity(item.id)}
                      className={`p-3.5 rounded-xl text-left border text-xs font-bold transition-all ${
                        selectedCommodity === item.id
                          ? 'bg-[#0038A8] border-[#0038A8] text-white shadow-md'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-100'
                      }`}
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Tonnage Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-700 uppercase tracking-wider">Order Volume / Weight</span>
                  <span className="text-[#FF5500] font-extrabold">{tonnage} Metric Tons</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  step="5"
                  value={tonnage}
                  onChange={(e) => setTonnage(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#FF5500]"
                />
                <div className="flex justify-between text-[11px] text-slate-500 font-medium">
                  <span>10 Tons (Single Tipper)</span>
                  <span>50 Tons (Flatbed Trailer)</span>
                  <span>100 Tons (Multi-fleet)</span>
                </div>
              </div>

              {/* 3. Corridor Route */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Transport Freight Corridor
                </label>
                <select
                  value={route}
                  onChange={(e) => setRoute(e.target.value)}
                  className="w-full p-3.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm font-semibold focus:outline-none focus:border-[#0038A8]"
                >
                  {routes.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name} (Est: {r.estHours})
                    </option>
                  ))}
                </select>
              </div>

            </div>

            <div className="pt-4 border-t border-slate-100 text-xs text-slate-500 flex items-center gap-2">
              <Info className="w-4 h-4 text-[#0038A8] flex-shrink-0" />
              Direct supplier pricing; zero middleman brokerage fees added.
            </div>

          </div>

          {/* Transparent Cost Breakdown Display */}
          <div className="lg:col-span-6 p-8 rounded-2xl bg-gradient-to-br from-slate-900 via-[#0B0E14] to-slate-900 border border-[#0038A8]/50 shadow-2xl flex flex-col justify-between text-white">
            <div className="space-y-6">
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Transparent Cost Itemization
                </span>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Escrow Protected
                </span>
              </div>

              {/* Itemized Cost List */}
              <div className="space-y-3.5">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-300">
                    Product ({currentCommodityObj.name} × {tonnage}T)
                  </span>
                  <span className="font-mono font-bold text-white">
                    ₦{productCost.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-300">
                    Freight Transit ({tonnage}T via {currentRouteObj.estHours})
                  </span>
                  <span className="font-mono font-bold text-[#FF5500]">
                    ₦{freightCost.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-300">Goods-In-Transit (GIT) Insurance (0.5%)</span>
                  <span className="font-mono font-bold text-slate-300">
                    ₦{gitInsurance.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Total Escrow Required */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Total Escrow Hold Required
                </div>
                <div className="text-3xl font-mono font-extrabold text-white">
                  ₦{totalEscrow.toLocaleString()}
                </div>
                <div className="text-[11px] text-slate-400 pt-1">
                  *Funds locked safely in escrow wallet and released only upon digital POD.
                </div>
              </div>

            </div>

            <div className="pt-6">
              <a
                href="#waitlist"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#0038A8] hover:bg-[#002B85] text-white text-base font-bold transition-all shadow-lg shadow-[#0038A8]/25"
              >
                Request Order Allocation
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default MarketplacePreview;
