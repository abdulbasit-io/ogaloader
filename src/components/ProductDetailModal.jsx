import React, { useState } from 'react';
import { X, ShieldCheck, MapPin, Truck, Package, MessageSquare, ArrowRight, CheckCircle2, Clock, Info } from 'lucide-react';
import { useApp } from '../context/AppContext';

export function ProductDetailModal({ product, onClose, onOpenNegotiation }) {
  const { navigateTo, setActiveOrder, setSelectedProduct } = useApp();
  
  if (!product) return null;

  const [quantity, setQuantity] = useState(product.minOrderQty);
  const [fulfillmentType, setFulfillmentType] = useState('delivery'); // 'delivery' | 'pickup'
  const [deliveryDestination, setDeliveryDestination] = useState('Site B4, Lekki Phase 1, Lagos');

  // Pricing math
  const estimatedKm = 65; // Estimated transit distance in km
  const commodityTotal = quantity * product.pricePerUnit;
  const freightRatePerKm = product.category === 'Bulk Cement' ? 1250 : 1600;
  const freightTotal = fulfillmentType === 'delivery' ? estimatedKm * freightRatePerKm : 0;
  const escrowFee = Math.round((commodityTotal + freightTotal) * 0.015);
  const grandTotal = commodityTotal + freightTotal + escrowFee;

  const handleProceedToCheckout = () => {
    setActiveOrder((prev) => ({
      ...prev,
      product: product,
      quantity: quantity,
      fulfillmentType: fulfillmentType,
      commodityTotal: commodityTotal,
      freightTotal: freightTotal,
      escrowFee: escrowFee,
      grandTotal: grandTotal,
      origin: product.sellerLocation,
      destination: deliveryDestination,
      status: 'Escrow Funded',
      escrowStage: 1,
    }));

    onClose();
    if (fulfillmentType === 'delivery') {
      navigateTo('logistics');
    } else {
      navigateTo('transactions');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="bg-white w-full max-w-3xl rounded-3xl border border-slate-200 shadow-2xl overflow-hidden my-8 relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header Bar */}
        <div className="bg-[#0B0E14] text-white p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-[#0038A8] text-white text-xs font-bold">
              {product.category}
            </span>
            <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-4 h-4" />
              Verified Yard Stock
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Main Info Header */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 h-52 bg-slate-100 rounded-2xl overflow-hidden border border-slate-200">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="md:col-span-7 space-y-3">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                <MapPin className="w-4 h-4 text-[#0038A8]" />
                <span>{product.sellerLocation}</span>
              </div>

              <h2 className="text-2xl font-extrabold text-slate-900 leading-tight">
                {product.title}
              </h2>

              <p className="text-slate-600 text-sm leading-relaxed">
                {product.description}
              </p>

              <div className="flex items-center gap-4 text-xs pt-2">
                <div className="font-bold text-slate-800">Supplier: <span className="text-[#0038A8]">{product.seller}</span></div>
                <div className="text-amber-600 font-bold">★ {product.rating} (Rating)</div>
              </div>
            </div>
          </div>

          {/* Fulfillment Mode Switcher */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center justify-between">
              <span>Select Fulfillment Method:</span>
              <span className="text-[#0038A8] font-bold">Step 1 of 2</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              
              {/* Option A: Delivery */}
              <button
                type="button"
                onClick={() => setFulfillmentType('delivery')}
                className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between space-y-2 ${
                  fulfillmentType === 'delivery'
                    ? 'bg-blue-50/80 border-[#0038A8] ring-2 ring-[#0038A8]/20'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-slate-900 flex items-center gap-2">
                    <Truck className="w-4 h-4 text-[#0038A8]" />
                    Matched Truck Delivery
                  </span>
                  {fulfillmentType === 'delivery' && (
                    <CheckCircle2 className="w-5 h-5 text-[#0038A8]" />
                  )}
                </div>
                <p className="text-xs text-slate-600">
                  Algorithmic dispatch of verified axle-load trucks directly to your construction site.
                </p>
              </button>

              {/* Option B: Self Pickup */}
              <button
                type="button"
                onClick={() => setFulfillmentType('pickup')}
                className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between space-y-2 ${
                  fulfillmentType === 'pickup'
                    ? 'bg-blue-50/80 border-[#0038A8] ring-2 ring-[#0038A8]/20'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-slate-900 flex items-center gap-2">
                    <Package className="w-4 h-4 text-[#FF5500]" />
                    Yard Self-Pickup (Free)
                  </span>
                  {fulfillmentType === 'pickup' && (
                    <CheckCircle2 className="w-5 h-5 text-[#0038A8]" />
                  )}
                </div>
                <p className="text-xs text-slate-600">
                  Send your own truck driver to loading bay with a digital QR loading code.
                </p>
              </button>

            </div>

            {fulfillmentType === 'delivery' && (
              <div className="pt-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Delivery Destination Site Address:
                </label>
                <input
                  type="text"
                  value={deliveryDestination}
                  onChange={(e) => setDeliveryDestination(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs font-medium text-slate-900 focus:ring-2 focus:ring-[#0038A8]"
                />
              </div>
            )}
          </div>

          {/* Quantity Selector */}
          <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200 gap-4">
            <div>
              <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Order Quantity ({product.unit}s)
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                Minimum order: {product.minOrderQty} {product.unit}s
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity((q) => Math.max(product.minOrderQty, q - 10))}
                className="w-9 h-9 rounded-xl bg-white border border-slate-200 text-slate-800 text-lg font-bold hover:bg-slate-100 flex items-center justify-center shadow-sm"
              >
                -
              </button>

              <input
                type="number"
                min={product.minOrderQty}
                value={quantity}
                onChange={(e) => setQuantity(Math.max(product.minOrderQty, parseInt(e.target.value) || product.minOrderQty))}
                className="w-24 px-3 py-1.5 rounded-xl border border-slate-200 text-center text-base font-extrabold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0038A8]"
              />

              <button
                onClick={() => setQuantity((q) => q + 10)}
                className="w-9 h-9 rounded-xl bg-white border border-slate-200 text-slate-800 text-lg font-bold hover:bg-slate-100 flex items-center justify-center shadow-sm"
              >
                +
              </button>
            </div>
          </div>

          {/* Price Breakdown Card */}
          <div className="bg-slate-900 text-white p-5 rounded-2xl space-y-3">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between border-b border-slate-800 pb-2">
              <span>Transparent Price Summary</span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Escrow Protected
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Commodity Subtotal ({quantity} x ₦{product.pricePerUnit.toLocaleString()}):</span>
                <span className="font-bold text-white">₦{commodityTotal.toLocaleString()}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-400">
                  Freight Haulage Rate ({fulfillmentType === 'delivery' ? `Estimated ${estimatedKm} km` : 'Yard Self-Pickup'}):
                </span>
                <span className="font-bold text-white">
                  {fulfillmentType === 'delivery' ? `₦${freightTotal.toLocaleString()}` : '₦0 (Free)'}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-400">Ogaloader Escrow & GIT Insurance Fee (1.5%):</span>
                <span className="font-bold text-emerald-400">₦{escrowFee.toLocaleString()}</span>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-baseline justify-between">
                <span className="text-sm font-bold text-white">Grand Total Escrow Lock:</span>
                <span className="text-2xl font-extrabold text-[#FF5500]">₦{grandTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer Actions */}
        <div className="p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={() => {
              onClose();
              onOpenNegotiation(product);
            }}
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold flex items-center justify-center gap-2 transition-all"
          >
            <MessageSquare className="w-4 h-4 text-slate-600" />
            Negotiate Unit Price
          </button>

          <button
            onClick={handleProceedToCheckout}
            className="w-full sm:w-auto px-7 py-3 rounded-xl bg-[#FF5500] hover:bg-[#E04B00] text-white text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-md shadow-[#FF5500]/20"
          >
            <span>Proceed to Freight & Escrow Lock</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}

export default ProductDetailModal;
