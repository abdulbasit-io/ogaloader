import React, { useState } from 'react';
import { Truck, Camera, MapPin, Navigation, ShieldCheck, CheckCircle2, ArrowRight, Zap, RefreshCw, Star, Info, Sliders, ChevronDown, Upload, Image, X, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';

export function LogisticsView({ onOpenNegotiation }) {
  const { truckers, activeOrder, setActiveOrder, navigateTo, snapLoad, setSnapLoad } = useApp();

  const [origin, setOrigin] = useState(activeOrder?.origin || 'Dangote Cement Depot, Ibese, Ogun State');
  const [destination, setDestination] = useState(activeOrder?.destination || 'Site B4, Lekki Phase 1, Lagos');
  const [cargoPreset, setCargoPreset] = useState('cement');
  const [selectedTrucker, setSelectedTrucker] = useState(truckers[0]);

  // Modal & Upload States
  const [showSnapModal, setShowSnapModal] = useState(false);
  const [activeTab, setActiveTab] = useState('upload'); // 'upload' | 'snap' | 'preset'
  const [customImagePreview, setCustomImagePreview] = useState(null);
  const [isScanning, setIsScanning] = useState(false);

  // AI Cargo Estimation Presets
  const cargoPresets = {
    cement: {
      title: 'Bulk Cement Bags (50kg x 600)',
      estWeight: '30 Tons',
      estVolume: '22 m³',
      recommendedTruck: '30T Heavy Tipper / Box Trailer',
      image: '/images/cement_bags.png',
    },
    sand: {
      title: 'Dredged Sharp Sand',
      estWeight: '20 Tons',
      estVolume: '15 m³',
      recommendedTruck: '20T Tri-Axle Tipper',
      image: '/images/sharp_sand.png',
    },
    granite: {
      title: 'Crushed Granite (3/4 Inch)',
      estWeight: '30 Tons',
      estVolume: '18 m³',
      recommendedTruck: '30T Tipper Truck',
      image: '/images/granite_stones.png',
    },
    rebar: {
      title: 'High-Yield Steel Rebar Bundles (16mm)',
      estWeight: '15 Tons',
      estVolume: '10 m³',
      recommendedTruck: '15T Extended Flatbed Trailer',
      image: '/images/steel_rebar.png',
    },
  };

  const handleSelectPreset = (key) => {
    setCargoPreset(key);
    const data = cargoPresets[key];
    setSnapLoad({
      imageUrl: data.image,
      title: data.title,
      estWeight: data.estWeight,
      estVolume: data.estVolume,
      recommendedTruck: data.recommendedTruck,
    });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCustomImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConfirmCustomUpload = () => {
    if (!customImagePreview) return;
    setIsScanning(true);
    setSnapLoad({
      imageUrl: customImagePreview,
      title: 'Custom Cargo Photo',
      estWeight: '25 Tons',
      estVolume: '18 m³',
      recommendedTruck: '25T Tri-Axle Heavy Tipper',
    });
    setTimeout(() => {
      setIsScanning(false);
      setShowSnapModal(false);
    }, 1000);
  };

  const handleBookTrucker = (trucker) => {
    setSelectedTrucker(trucker);
    const freightAmount = trucker.ratePerKm * 65;
    
    setActiveOrder((prev) => ({
      ...prev,
      trucker: trucker,
      freightTotal: freightAmount,
      grandTotal: (prev.commodityTotal || 1440000) + freightAmount + Math.round(((prev.commodityTotal || 1440000) + freightAmount) * 0.015),
      status: 'Escrow Funded',
      escrowStage: 2,
    }));

    navigateTo('transactions');
  };

  return (
    <div className="pt-28 pb-20 bg-[#F8FAFC] min-h-screen text-slate-900">
      
      {/* Top Banner */}
      <div className="bg-[#0B0E14] text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF5500]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Find Available Trucks
          </h1>
          <p className="text-slate-400 text-base max-w-3xl mt-2">
            Scan your load with your phone camera to know the right truck size, or choose from available verified drivers nearby. Save up to 35% by grabbing empty return trips.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* Step 1: AI Snap Your Load Estimator (Compressed Action Bar) */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-[#0038A8] text-white font-extrabold text-xs flex items-center justify-center">
                  1
                </span>
                <h2 className="text-xl font-extrabold text-slate-900">
                  Snap Your Load (AI Cargo Estimator)
                </h2>
              </div>
              <p className="text-slate-500 text-xs mt-1">
                Snap or upload a cargo photo to estimate axle payload weight, volume, and exact vehicle specification.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-50 text-purple-700 text-xs font-bold border border-purple-200">
                <Zap className="w-4 h-4 text-purple-600" />
                Computer Vision Axle Active
              </div>

              <button
                onClick={() => setShowSnapModal(true)}
                className="px-5 py-3 rounded-xl bg-[#0038A8] hover:bg-blue-900 text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all"
              >
                <Camera className="w-4 h-4" /> Snap / Upload Cargo Photo
              </button>
            </div>
          </div>

          {/* AI Scan Analysis Readout */}
          <div className="bg-slate-900 text-white p-6 rounded-2xl grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-4 h-40 rounded-xl overflow-hidden relative border border-slate-700">
              <img
                src={snapLoad?.imageUrl || cargoPresets[cargoPreset].image}
                alt="Selected Cargo"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-blue-500/20 backdrop-blur-[1px] flex items-center justify-center">
                <span className="px-3 py-1 bg-black/80 rounded-full text-[10px] font-mono text-emerald-400 border border-emerald-500/50">
                  {isScanning ? 'AI SCANNING CARGO...' : 'AI SCAN COMPLETED'}
                </span>
              </div>
            </div>

            <div className="md:col-span-8 space-y-3 text-xs">
              <div className="flex items-center justify-between text-slate-400 font-bold uppercase tracking-wider">
                <span>AI Load Analysis Metrics:</span>
                <span className="text-[#FF5500] text-[11px] normal-case font-bold">
                  Cargo: {snapLoad?.title || cargoPresets[cargoPreset].title}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                  <div className="text-slate-400 text-[10px]">ESTIMATED PAYLOAD WEIGHT:</div>
                  <div className="text-lg font-extrabold text-white mt-1">
                    {snapLoad?.estWeight || cargoPresets[cargoPreset].estWeight}
                  </div>
                </div>

                <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                  <div className="text-slate-400 text-[10px]">ESTIMATED CUBIC VOLUME:</div>
                  <div className="text-lg font-extrabold text-blue-400 mt-1">
                    {snapLoad?.estVolume || cargoPresets[cargoPreset].estVolume}
                  </div>
                </div>

                <div className="col-span-2 sm:col-span-1 bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                  <div className="text-slate-400 text-[10px]">RECOMMENDED TRUCK SPEC:</div>
                  <div className="text-xs font-bold text-orange-400 mt-1">
                    {snapLoad?.recommendedTruck || cargoPresets[cargoPreset].recommendedTruck}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-2 text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Compliant with Federal Road Safety Corps (FRSC) axle load regulations.</span>
                </div>

                <button
                  onClick={() => setShowSnapModal(true)}
                  className="text-xs font-bold text-blue-400 hover:text-blue-300 underline flex items-center gap-1"
                >
                  <Camera className="w-3.5 h-3.5" /> Change Cargo Photo
                </button>
              </div>
            </div>
          </div>

        </div>

      {/* Snap / Upload Cargo Modal */}
      {showSnapModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 space-y-6 shadow-2xl animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                  <Camera className="w-5 h-5 text-[#0038A8]" />
                  Snap or Upload Cargo Photo
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Take a photo directly with your camera, upload from your gallery, or choose a sample preset.
                </p>
              </div>
              <button
                onClick={() => setShowSnapModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Tabs */}
            <div className="flex gap-2 p-1 bg-slate-100 rounded-2xl text-xs font-bold">
              <button
                onClick={() => setActiveTab('upload')}
                className={`flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'upload' ? 'bg-white text-[#0038A8] shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Upload className="w-4 h-4" /> Upload from Gallery
              </button>
              <button
                onClick={() => setActiveTab('snap')}
                className={`flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'snap' ? 'bg-white text-[#0038A8] shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Camera className="w-4 h-4" /> Snap Camera Photo
              </button>
              <button
                onClick={() => setActiveTab('preset')}
                className={`flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'preset' ? 'bg-white text-[#0038A8] shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Image className="w-4 h-4" /> Sample Presets
              </button>
            </div>

            {/* Tab 1: Upload from Gallery */}
            {activeTab === 'upload' && (
              <div className="space-y-4">
                <label className="border-2 border-dashed border-slate-300 hover:border-[#0038A8] bg-slate-50 hover:bg-blue-50/50 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all text-center space-y-3">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                  <div className="w-12 h-12 rounded-2xl bg-blue-100 text-[#0038A8] flex items-center justify-center">
                    <Upload className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">Click to upload cargo photo</div>
                    <div className="text-xs text-slate-500 mt-1">Supports PNG, JPG, WEBP from your phone or device gallery</div>
                  </div>
                </label>

                {customImagePreview && (
                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center gap-4">
                    <img src={customImagePreview} alt="Preview" className="w-20 h-20 object-cover rounded-xl border" />
                    <div className="text-xs space-y-1">
                      <div className="font-bold text-slate-900">Selected Custom Photo</div>
                      <div className="text-emerald-600 font-bold">✓ Ready for AI Axle Estimation Scan</div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Tab 2: Snap Camera Photo */}
            {activeTab === 'snap' && (
              <div className="space-y-4 text-center">
                <div className="relative bg-slate-900 h-64 rounded-2xl overflow-hidden flex flex-col items-center justify-center text-white border border-slate-800">
                  {customImagePreview ? (
                    <img src={customImagePreview} alt="Camera Snap" className="w-full h-full object-cover" />
                  ) : (
                    <div className="space-y-3 p-4">
                      <div className="w-14 h-14 rounded-full bg-slate-800 border-2 border-blue-500 flex items-center justify-center mx-auto text-blue-400 animate-pulse">
                        <Camera className="w-7 h-7" />
                      </div>
                      <div className="text-sm font-bold text-slate-200">Camera Viewfinder Ready</div>
                      <div className="text-xs text-slate-400 max-w-xs mx-auto">
                        Point your camera at the loaded material pile or truck bed.
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex gap-3">
                  <label className="flex-1 py-3 bg-[#0038A8] hover:bg-blue-900 text-white rounded-xl font-bold text-xs cursor-pointer flex items-center justify-center gap-2 shadow-md">
                    <input type="file" accept="image/*" capture="environment" className="hidden" onChange={handleFileUpload} />
                    <Camera className="w-4 h-4" /> Trigger Shutter Snap
                  </label>
                </div>
              </div>
            )}

            {/* Tab 3: Sample Presets */}
            {activeTab === 'preset' && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {Object.keys(cargoPresets).map((key) => (
                  <button
                    key={key}
                    onClick={() => {
                      handleSelectPreset(key);
                      setShowSnapModal(false);
                    }}
                    className={`p-3 rounded-2xl border text-left transition-all space-y-2 ${
                      cargoPreset === key
                        ? 'bg-blue-50 border-[#0038A8] ring-2 ring-[#0038A8]/20'
                        : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <img
                      src={cargoPresets[key].image}
                      alt={cargoPresets[key].title}
                      className="w-full h-24 object-cover rounded-xl"
                    />
                    <div className="text-xs font-bold text-slate-900 line-clamp-1">
                      {cargoPresets[key].title}
                    </div>
                  </button>
                ))}
              </div>
            )}

            {activeTab !== 'preset' && customImagePreview && (
              <div className="pt-2">
                <button
                  onClick={handleConfirmCustomUpload}
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4" /> Confirm Photo & Run AI Scan
                </button>
              </div>
            )}

          </div>
        </div>
      )}

        {/* Step 2: Route & Proximity Distance Matcher */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
          
          <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
            <span className="w-7 h-7 rounded-full bg-[#0038A8] text-white font-extrabold text-xs flex items-center justify-center">
              2
            </span>
            <h2 className="text-xl font-extrabold text-slate-900">
              Origin & Destination Route Configurator
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#0038A8]" />
                Pickup Location (Quarry Gate / Depot):
              </label>
              <input
                type="text"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-[#0038A8]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <Navigation className="w-4 h-4 text-[#FF5500]" />
                Delivery Site Location:
              </label>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-[#0038A8]"
              />
            </div>

          </div>

        </div>

        {/* Step 3: Available Truckers & En-route Backhaul Matcher */}
        <div className="space-y-4">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-[#0038A8] text-white font-extrabold text-xs flex items-center justify-center">
                  3
                </span>
                <h2 className="text-2xl font-extrabold text-slate-900">
                  Available Transporters & Return-Leg Backhaulers
                </h2>
              </div>
              <p className="text-slate-500 text-xs mt-1">
                Select a verified trucker for immediate loading or grab a discounted empty backhaul trip.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {truckers.length} Verified Drivers Near Route
              </span>
            </div>
          </div>

          {/* Trucker Cards List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {truckers.map((trucker) => {
              const estimatedFreight = trucker.ratePerKm * 65;

              return (
                <div
                  key={trucker.id}
                  className={`bg-white rounded-3xl border shadow-sm p-6 flex flex-col justify-between space-y-4 relative transition-all duration-200 hover:-translate-y-1 ${
                    trucker.isBackhaul
                      ? 'border-emerald-300 ring-2 ring-emerald-500/20'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {/* Backhaul Badge */}
                  {trucker.isBackhaul && (
                    <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-emerald-600 text-white text-[10px] font-extrabold uppercase tracking-wider shadow-sm flex items-center gap-1">
                      <Zap className="w-3 h-3" />
                      35% Backhaul Discount
                    </div>
                  )}

                  <div className="space-y-3">
                    
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white font-extrabold flex items-center justify-center text-sm shadow-md">
                        {trucker.driverName.split(' ')[0][0]}
                        {trucker.driverName.split(' ')[1]?.[0]}
                      </div>

                      <div>
                        <h3 className="text-base font-extrabold text-slate-900">
                          {trucker.driverName}
                        </h3>
                        <div className="text-xs text-slate-500 font-medium">
                          {trucker.company}
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-2xl text-xs space-y-1.5 text-slate-700">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Truck Spec:</span>
                        <span className="font-bold text-slate-900">{trucker.truckType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Payload Capacity:</span>
                        <span className="font-bold text-slate-900">{trucker.capacity}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Proximity Distance:</span>
                        <span className="font-bold text-[#0038A8]">{trucker.proximity} away</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Plate Number:</span>
                        <span className="font-mono font-bold text-slate-800">{trucker.plateNumber}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-1">
                      <div className="flex items-center gap-1 text-amber-600 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                        {trucker.rating} <span className="text-slate-400">({trucker.completedTrips} trips)</span>
                      </div>
                      <div className="text-slate-500 font-medium">
                        {trucker.status}
                      </div>
                    </div>

                  </div>

                  <div className="pt-4 border-t border-slate-100 space-y-3">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <div className="text-xs text-slate-400 font-semibold">Estimated Freight (65km):</div>
                        <div className="text-2xl font-extrabold text-[#0038A8]">
                          ₦{estimatedFreight.toLocaleString()}
                        </div>
                      </div>
                      <div className="text-xs text-slate-500 font-semibold">
                        ₦{trucker.ratePerKm}/km
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => onOpenNegotiation?.({
                          id: trucker.id,
                          title: `Haulage: ${trucker.driverName} (${trucker.truckType})`,
                          seller: trucker.company,
                          pricePerUnit: estimatedFreight,
                          unit: 'Job Trip',
                          minOrderQty: 1,
                          image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=600&q=80',
                        })}
                        className="py-3 px-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold text-center transition-all"
                      >
                        Negotiate Rate
                      </button>

                      <button
                        onClick={() => handleBookTrucker(trucker)}
                        className={`py-3 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-all shadow-sm ${
                          trucker.isBackhaul
                            ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                            : 'bg-[#FF5500] hover:bg-[#E04B00] text-white'
                        }`}
                      >
                        <span>Book & Fund</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </div>
  );
}

export default LogisticsView;
