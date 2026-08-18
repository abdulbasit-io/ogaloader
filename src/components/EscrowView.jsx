import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, QrCode, ArrowRight, Lock, AlertCircle, RefreshCw, DollarSign, Wallet, FileText, Truck, Building2, Check, Download, CreditCard } from 'lucide-react';
import { useApp } from '../context/AppContext';

export function EscrowView() {
  const { activeOrder, setActiveOrder, userRole, profiles } = useApp();
  const [showQrModal, setShowQrModal] = useState(false);
  const [payoutRequested, setPayoutRequested] = useState(false);

  const activeProfile = profiles[userRole] || profiles.buyer;
  const currentStage = activeOrder.escrowStage || 3;

  const handleRequestPayout = () => {
    setPayoutRequested(true);
    setTimeout(() => setPayoutRequested(false), 2500);
  };

  return (
    <div className="pt-28 pb-20 bg-[#F8FAFC] min-h-screen text-slate-900">
      
      {/* Dynamic Header Based on Persona */}
      <div className="bg-[#0B0E14] text-white py-10 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold">
              {userRole === 'buyer' && 'Protected Order Payment'}
              {userRole === 'seller' && 'Sales & Bank Disbursements'}
              {userRole === 'trucker' && 'Trip Earnings & Wallet'}
            </h1>
            <p className="text-slate-400 text-xs mt-1">
              Account: <span className="text-slate-200 font-bold">{activeProfile.name}</span> ({activeProfile.settlementBank})
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-slate-900 border border-slate-800 p-3 rounded-2xl text-right">
              <div className="text-[10px] text-slate-400 font-bold uppercase">
                {userRole === 'buyer' && 'Total Money Protected'}
                {userRole === 'seller' && 'Pending Payout Hold'}
                {userRole === 'trucker' && 'Driver Wallet Balance'}
              </div>
              <div className="text-xl font-extrabold text-emerald-400">
                {userRole === 'buyer' && `₦${activeOrder.grandTotal?.toLocaleString()}`}
                {userRole === 'seller' && `₦${activeOrder.commodityTotal?.toLocaleString()}`}
                {userRole === 'trucker' && `₦${activeOrder.freightTotal?.toLocaleString()}`}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">

        {/* ---------------------------------------------------- */}
        {/* BUYER ESCROW PAYMENT DASHBOARD VIEW                  */}
        {/* ---------------------------------------------------- */}
        {userRole === 'buyer' && (
          <div className="space-y-8">
            
            {/* Active Order Summary Card */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full bg-blue-100 text-[#0038A8] text-xs font-extrabold">
                      Active Order #{activeOrder.id}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">Tracking Code: {activeOrder.trackingCode}</span>
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900 mt-1">{activeOrder.product.title}</h3>
                </div>

                <div className="text-right">
                  <div className="text-xs text-slate-400 font-medium">Total Paid into Safe Escrow:</div>
                  <div className="text-2xl font-extrabold text-[#0038A8]">₦{activeOrder.grandTotal?.toLocaleString()}</div>
                </div>
              </div>

              {/* 5-STAGE MILESTONE TIMELINE */}
              <div className="space-y-3">
                <div className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">
                  Order Status Steps (Step {currentStage} of 5):
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                  {[
                    { stage: 1, title: '1. Money Held Safely', desc: 'Protected in safe bank hold' },
                    { stage: 2, title: '2. Goods Loaded at Yard', desc: 'Loaded and weighed at quarry' },
                    { stage: 3, title: '3. Driver on the Way', desc: 'Driver en-route to your site' },
                    { stage: 4, title: '4. Delivery Check at Site', desc: 'Inspecting goods upon arrival' },
                    { stage: 5, title: '5. Money Released', desc: 'Payout sent to seller and driver' },
                  ].map((st) => (
                    <div
                      key={st.stage}
                      className={`p-3.5 rounded-2xl border text-xs space-y-1 transition-all ${
                        currentStage >= st.stage
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-semibold'
                          : 'bg-slate-50 border-slate-200 text-slate-400'
                      }`}
                    >
                      <div className="flex items-center justify-between font-bold">
                        <span>{st.title}</span>
                        {currentStage >= st.stage && <Check className="w-4 h-4 text-emerald-600" />}
                      </div>
                      <p className="text-[11px] text-slate-500 font-normal">{st.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions & e-Waybill QR Code */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-8 space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-[#0038A8] text-xs font-bold">
                    <QrCode className="w-3.5 h-3.5" />
                    Delivery QR Code
                  </div>
                  <h4 className="text-base font-extrabold text-slate-900">
                    Delivery Receipt Code: <span className="font-mono text-[#0038A8]">#OGA-WAYBILL-9982</span>
                  </h4>
                  <p className="text-xs text-slate-600">
                    Show this QR code to the driver when your goods arrive at your site. Scanning this confirms receipt and releases payment safely.
                  </p>
                </div>

                <div className="md:col-span-4 space-y-2">
                  <button
                    onClick={() => setShowQrModal(true)}
                    className="w-full py-3 px-4 rounded-xl bg-[#0038A8] hover:bg-blue-900 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm"
                  >
                    <QrCode className="w-4 h-4" /> Show Waybill QR Code
                  </button>

                  <button
                    onClick={() => {
                      setActiveOrder((prev) => ({
                        ...prev,
                        escrowStage: 5,
                        status: 'Completed & Funds Released',
                      }));
                    }}
                    className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md"
                  >
                    <CheckCircle2 className="w-4 h-4" /> Sign POD & Release Payout
                  </button>
                </div>
              </div>

              {/* Financial Breakdown Table */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden text-xs">
                <div className="bg-slate-100 px-4 py-2.5 font-extrabold text-slate-800 uppercase tracking-wider">
                  Itemized Escrow Deposit Breakdown
                </div>
                <div className="p-4 space-y-2 text-slate-700">
                  <div className="flex justify-between">
                    <span>Commodity Cost ({activeOrder.quantity} units):</span>
                    <span className="font-bold text-slate-900">₦{activeOrder.commodityTotal?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Haulage Freight Charge ({activeOrder.trucker?.driverName}):</span>
                    <span className="font-bold text-slate-900">₦{activeOrder.freightTotal?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-2">
                    <span>Ogaloader Escrow Protection & GIT Insurance (1.5%):</span>
                    <span className="font-bold text-emerald-600">₦{activeOrder.escrowFee?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm font-extrabold text-[#0038A8] pt-1">
                    <span>Total Secured Escrow Deposit:</span>
                    <span>₦{activeOrder.grandTotal?.toLocaleString()}</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* SELLER SALES PAYOUT DASHBOARD VIEW                   */}
        {/* ---------------------------------------------------- */}
        {userRole === 'seller' && (
          <div className="space-y-8">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900">Quarry Gate Sales & Escrow Payout Ledger</h3>
                  <p className="text-xs text-slate-500">Track incoming buyer escrow deposits and automated T+1 bank disbursements.</p>
                </div>

                <span className="px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                  ✓ Bank Account Verified (Zenith Bank ****3391)
                </span>
              </div>

              {/* Yard Sales Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-700 uppercase text-[10px] font-extrabold">
                    <tr>
                      <th className="p-3">Order ID</th>
                      <th className="p-3">Commodity Item</th>
                      <th className="p-3">Buyer Company</th>
                      <th className="p-3">Gross Sales</th>
                      <th className="p-3">Fee (1.5%)</th>
                      <th className="p-3">Net Payout</th>
                      <th className="p-3">Escrow Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-800 font-medium">
                    <tr>
                      <td className="p-3 font-mono font-bold text-[#0038A8]">#OG-892401</td>
                      <td className="p-3 font-bold">Elephant Bulk Cement (100 Bags)</td>
                      <td className="p-3">Julius Berger Site Ops</td>
                      <td className="p-3 font-bold">₦480,000</td>
                      <td className="p-3 text-slate-400">₦7,200</td>
                      <td className="p-3 font-extrabold text-emerald-700">₦472,800</td>
                      <td className="p-3">
                        <span className="px-2.5 py-1 rounded-full bg-blue-100 text-[#0038A8] text-[10px] font-bold">
                          In Escrow (Awaiting POD)
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 font-mono font-bold text-[#0038A8]">#OG-772109</td>
                      <td className="p-3 font-bold">3/4 Granite Stones (30 Tons)</td>
                      <td className="p-3">Dapo Construction Ltd</td>
                      <td className="p-3 font-bold">₦546,000</td>
                      <td className="p-3 text-slate-400">₦8,190</td>
                      <td className="p-3 font-extrabold text-emerald-700">₦537,810</td>
                      <td className="p-3">
                        <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                          Disbursed to Zenith Bank
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* TRUCKER FREIGHT EARNINGS DASHBOARD VIEW              */}
        {/* ---------------------------------------------------- */}
        {userRole === 'trucker' && (
          <div className="space-y-8">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900">Transporter Freight Escrow & Driver Wallet</h3>
                  <p className="text-xs text-slate-500">Instant T+0 wallet payout upon scanning site arrival e-Waybill QR codes.</p>
                </div>

                <button
                  onClick={handleRequestPayout}
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-md"
                >
                  <Wallet className="w-4 h-4" /> Withdraw Wallet to Bank
                </button>
              </div>

              {payoutRequested && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-2xl text-center">
                  ✓ Instant Withdrawal Request Processed! ₦345,000 sent to First Bank (****4419).
                </div>
              )}

              {/* Trucker Trips Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-700 uppercase text-[10px] font-extrabold">
                    <tr>
                      <th className="p-3">Trip ID</th>
                      <th className="p-3">Route Corridor</th>
                      <th className="p-3">Payload Spec</th>
                      <th className="p-3">Trip Freight</th>
                      <th className="p-3">Driver Wallet Payout</th>
                      <th className="p-3">POD Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-800 font-medium">
                    <tr>
                      <td className="p-3 font-mono font-bold text-[#0038A8]">#TRK-992-01A</td>
                      <td className="p-3 font-bold">Ibese Yard → Lekki Phase 1 (65km)</td>
                      <td className="p-3">30-Ton Bulk Cement</td>
                      <td className="p-3 font-bold">₦117,000</td>
                      <td className="p-3 font-extrabold text-emerald-700">₦117,000</td>
                      <td className="p-3">
                        <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">
                          En-Route (POD Pending)
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 font-mono font-bold text-[#0038A8]">#TRK-881-04B</td>
                      <td className="p-3 font-bold">Abeokuta → Ibadan Hub (72km)</td>
                      <td className="p-3">45-Ton Flatbed Rebar</td>
                      <td className="p-3 font-bold">₦145,000</td>
                      <td className="p-3 font-extrabold text-emerald-700">₦145,000</td>
                      <td className="p-3">
                        <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                          Scanned & Wallet Credited
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

            </div>
          </div>
        )}

      </div>

      {/* QR Code Modal */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center space-y-4 shadow-2xl relative">
            <button onClick={() => setShowQrModal(false)} className="absolute top-4 right-4 text-slate-400">✕</button>
            
            <h3 className="text-lg font-extrabold text-slate-900">Digital e-Waybill Gate Pass</h3>
            <p className="text-xs text-slate-500">Present to quarry yard dispatcher or site receiving engineer.</p>

            <div className="p-6 bg-slate-900 rounded-2xl inline-block shadow-inner">
              <QrCode className="w-40 h-40 text-white mx-auto" />
            </div>

            <div className="font-mono text-xs font-bold text-[#0038A8]">
              TOKEN: #OGA-WAYBILL-9982
            </div>

            <button
              onClick={() => setShowQrModal(false)}
              className="w-full py-3 rounded-xl bg-[#0038A8] text-white text-xs font-bold"
            >
              Close Waybill
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default EscrowView;
