import React, { useState } from 'react';
import { X, MessageSquare, CheckCircle2, ShieldCheck, ArrowRight, DollarSign, AlertCircle, RefreshCw, Send, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';

export function NegotiationModal({ product, onClose }) {
  const { startNegotiation, counterNegotiation, respondNegotiation, userRole } = useApp();

  if (!product) return null;

  const [counterPrice, setCounterPrice] = useState(Math.round(product.pricePerUnit * 0.92));
  const [quantity, setQuantity] = useState(product.minOrderQty || 100);
  const [buyerNote, setBuyerNote] = useState('Requesting volume discount for multi-ton site delivery.');
  const [submitted, setSubmitted] = useState(false);

  const discountPercent = Math.round(((product.pricePerUnit - counterPrice) / product.pricePerUnit) * 100);

  const handleSubmit = (e) => {
    e.preventDefault();
    startNegotiation({
      id: `neg-${Date.now().toString().slice(-4)}`,
      type: 'commodity',
      productName: product.title,
      buyerName: 'Commercial Buyer (Your Account)',
      sellerName: product.seller,
      originalPrice: product.pricePerUnit,
      offeredPrice: counterPrice,
      quantity: quantity,
      unit: product.unit,
      status: 'pending_seller',
      sellerNote: buyerNote,
      history: [
        { sender: 'buyer', price: counterPrice, note: buyerNote, time: 'Just now' },
      ],
      date: new Date().toLocaleString(),
    });
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-lg rounded-3xl border border-slate-200 shadow-2xl overflow-hidden my-8 relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-[#0B0E14] text-white p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#0038A8] text-white">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Bargain / Make an Offer</h3>
              <p className="text-xs text-slate-400">Offer a lower price directly to the supplier</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h4 className="text-xl font-extrabold text-slate-900">
              Counter-Offer Sent to Seller Yard!
            </h4>

            <p className="text-sm text-slate-600 max-w-sm mx-auto">
              Your offer of <span className="font-bold text-[#0038A8]">₦{counterPrice.toLocaleString()} / {product.unit}</span> ({discountPercent}% discount) has been transmitted to <span className="font-bold text-slate-800">{product.seller}</span>.
            </p>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600 space-y-1">
              <div className="flex justify-between">
                <span>Negotiation Status:</span>
                <span className="font-bold text-amber-600">Pending Seller Review</span>
              </div>
              <div className="flex justify-between">
                <span>Escrow Hold Policy:</span>
                <span className="font-bold text-emerald-600">Locked Upon Mutual Agreement</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-[#0038A8] text-white text-sm font-bold shadow-md"
            >
              Return to Marketplace
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            
            {/* Product Summary */}
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center gap-3">
              <img
                src={product.image}
                alt={product.title}
                className="w-12 h-12 rounded-xl object-cover"
              />
              <div className="text-xs">
                <div className="font-bold text-slate-900 line-clamp-1">{product.title}</div>
                <div className="text-slate-500">Seller: {product.seller}</div>
                <div className="text-slate-700 font-semibold mt-0.5">
                  Quarry Gate List Price: <span className="text-[#0038A8]">₦{product.pricePerUnit.toLocaleString()}</span> / {product.unit}
                </div>
              </div>
            </div>

            {/* Inputs */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Your Proposed Offer Price per {product.unit} (₦):
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={counterPrice}
                    onChange={(e) => setCounterPrice(parseInt(e.target.value) || 0)}
                    className="w-full pl-4 pr-16 py-2.5 rounded-xl border border-slate-300 text-base font-extrabold text-slate-900 focus:ring-2 focus:ring-[#0038A8]"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                    -{discountPercent}%
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Order Volume Quantity ({product.unit}s):
                </label>
                <input
                  type="number"
                  min={product.minOrderQty || 1}
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || (product.minOrderQty || 1))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-[#0038A8]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Note to Seller / Transporter Dispatcher:
                </label>
                <textarea
                  rows={3}
                  value={buyerNote}
                  onChange={(e) => setBuyerNote(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-300 text-xs font-medium text-slate-900 focus:ring-2 focus:ring-[#0038A8]"
                  placeholder="Explain volume requirements, site timeline, or delivery schedule..."
                />
              </div>
            </div>

            {/* Calculation readout */}
            <div className="p-4 bg-slate-900 text-white rounded-2xl space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Original List Total:</span>
                <span className="line-through text-slate-400">₦{(quantity * product.pricePerUnit).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300 font-semibold">Proposed Counter-Offer Total:</span>
                <span className="text-base font-extrabold text-[#FF5500]">
                  ₦{(quantity * counterPrice).toLocaleString()}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="w-1/2 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="w-1/2 py-3 rounded-xl bg-[#0038A8] hover:bg-blue-900 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md"
              >
                Submit Offer
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}

export default NegotiationModal;
