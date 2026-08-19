import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, QrCode, ArrowRight, Lock, AlertCircle, RefreshCw, DollarSign, Wallet, FileText, Truck, Building2, Check, Download, CreditCard, ShoppingBag, TrendingUp, Calendar, MapPin } from 'lucide-react';
import { useApp } from '../context/AppContext';

export function EscrowView() {
  const { activeOrder, setActiveOrder, userRole, profiles } = useApp();
  const [showQrModal, setShowQrModal] = useState(false);
  const [payoutRequested, setPayoutRequested] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');

  const activeProfile = profiles[userRole] || profiles.buyer;
  const currentStage = activeOrder.escrowStage || 3;

  const handleRequestPayout = () => {
    setPayoutRequested(true);
    setTimeout(() => setPayoutRequested(false), 3000);
  };

  // Sample Historical Orders Data per Role
  const buyerOrders = [
    {
      id: '#OG-892401',
      date: 'Aug 18, 2026',
      product: 'Elephant Bulk Cement (50kg Bags x 300)',
      seller: 'Lafarge Africa Depot',
      trucker: 'Tunde Transport',
      commodityCost: 1440000,
      freightCost: 117000,
      escrowFee: 23355,
      totalSpent: 1580355,
      status: 'In Escrow (En-Route)',
      stage: 3,
    },
    {
      id: '#OG-772109',
      date: 'Aug 14, 2026',
      product: '3/4 Clean Granite Stones (30-Ton Load)',
      seller: 'Crushed Rock Quarries Ltd',
      trucker: 'Kano Express Haulage',
      commodityCost: 546000,
      freightCost: 145000,
      escrowFee: 10365,
      totalSpent: 701365,
      status: 'Delivered & Released',
      stage: 5,
    },
    {
      id: '#OG-663211',
      date: 'Aug 08, 2026',
      product: 'Washed Sharp Sand (20-Ton Tipper Load)',
      seller: 'Ogun River Dredging Co.',
      trucker: 'Bisi Logistics Services',
      commodityCost: 290000,
      freightCost: 85000,
      escrowFee: 5625,
      totalSpent: 380625,
      status: 'Delivered & Released',
      stage: 5,
    },
  ];

  const sellerSales = [
    {
      id: '#OG-892401',
      date: 'Aug 18, 2026',
      product: 'Elephant Bulk Cement (300 Bags)',
      buyer: 'Julius Berger Site Ops',
      quantity: '300 Bags (15 Tons)',
      grossSales: 1440000,
      fee: 21600,
      netPayout: 1418400,
      status: 'In Escrow (Awaiting POD)',
      bankStatus: 'Pending Site Receipt',
    },
    {
      id: '#OG-772109',
      date: 'Aug 14, 2026',
      product: '3/4 Clean Granite Stones (30 Tons)',
      buyer: 'Dapo Construction Ltd',
      quantity: '30 Tons',
      grossSales: 546000,
      fee: 8190,
      netPayout: 537810,
      status: 'Completed',
      bankStatus: 'Sent to Zenith Bank (****3391)',
    },
    {
      id: '#OG-551902',
      date: 'Aug 02, 2026',
      product: 'Stone Dust Aggregate (50 Tons)',
      buyer: 'Lekki Paving Blocks Ltd',
      quantity: '50 Tons',
      grossSales: 475000,
      fee: 7125,
      netPayout: 467875,
      status: 'Completed',
      bankStatus: 'Sent to Zenith Bank (****3391)',
    },
  ];

  const truckerTrips = [
    {
      id: '#TRK-992-01A',
      date: 'Aug 18, 2026',
      route: 'Ewekoro Yard → Lekki Phase 1 (65km)',
      cargo: '30-Ton Bulk Cement',
      buyer: 'Julius Berger Site Ops',
      freightEarned: 117000,
      status: 'En-Route (POD Code Ready)',
      walletStatus: 'Pending Arrival Scan',
    },
    {
      id: '#TRK-881-04B',
      date: 'Aug 14, 2026',
      route: 'Abeokuta Quarry → Ibadan Hub (72km)',
      cargo: '30-Ton Granite Aggregate',
      buyer: 'Dapo Construction Ltd',
      freightEarned: 145000,
      status: 'Delivered & Scanned',
      walletStatus: 'Credited to Wallet',
    },
    {
      id: '#TRK-774-09C',
      date: 'Aug 09, 2026',
      route: 'Apapa Port → Sagamu Interchange (80km)',
      cargo: '15-Ton Steel Rebar',
      buyer: 'Hitech Construction Co.',
      freightEarned: 83000,
      status: 'Delivered & Scanned',
      walletStatus: 'Credited to Wallet',
    },
  ];

  return (
    <div className="pt-28 pb-20 bg-[#F8FAFC] min-h-screen text-slate-900">
      
      {/* Top Banner Header */}
      <div className="bg-[#0B0E14] text-white py-10 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-extrabold flex items-center gap-3">
              <CreditCard className="w-8 h-8 text-[#0038A8]" />
              {userRole === 'buyer' && 'Protected Order Payment & History'}
              {userRole === 'seller' && 'Sales Earnings & Bank Disbursements'}
              {userRole === 'trucker' && 'Freight Trip Revenue & Driver Wallet'}
            </h1>
            <p className="text-slate-400 text-xs mt-1.5">
              Account: <span className="text-slate-200 font-bold">{activeProfile.name}</span> ({activeProfile.settlementBank}) • Role: <span className="uppercase text-blue-400 font-extrabold">{userRole}</span>
            </p>
          </div>

          {/* Role Financial KPI Cards */}
          <div className="flex flex-wrap items-center gap-3">
            {userRole === 'buyer' && (
              <>
                <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-2xl text-right">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Active Escrow Locked</div>
                  <div className="text-lg font-extrabold text-blue-400">₦{activeOrder.grandTotal?.toLocaleString()}</div>
                </div>
                <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-2xl text-right">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Total Spend History</div>
                  <div className="text-lg font-extrabold text-emerald-400">₦2,662,345</div>
                </div>
              </>
            )}

            {userRole === 'seller' && (
              <>
                <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-2xl text-right">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Pending Escrow Hold</div>
                  <div className="text-lg font-extrabold text-amber-400">₦1,418,400</div>
                </div>
                <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-2xl text-right">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Disbursed to Zenith Bank</div>
                  <div className="text-lg font-extrabold text-emerald-400">₦2,424,085</div>
                </div>
              </>
            )}

            {userRole === 'trucker' && (
              <>
                <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-2xl text-right">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Driver Wallet Balance</div>
                  <div className="text-lg font-extrabold text-emerald-400">₦345,000</div>
                </div>
                <button
                  onClick={handleRequestPayout}
                  className="px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-md transition-all"
                >
                  <Wallet className="w-4 h-4" /> Withdraw Funds
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">

        {payoutRequested && (
          <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-950 text-xs font-bold rounded-2xl shadow-sm text-center animate-in fade-in">
            ✓ Instant Withdrawal Processed! ₦345,000 sent to First Bank (****4419). Funds available in 3 minutes.
          </div>
        )}

        {/* ------------------------------------------------------------------- */}
        {/* 1. BUYER PAYMENT & ESCROW DASHBOARD                                 */}
        {/* ------------------------------------------------------------------- */}
        {userRole === 'buyer' && (
          <div className="space-y-8">
            
            {/* Active Order Summary Card */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full bg-blue-100 text-[#0038A8] text-xs font-extrabold">
                      Active Order #{activeOrder.id}
                    </span>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      activeOrder.fulfillmentType === 'pickup'
                        ? 'bg-amber-100 text-amber-900 border border-amber-300'
                        : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                    }`}>
                      {activeOrder.fulfillmentType === 'pickup' ? '📦 Yard Self-Pickup (Free)' : '🚚 Matched Truck Delivery'}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">Code: {activeOrder.trackingCode || 'TRK-992-01A'}</span>
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900 mt-1">{activeOrder.product.title}</h3>
                </div>

                <div className="text-right">
                  <div className="text-xs text-slate-400 font-medium">Total Paid into Safe Escrow:</div>
                  <div className="text-2xl font-extrabold text-[#0038A8]">₦{activeOrder.grandTotal?.toLocaleString()}</div>
                </div>
              </div>

              {/* DYNAMIC 5-STAGE MILESTONE TIMELINE */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-extrabold text-slate-700 uppercase tracking-wider">
                  <span>Order Status Steps (Step {currentStage} of 5):</span>
                  <span className="text-blue-600 font-bold normal-case">
                    Fulfillment: {activeOrder.fulfillmentType === 'pickup' ? 'Quarry Self-Pickup' : 'Ogaloader Truck Delivery'}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                  {(activeOrder.fulfillmentType === 'pickup' ? [
                    { stage: 1, title: '1. Money Held Safely', desc: 'Protected in safe escrow hold' },
                    { stage: 2, title: '2. Pickup QR Code Ready', desc: 'Digital QR generated for driver' },
                    { stage: 3, title: '3. Yard Scan & Loading', desc: 'Quarry scans QR & loads truck' },
                    { stage: 4, title: '4. Gate Out Confirmed', desc: 'Self-pickup loading verified' },
                    { stage: 5, title: '5. Money Released', desc: 'Payout released to supplier' },
                  ] : [
                    { stage: 1, title: '1. Money Held Safely', desc: 'Protected in safe bank hold' },
                    { stage: 2, title: '2. Goods Loaded at Yard', desc: 'Loaded & weighed at quarry' },
                    { stage: 3, title: '3. Driver on the Way', desc: 'Driver en-route to your site' },
                    { stage: 4, title: '4. Delivery Check at Site', desc: 'Inspecting goods upon arrival' },
                    { stage: 5, title: '5. Money Released', desc: 'Payout sent to seller and driver' },
                  ]).map((st) => (
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
                    {activeOrder.fulfillmentType === 'pickup' ? 'Yard Pickup QR Code' : 'Delivery Receipt QR Code'}
                  </div>
                  <h4 className="text-base font-extrabold text-slate-900">
                    {activeOrder.fulfillmentType === 'pickup' ? 'Quarry Gate Loading Code: ' : 'Delivery Receipt Code: '}
                    <span className="font-mono text-[#0038A8]">{activeOrder.fulfillmentType === 'pickup' ? '#OGA-PICKUP-8819' : '#OGA-WAYBILL-9982'}</span>
                  </h4>
                  <p className="text-xs text-slate-600">
                    {activeOrder.fulfillmentType === 'pickup'
                      ? 'Show this QR code to the quarry loading bay operator at the seller yard. Scanning this authorizes loading your truck and releases payment safely upon gate exit.'
                      : 'Show this QR code to the driver when your goods arrive at your site. Scanning this confirms receipt and releases payment safely.'}
                  </p>
                </div>

                <div className="md:col-span-4 space-y-2">
                  <button
                    onClick={() => setShowQrModal(true)}
                    className="w-full py-3 px-4 rounded-xl bg-[#0038A8] hover:bg-blue-900 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm"
                  >
                    <QrCode className="w-4 h-4" /> {activeOrder.fulfillmentType === 'pickup' ? 'Show Pickup QR Code' : 'Show Waybill QR Code'}
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
                    <CheckCircle2 className="w-4 h-4" /> {activeOrder.fulfillmentType === 'pickup' ? 'Confirm Pickup & Release Payout' : 'Sign Receipt & Release Payout'}
                  </button>
                </div>
              </div>

              {/* Itemized Spend Breakdown */}
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
                    <span>
                      {activeOrder.fulfillmentType === 'pickup' ? 'Haulage Freight Charge (Yard Self-Pickup):' : `Haulage Freight Charge (${activeOrder.trucker?.driverName || 'Matched Driver'}):`}
                    </span>
                    <span className="font-bold text-slate-900">
                      {activeOrder.fulfillmentType === 'pickup' ? '₦0 (Free)' : `₦${activeOrder.freightTotal?.toLocaleString()}`}
                    </span>
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

            {/* Buyer Purchases History Ledger */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900">Your Purchase & Payment History</h3>
                  <p className="text-xs text-slate-500">Track all past building material purchases and money spent per order.</p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <tbody className="divide-y divide-slate-100 text-slate-800 font-medium">
                    {buyerOrders.map((ord) => (
                      <tr key={ord.id} className="hover:bg-slate-50/80">
                        <td className="p-3 font-mono font-bold text-[#0038A8]">{ord.id}</td>
                        <td className="p-3 text-slate-500 font-normal">{ord.date}</td>
                        <td className="p-3 font-bold text-slate-900">{ord.product}</td>
                        <td className="p-3">
                          <div className="text-[11px] text-slate-500">Seller: {ord.seller}</div>
                          <div className="text-[11px] text-slate-500">Trucker: {ord.trucker}</div>
                        </td>
                        <td className="p-3 font-extrabold text-[#0038A8] text-sm">₦{ord.totalSpent.toLocaleString()}</td>
                        <td className="p-3">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            ord.stage === 5
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-blue-100 text-[#0038A8]'
                          }`}>
                            {ord.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* ------------------------------------------------------------------- */}
        {/* 2. SELLER SALES PAYOUT & EARNINGS DASHBOARD                         */}
        {/* ------------------------------------------------------------------- */}
        {userRole === 'seller' && (
          <div className="space-y-8">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900">Quarry Gate Sales & Bank Payout Ledger</h3>
                  <p className="text-xs text-slate-500">Track all your material sales, buyer deposits, and money disbursed to your bank.</p>
                </div>

                <span className="px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1.5">
                  <Check className="w-4 h-4" /> Bank Account Verified (Zenith Bank ****3391)
                </span>
              </div>

              {/* Seller Sales Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-700 uppercase text-[10px] font-extrabold">
                    <tr>
                      <th className="p-3">Order ID</th>
                      <th className="p-3">Date</th>
                      <th className="p-3">Commodity Sold</th>
                      <th className="p-3">Buyer Company</th>
                      <th className="p-3">Gross Sales</th>
                      <th className="p-3">Fee (1.5%)</th>
                      <th className="p-3">Net Earnings</th>
                      <th className="p-3">Payout Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-800 font-medium">
                    {sellerSales.map((sale) => (
                      <tr key={sale.id} className="hover:bg-slate-50/80">
                        <td className="p-3 font-mono font-bold text-[#0038A8]">{sale.id}</td>
                        <td className="p-3 text-slate-500 font-normal">{sale.date}</td>
                        <td className="p-3 font-bold text-slate-900">{sale.product}</td>
                        <td className="p-3">{sale.buyer}</td>
                        <td className="p-3 font-bold">₦{sale.grossSales.toLocaleString()}</td>
                        <td className="p-3 text-slate-400">₦{sale.fee.toLocaleString()}</td>
                        <td className="p-3 font-extrabold text-emerald-700 text-sm">₦{sale.netPayout.toLocaleString()}</td>
                        <td className="p-3">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            sale.status === 'Completed'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}>
                            {sale.bankStatus}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
                <span>Total Net Sales Disbursed To Date: <strong className="text-slate-900">₦2,424,085</strong></span>
                <button className="px-3.5 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs flex items-center gap-1.5">
                  <Download className="w-3.5 h-3.5" /> Download Tax Statement (PDF)
                </button>
              </div>

            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------- */}
        {/* 3. TRUCKER FREIGHT EARNINGS & WALLET DASHBOARD                     */}
        {/* ------------------------------------------------------------------- */}
        {userRole === 'trucker' && (
          <div className="space-y-8">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900">Driver Trip Revenue & Wallet Ledger</h3>
                  <p className="text-xs text-slate-500">Track earnings per trip, site delivery scans, and instant driver wallet payouts.</p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-[10px] text-slate-400 font-bold uppercase">Driver Wallet</div>
                    <div className="text-xl font-extrabold text-emerald-600">₦345,000</div>
                  </div>
                  <button
                    onClick={handleRequestPayout}
                    className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-md transition-all"
                  >
                    <Wallet className="w-4 h-4" /> Withdraw Money
                  </button>
                </div>
              </div>

              {/* Trucker Trips Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-700 uppercase text-[10px] font-extrabold">
                    <tr>
                      <th className="p-3">Trip ID</th>
                      <th className="p-3">Date</th>
                      <th className="p-3">Route Corridor</th>
                      <th className="p-3">Payload Delivered</th>
                      <th className="p-3">Client / Buyer</th>
                      <th className="p-3">Freight Earnings</th>
                      <th className="p-3">Wallet Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-800 font-medium">
                    {truckerTrips.map((trip) => (
                      <tr key={trip.id} className="hover:bg-slate-50/80">
                        <td className="p-3 font-mono font-bold text-[#0038A8]">{trip.id}</td>
                        <td className="p-3 text-slate-500 font-normal">{trip.date}</td>
                        <td className="p-3 font-bold text-slate-900">{trip.route}</td>
                        <td className="p-3">{trip.cargo}</td>
                        <td className="p-3 text-slate-600">{trip.buyer}</td>
                        <td className="p-3 font-extrabold text-emerald-700 text-sm">₦{trip.freightEarned.toLocaleString()}</td>
                        <td className="p-3">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            trip.status.includes('Delivered')
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}>
                            {trip.walletStatus}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
                <span>Total Driver Freight Revenue: <strong className="text-slate-900">₦1,280,000 (12 Trips)</strong></span>
                <button className="px-3.5 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs flex items-center gap-1.5">
                  <Download className="w-3.5 h-3.5" /> Download Trip Receipts (PDF)
                </button>
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
