import React, { useState } from 'react';
import { Truck, MapPin, Navigation, ShieldCheck, CheckCircle2, QrCode, Zap, RefreshCw, DollarSign, Wallet, Check, X, CornerDownRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export function TruckerDispatchView() {
  const { truckers, truckerState, updateTruckerLocation, negotiations, respondNegotiation, counterNegotiation } = useApp();
  const driver = truckers[0]; // Musa Ibrahim (Logged in trucker)

  const [currentLoc, setCurrentLoc] = useState(truckerState.currentLocation);
  const [activeRoute, setActiveRoute] = useState(truckerState.activeRoute);
  const [isBackhaul, setIsBackhaul] = useState(truckerState.isBackhaulEnabled);
  const [locationUpdated, setLocationUpdated] = useState(false);

  // Freight Counter-Bid Form State
  const [counteringId, setCounteringId] = useState(null);
  const [truckerCounterRate, setTruckerCounterRate] = useState('');
  const [truckerNote, setTruckerNote] = useState('');

  const handleSaveLocation = (e) => {
    e.preventDefault();
    updateTruckerLocation(currentLoc, activeRoute, isBackhaul);
    setLocationUpdated(true);
    setTimeout(() => setLocationUpdated(false), 2000);
  };

  const handleSendTruckerCounter = (id) => {
    if (!truckerCounterRate) return;
    counterNegotiation(id, truckerCounterRate, truckerNote || 'Transporter counter-rate for fuel & route distance.', 'trucker');
    setCounteringId(null);
    setTruckerCounterRate('');
    setTruckerNote('');
  };

  return (
    <div className="pt-28 pb-20 bg-[#F8FAFC] min-h-screen text-slate-900">
      
      {/* Header */}
      <div className="bg-[#0B0E14] text-white py-10 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold">{driver.driverName} Driver Dashboard</h1>
            <p className="text-slate-400 text-xs mt-1">
              Truck Spec: <span className="text-slate-200 font-bold">{driver.truckType}</span> ({driver.plateNumber})
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-slate-900 border border-slate-800 p-3 rounded-2xl text-right">
              <div className="text-[10px] text-slate-400 font-bold uppercase">Driver Wallet Balance</div>
              <div className="text-xl font-extrabold text-emerald-400">₦345,000</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* DRIVER LOCATION & ROUTE CORRIDOR UPDATER */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                <Navigation className="w-5 h-5 text-[#0038A8]" />
                Update Your Current Location & Route
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Update where you are so buyers nearby can easily find and book your truck.
              </p>
            </div>
            {locationUpdated && (
              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Station Live on Matcher
              </span>
            )}
          </div>

          <form onSubmit={handleSaveLocation} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end text-xs font-medium">
            <div className="md:col-span-4">
              <label className="block text-slate-700 font-bold mb-1">Current Stationed Location:</label>
              <select
                value={currentLoc}
                onChange={(e) => setCurrentLoc(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-300 font-bold text-slate-900 focus:ring-2 focus:ring-[#0038A8]"
              >
                <option value="Ibese Quarry Zone, Ogun State">Ibese Quarry Zone, Ogun State</option>
                <option value="Apapa Port Corridor, Lagos">Apapa Port Corridor, Lagos</option>
                <option value="Sagamu Interchange, Ogun">Sagamu Interchange, Ogun</option>
                <option value="Ibadan Commercial Hub, Oyo">Ibadan Commercial Hub, Oyo</option>
                <option value="Kano Grain Terminal, Kano">Kano Grain Terminal, Kano</option>
              </select>
            </div>

            <div className="md:col-span-4">
              <label className="block text-slate-700 font-bold mb-1">Active Destination Corridor:</label>
              <select
                value={activeRoute}
                onChange={(e) => setActiveRoute(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-300 font-bold text-slate-900 focus:ring-2 focus:ring-[#0038A8]"
              >
                <option value="Abeokuta → Lagos Corridor">Abeokuta → Lagos Corridor</option>
                <option value="Lagos → Ibadan Expressway">Lagos → Ibadan Expressway</option>
                <option value="Lagos → Kano Interstate Corridor">Lagos → Kano Interstate Corridor</option>
                <option value="Ibadan → Lekki Phase 1">Ibadan → Lekki Phase 1</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-slate-700 font-bold mb-1">Backhaul Mode:</label>
              <button
                type="button"
                onClick={() => setIsBackhaul(!isBackhaul)}
                className={`w-full py-3 px-3 rounded-xl text-xs font-bold transition-all border ${
                  isBackhaul
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                    : 'bg-slate-100 text-slate-600 border-slate-300'
                }`}
              >
                {isBackhaul ? '35% Backhaul Active' : 'Off'}
              </button>
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#0038A8] hover:bg-blue-900 text-white font-bold text-xs shadow-md transition-all"
              >
                Update Station
              </button>
            </div>
          </form>
        </div>

        {/* INCOMING FREIGHT RATE NEGOTIATIONS */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-emerald-600" />
              Incoming Haulage Rate Counter-Offers ({negotiations.filter(n => n.type === 'freight').length})
            </h2>
            <span className="text-xs text-slate-500 font-medium">Transporter Rate Matching</span>
          </div>

          {negotiations.filter(n => n.type === 'freight').length === 0 ? (
            <div className="text-center py-6 text-slate-400 text-xs">No active haulage rate negotiations.</div>
          ) : (
            <div className="space-y-4">
              {negotiations.filter(n => n.type === 'freight').map((neg) => (
                <div key={neg.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/60 pb-3">
                    <div className="space-y-1 text-xs">
                      <div className="font-extrabold text-slate-900 text-sm">{neg.productName}</div>
                      <div className="text-slate-600">Buyer: <strong>{neg.buyerName}</strong></div>
                      <div className="flex items-center gap-3 pt-1">
                        <span className="line-through text-slate-400">Standard Rate: ₦{neg.originalPrice?.toLocaleString()}</span>
                        <span className="font-extrabold text-emerald-700 text-sm">Offered Rate: ₦{neg.offeredPrice?.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {neg.status === 'pending_seller' && (
                        <>
                          <button
                            onClick={() => respondNegotiation(neg.id, 'accepted')}
                            className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1 shadow-sm"
                          >
                            <Check className="w-4 h-4" /> Accept Rate
                          </button>

                          <button
                            onClick={() => {
                              setCounteringId(neg.id);
                              setTruckerCounterRate(Math.round((neg.originalPrice + neg.offeredPrice) / 2));
                            }}
                            className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1 shadow-sm"
                          >
                            <CornerDownRight className="w-4 h-4" /> Counter-Rate
                          </button>

                          <button
                            onClick={() => respondNegotiation(neg.id, 'declined')}
                            className="px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center gap-1 shadow-sm"
                          >
                            <X className="w-4 h-4" /> Decline
                          </button>
                        </>
                      )}

                      {neg.status === 'accepted' && (
                        <span className="px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                          ✓ Rate Agreed (Escrow Secured)
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Freight Counter-Bid Form */}
                  {counteringId === neg.id && (
                    <div className="p-3 bg-blue-50/90 rounded-xl border border-blue-200 space-y-2 animate-in fade-in">
                      <div className="text-xs font-bold text-slate-800">
                        Submit Transporter Counter Freight Rate:
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
                        <input
                          type="number"
                          value={truckerCounterRate}
                          onChange={(e) => setTruckerCounterRate(e.target.value)}
                          placeholder="Counter trip rate (₦)"
                          className="sm:col-span-4 px-3 py-2 rounded-lg border border-slate-300 text-xs font-bold text-[#0038A8]"
                        />
                        <input
                          type="text"
                          value={truckerNote}
                          onChange={(e) => setTruckerNote(e.target.value)}
                          placeholder="Route fuel / toll note..."
                          className="sm:col-span-5 px-3 py-2 rounded-lg border border-slate-300 text-xs"
                        />
                        <button
                          type="button"
                          onClick={() => handleSendTruckerCounter(neg.id)}
                          className="sm:col-span-3 px-4 py-2 rounded-lg bg-[#0038A8] text-white text-xs font-bold"
                        >
                          Send Counter-Rate
                        </button>
                      </div>
                    </div>
                  )}

                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default TruckerDispatchView;
