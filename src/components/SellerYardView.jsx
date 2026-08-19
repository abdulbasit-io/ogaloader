import React, { useState } from 'react';
import { Package, Plus, ShieldCheck, Check, X, RefreshCw, MapPin, DollarSign, MessageSquare, CheckCircle2, ArrowRight, CornerDownRight, CreditCard, Camera, Upload, Image } from 'lucide-react';
import { useApp } from '../context/AppContext';

export function SellerYardView() {
  const { products, setProducts, negotiations, respondNegotiation, counterNegotiation, navigateTo } = useApp();
  const [showAddModal, setShowAddModal] = useState(false);
  
  // Listing Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Bulk Cement');
  const [price, setPrice] = useState(4800);
  const [unit, setUnit] = useState('50kg Bag');
  const [stock, setStock] = useState(15000);
  const [location, setLocation] = useState('Ewekoro Quarry Depot, Ogun State');
  const [selectedImage, setSelectedImage] = useState('/images/cement_bags.png');
  const [customImagePreview, setCustomImagePreview] = useState(null);
  const [addedSuccess, setAddedSuccess] = useState(false);

  // Image Upload Handler
  const handleSellerPhotoUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCustomImagePreview(reader.result);
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Seller Counter-Bid Form State
  const [counteringId, setCounteringId] = useState(null);
  const [sellerCounterPrice, setSellerCounterPrice] = useState('');
  const [sellerNote, setSellerNote] = useState('');

  const imagePresets = [
    { label: 'Bulk Cement', url: '/images/cement_bags.png' },
    { label: 'Sharp Sand', url: '/images/sharp_sand.png' },
    { label: 'Granite Stones', url: '/images/granite_stones.png' },
    { label: 'Steel Rebar', url: '/images/steel_rebar.png' },
    { label: 'Yellow Maize', url: '/images/yellow_maize.png' },
    { label: 'Stone Dust', url: '/images/stone_dust.png' },
  ];

  const handleAddProduct = (e) => {
    e.preventDefault();
    const finalImage = customImagePreview || selectedImage;

    const newProduct = {
      id: `p-${Date.now().toString().slice(-4)}`,
      title: title || 'Quarry Crushed Granite (3/4 Inch)',
      category: category,
      pricePerUnit: Number(price),
      unit: unit,
      stockQty: Number(stock),
      minOrderQty: 100,
      sellerLocation: location,
      seller: 'Lafarge Africa Depot',
      rating: 4.9,
      reviewsCount: 12,
      description: 'High-density crushed stone aggregate suitable for structural foundation concrete.',
      image: finalImage,
    };

    setProducts((prev) => [newProduct, ...prev]);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      setShowAddModal(false);
      setTitle('');
      setCustomImagePreview(null);
    }, 1500);
  };

  const handleSendSellerCounter = (id) => {
    if (!sellerCounterPrice) return;
    counterNegotiation(id, sellerCounterPrice, sellerNote || 'Seller counter-bid for yard loading volume.', 'seller');
    setCounteringId(null);
    setSellerCounterPrice('');
    setSellerNote('');
  };

  return (
    <div className="pt-28 pb-20 bg-[#F8FAFC] min-h-screen text-slate-900">
      
      {/* Header */}
      <div className="bg-[#0B0E14] text-white py-10 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold">Seller Goods & Price Management</h1>
            <p className="text-slate-400 text-xs mt-1">Set your material prices, manage your yard goods, and track buyer payments & payouts.</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-slate-900 border border-slate-800 p-3 rounded-2xl text-right">
              <div className="text-[10px] text-slate-400 font-bold uppercase">Pending Escrow Payout</div>
              <div className="text-lg font-extrabold text-amber-400">₦1,418,400</div>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-3 rounded-2xl text-right">
              <div className="text-[10px] text-slate-400 font-bold uppercase">Disbursed to Zenith Bank</div>
              <div className="text-lg font-extrabold text-emerald-400">₦2,424,085</div>
            </div>

            <button
              onClick={() => setShowAddModal(true)}
              className="px-5 py-3 rounded-xl bg-[#0038A8] hover:bg-blue-900 text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all"
            >
              <Plus className="w-4 h-4" /> Add New Goods Listing
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">

        {/* Embedded Sales & Bank Payout Ledger */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-[#0038A8]" />
                Quarry Gate Sales & Payout Ledger
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">Track money made per order and automatic bank payouts (Zenith Bank ****3391).</p>
            </div>

            <button
              onClick={() => navigateTo('transactions')}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
            >
              View Full Payment Page <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-slate-700 uppercase text-[10px] font-extrabold">
                <tr>
                  <th className="p-3">Order ID</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Commodity Item</th>
                  <th className="p-3">Buyer Company</th>
                  <th className="p-3">Gross Sales</th>
                  <th className="p-3">Fee (1.5%)</th>
                  <th className="p-3">Net Earnings</th>
                  <th className="p-3">Payout Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800 font-medium">
                <tr>
                  <td className="p-3 font-mono font-bold text-[#0038A8]">#OG-892401</td>
                  <td className="p-3 text-slate-500 font-normal">Aug 18, 2026</td>
                  <td className="p-3 font-bold">Elephant Bulk Cement (300 Bags)</td>
                  <td className="p-3">Julius Berger Site Ops</td>
                  <td className="p-3 font-bold">₦1,440,000</td>
                  <td className="p-3 text-slate-400">₦21,600</td>
                  <td className="p-3 font-extrabold text-emerald-700 text-sm">₦1,418,400</td>
                  <td className="p-3">
                    <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">
                      In Escrow (Awaiting POD)
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-mono font-bold text-[#0038A8]">#OG-772109</td>
                  <td className="p-3 text-slate-500 font-normal">Aug 14, 2026</td>
                  <td className="p-3 font-bold">3/4 Granite Stones (30 Tons)</td>
                  <td className="p-3">Dapo Construction Ltd</td>
                  <td className="p-3 font-bold">₦546,000</td>
                  <td className="p-3 text-slate-400">₦8,190</td>
                  <td className="p-3 font-extrabold text-emerald-700 text-sm">₦537,810</td>
                  <td className="p-3">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      Sent to Zenith Bank (****3391)
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-mono font-bold text-[#0038A8]">#OG-551902</td>
                  <td className="p-3 text-slate-500 font-normal">Aug 02, 2026</td>
                  <td className="p-3 font-bold">Stone Dust Aggregate (50 Tons)</td>
                  <td className="p-3">Lekki Paving Blocks Ltd</td>
                  <td className="p-3 font-bold">₦475,000</td>
                  <td className="p-3 text-slate-400">₦7,125</td>
                  <td className="p-3 font-extrabold text-emerald-700 text-sm">₦467,875</td>
                  <td className="p-3">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      Sent to Zenith Bank (****3391)
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Pending Buyer Counter Offers Section */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-[#0038A8]" />
              Incoming Price Counter-Offers ({negotiations.length})
            </h2>
            <span className="text-xs text-slate-500 font-medium">Bidirectional Negotiation Lifecycle</span>
          </div>

          {negotiations.length === 0 ? (
            <div className="text-center py-6 text-slate-400 text-xs">No active price counter-offers at this time.</div>
          ) : (
            <div className="space-y-4">
              {negotiations.map((neg) => (
                <div key={neg.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/60 pb-3">
                    <div className="space-y-1 text-xs">
                      <div className="font-extrabold text-slate-900 text-sm">{neg.productName}</div>
                      <div className="text-slate-600">Buyer: <strong>{neg.buyerName}</strong> ({neg.quantity} {neg.unit}s)</div>
                      <div className="flex items-center gap-3 pt-1">
                        <span className="line-through text-slate-400">List: ₦{neg.originalPrice?.toLocaleString()}</span>
                        <span className="font-extrabold text-[#0038A8] text-sm">Active Offer: ₦{neg.offeredPrice?.toLocaleString()} / {neg.unit}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {neg.status === 'pending_seller' && (
                        <>
                          <button
                            onClick={() => respondNegotiation(neg.id, 'accepted')}
                            className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1 shadow-sm"
                          >
                            <Check className="w-4 h-4" /> Accept Offer
                          </button>

                          <button
                            onClick={() => {
                              setCounteringId(neg.id);
                              setSellerCounterPrice(Math.round((neg.originalPrice + neg.offeredPrice) / 2));
                            }}
                            className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1 shadow-sm"
                          >
                            <CornerDownRight className="w-4 h-4" /> Counter-Bid
                          </button>

                          <button
                            onClick={() => respondNegotiation(neg.id, 'declined')}
                            className="px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center gap-1 shadow-sm"
                          >
                            <X className="w-4 h-4" /> Decline
                          </button>
                        </>
                      )}

                      {neg.status === 'pending_buyer' && (
                        <span className="px-3 py-1.5 rounded-full bg-amber-100 text-amber-800 text-xs font-bold">
                          ⏳ Counter-Bid Sent (Awaiting Buyer Response)
                        </span>
                      )}

                      {neg.status === 'accepted' && (
                        <span className="px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                          ✓ Offer Accepted (Escrow Locked)
                        </span>
                      )}

                      {neg.status === 'declined' && (
                        <span className="px-3 py-1.5 rounded-full bg-rose-100 text-rose-800 text-xs font-bold">
                          ✗ Offer Declined
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Counter Bid Form Inline */}
                  {counteringId === neg.id && (
                    <div className="p-3 bg-blue-50/90 rounded-xl border border-blue-200 space-y-2 animate-in fade-in">
                      <div className="text-xs font-bold text-slate-800">
                        Submit Seller Counter-Offer Price:
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
                        <input
                          type="number"
                          value={sellerCounterPrice}
                          onChange={(e) => setSellerCounterPrice(e.target.value)}
                          placeholder="Counter price per unit (₦)"
                          className="sm:col-span-4 px-3 py-2 rounded-lg border border-slate-300 text-xs font-bold text-[#0038A8]"
                        />
                        <input
                          type="text"
                          value={sellerNote}
                          onChange={(e) => setSellerNote(e.target.value)}
                          placeholder="Note to buyer (e.g. Can meet half-way at ₦4,600)..."
                          className="sm:col-span-5 px-3 py-2 rounded-lg border border-slate-300 text-xs"
                        />
                        <button
                          type="button"
                          onClick={() => handleSendSellerCounter(neg.id)}
                          className="sm:col-span-3 px-4 py-2 rounded-lg bg-[#0038A8] text-white text-xs font-bold"
                        >
                          Send Counter-Bid
                        </button>
                      </div>
                    </div>
                  )}

                  {/* History Timeline */}
                  {neg.history && neg.history.length > 0 && (
                    <div className="space-y-1 text-[11px] text-slate-500 pt-1">
                      <span className="font-bold text-slate-700">Negotiation Log:</span>
                      {neg.history.map((h, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 uppercase">[{h.sender}]:</span>
                          <span>₦{h.price?.toLocaleString()} — "{h.note}" ({h.time})</span>
                        </div>
                      ))}
                    </div>
                  )}

                </div>
              ))}
            </div>
          )}
        </div>

        {/* Yard Inventory Grid */}
        <div className="space-y-4">
          <h2 className="text-xl font-extrabold text-slate-900">Active Yard Inventory & Gate Prices</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map((prod) => (
              <div key={prod.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col justify-between">
                <div>
                  <div className="h-40 bg-slate-100 relative">
                    <img
                      src={prod.image}
                      alt={prod.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#0B0E14]/80 text-white text-xs font-bold">
                      {prod.category}
                    </div>
                  </div>

                  <div className="p-4 space-y-2">
                    <div className="font-extrabold text-slate-900 text-sm line-clamp-1">{prod.title}</div>
                    <div className="text-xs text-slate-500 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#0038A8]" />
                      {prod.sellerLocation}
                    </div>
                    <div className="text-xl font-extrabold text-[#0038A8]">₦{prod.pricePerUnit.toLocaleString()} / {prod.unit}</div>
                  </div>
                </div>

                <div className="p-4 border-t border-slate-100 bg-slate-50 text-xs text-slate-600 font-medium flex justify-between">
                  <span>In-Yard Stock:</span>
                  <span className="font-bold text-emerald-600">{prod.stockQty.toLocaleString()} {prod.unit}s</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Add Commodity Listing Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full space-y-4 shadow-2xl relative my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-extrabold text-slate-900">Add New Bulk Commodity Listing</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-900">✕</button>
            </div>

            {addedSuccess ? (
              <div className="py-8 text-center space-y-2 text-emerald-600">
                <CheckCircle2 className="w-12 h-12 mx-auto" />
                <div className="text-lg font-bold">Commodity & Photo Published to Marketplace!</div>
              </div>
            ) : (
              <form onSubmit={handleAddProduct} className="space-y-4 text-xs font-medium">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Commodity Title:</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sharp River Sand (20-Ton Dump Load)"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-sm font-semibold"
                  />
                </div>

                {/* NON-TECHNICAL COMMODITY PHOTO UPLOAD & PRESETS */}
                <div className="space-y-3 p-3 bg-slate-50 rounded-2xl border border-slate-200">
                  <label className="block text-slate-900 font-bold text-xs">
                    Commodity Photo (Snap Camera, Upload File, or Select Preset):
                  </label>

                  {/* Upload & Snap Buttons */}
                  <div className="grid grid-cols-2 gap-2">
                    <label className="py-2.5 px-3 rounded-xl bg-white border border-slate-300 hover:border-[#0038A8] text-slate-800 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-sm transition-all">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleSellerPhotoUpload}
                      />
                      <Upload className="w-4 h-4 text-[#0038A8]" />
                      <span>Upload from Gallery</span>
                    </label>

                    <label className="py-2.5 px-3 rounded-xl bg-white border border-slate-300 hover:border-[#0038A8] text-slate-800 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-sm transition-all">
                      <input
                        type="file"
                        accept="image/*"
                        capture="environment"
                        className="hidden"
                        onChange={handleSellerPhotoUpload}
                      />
                      <Camera className="w-4 h-4 text-[#0038A8]" />
                      <span>Snap Camera Photo</span>
                    </label>
                  </div>

                  {/* Selected Preview badge if custom upload */}
                  {customImagePreview && (
                    <div className="flex items-center gap-3 p-2 bg-emerald-50 rounded-xl border border-emerald-200 text-xs">
                      <img src={customImagePreview} alt="Uploaded preview" className="w-12 h-12 object-cover rounded-lg border border-emerald-300" />
                      <div className="space-y-0.5">
                        <div className="font-bold text-emerald-900">Custom Photo Attached</div>
                        <div className="text-[10px] text-emerald-700">✓ Ready to publish to marketplace</div>
                      </div>
                    </div>
                  )}

                  {/* Preset Images Grid */}
                  <div>
                    <div className="text-[11px] font-bold text-slate-500 mb-1.5 uppercase">Or Select Sample Preset Image:</div>
                    <div className="grid grid-cols-3 gap-2">
                      {imagePresets.map((img) => (
                        <button
                          key={img.label}
                          type="button"
                          onClick={() => {
                            setSelectedImage(img.url);
                            setCustomImagePreview(null);
                          }}
                          className={`p-1.5 rounded-xl border text-left transition-all space-y-1 ${
                            selectedImage === img.url && !customImagePreview
                              ? 'bg-blue-50 border-[#0038A8] ring-2 ring-[#0038A8]/20'
                              : 'bg-white border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <img src={img.url} alt={img.label} className="w-full h-12 object-cover rounded-lg" />
                          <div className="text-[10px] font-bold text-slate-800 text-center line-clamp-1">{img.label}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Quarry Gate Price (₦):</label>
                    <input
                      type="number"
                      required
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-300 text-sm font-bold text-[#0038A8]"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Unit Label:</label>
                    <input
                      type="text"
                      required
                      value={unit}
                      onChange={(e) => setUnit(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-300 text-sm font-semibold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Available Yard Stock:</label>
                    <input
                      type="number"
                      required
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-300 text-sm font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Depot / Quarry Location:</label>
                    <input
                      type="text"
                      required
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-300 text-sm font-semibold"
                    />
                  </div>
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="w-1/2 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-1/2 py-2.5 rounded-xl bg-[#0038A8] text-white font-bold shadow-sm"
                  >
                    Publish Listing & Image
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}

export default SellerYardView;
