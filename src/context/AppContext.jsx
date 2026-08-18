import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

// Sample Initial Products Catalog for Heavy Goods
const INITIAL_PRODUCTS = [
  {
    id: 'prod-1',
    title: 'Elephant Bulk Cement (50kg Bags / Palletized)',
    category: 'Bulk Cement',
    seller: 'Lafarge Africa Depot',
    sellerLocation: 'Ewekoro Yard, Ogun State',
    sellerVerified: true,
    pricePerUnit: 4800,
    unit: '50kg Bag',
    minOrderQty: 100,
    stockQty: 15000,
    rating: 4.9,
    reviewsCount: 142,
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80',
    description: 'Grade 42.5N Ordinary Portland Cement ideal for structural foundations, high-rise construction, and precast concrete works.',
    pickupAvailable: true,
    truckDeliveryAvailable: true,
    specifications: {
      grade: '42.5N Standard',
      packaging: '50kg Moisture-Proof Poly-Bags',
      loadingBay: 'Bay #4 Automated Crane Loading',
    },
  },
  {
    id: 'prod-2',
    title: 'Washed Sharp Sand (20-Ton Tipper Load)',
    category: 'Sand & Aggregate',
    seller: 'Ogun River Dredging Co.',
    sellerLocation: 'Ikorodu Dredging Site, Lagos',
    sellerVerified: true,
    pricePerUnit: 14500,
    unit: 'Ton',
    minOrderQty: 20,
    stockQty: 850,
    rating: 4.8,
    reviewsCount: 98,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    description: 'Clean silt-free river sharp sand tested for high-strength concrete mix, plastering, and block moulding.',
    pickupAvailable: true,
    truckDeliveryAvailable: true,
    specifications: {
      siltContent: '< 1.5%',
      density: '1.6 Tons / m³',
      loadingBay: 'Dredge Discharge Pipe #2',
    },
  },
  {
    id: 'prod-3',
    title: '3/4 inch Clean Granite Stones (30-Ton Load)',
    category: 'Granite & Gravel',
    seller: 'Crushed Rock Quarries Ltd',
    sellerLocation: 'Abeokuta Quarry Hub, Ogun',
    sellerVerified: true,
    pricePerUnit: 18200,
    unit: 'Ton',
    minOrderQty: 30,
    stockQty: 2400,
    rating: 4.95,
    reviewsCount: 210,
    image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80',
    description: 'High-density crushed granite aggregate ideal for road construction, slab casting, and heavy foundation works.',
    pickupAvailable: true,
    truckDeliveryAvailable: true,
    specifications: {
      sizeFraction: '20mm (3/4")',
      crushingValue: '< 22%',
      loadingBay: 'Quarry Belt Conveyor #1',
    },
  },
  {
    id: 'prod-4',
    title: 'Northern Yellow Maize Grains (Bulk 100kg Bags)',
    category: 'Grains & Agriculture',
    seller: 'Kano Grain Silos & Mills',
    sellerLocation: 'Dawanau Grain Market, Kano',
    sellerVerified: true,
    pricePerUnit: 62000,
    unit: '100kg Bag',
    minOrderQty: 50,
    stockQty: 3200,
    rating: 4.75,
    reviewsCount: 86,
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80',
    description: 'Dry sun-cured yellow corn with moisture content below 12%. Suitable for commercial livestock feed production and industrial milling.',
    pickupAvailable: true,
    truckDeliveryAvailable: true,
    specifications: {
      moistureContent: '11.5%',
      purity: '99.1%',
      loadingBay: 'Silo Discharge Chute #3',
    },
  },
  {
    id: 'prod-5',
    title: 'High-Yield TMT Steel Rebar (16mm Bars / Ton)',
    category: 'Rebar & Steel',
    seller: 'Dangote Steel Rolling Mill',
    sellerLocation: 'Ibeju-Lekki Industrial Zone, Lagos',
    sellerVerified: true,
    pricePerUnit: 980000,
    unit: 'Ton',
    minOrderQty: 5,
    stockQty: 450,
    rating: 4.9,
    reviewsCount: 175,
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
    description: 'Thermo-Mechanically Treated Fe-500 high-tensile steel reinforcing bars for seismic-resistant structural frames and bridge girders.',
    pickupAvailable: true,
    truckDeliveryAvailable: true,
    specifications: {
      grade: 'Fe-500 Standard',
      diameter: '16mm Nominal',
      barLength: '12 Meters',
    },
  },
  {
    id: 'prod-6',
    title: 'Stone Dust Aggregate (Self-Compacting)',
    category: 'Granite & Gravel',
    seller: 'Ratcon Quarry & Infrastructure',
    sellerLocation: 'Ibadan North Quarry, Oyo State',
    sellerVerified: true,
    pricePerUnit: 9500,
    unit: 'Ton',
    minOrderQty: 25,
    stockQty: 1800,
    rating: 4.8,
    reviewsCount: 64,
    image: 'https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?auto=format&fit=crop&w=800&q=80',
    description: 'Fine crushed granite dust aggregate for interlock paving stone manufacturing, block production, and cable trench bedding.',
    pickupAvailable: true,
    truckDeliveryAvailable: true,
    specifications: {
      particleSize: '0-4mm Fine Dust',
      compactionRatio: 'High',
      loadingBay: 'Crushing Plant #2',
    },
  },
];

// User Profiles Data
const INITIAL_PROFILES = {
  buyer: {
    role: 'buyer',
    name: 'Julius Berger Site Operations',
    contactPerson: 'Engr. Chukwuma Adebayo',
    email: 'c.adebayo@juliusberger-sites.ng',
    phone: '+234 803 445 9912',
    cacReg: 'RC-1849204',
    siteAddress: 'Plot 14B, Commercial Zone, Lekki Phase 1, Lagos',
    escrowTier: 'Tier-1 Verified Corporate Buyer',
    settlementBank: 'Access Bank PLC (Acct: ****8821)',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
  },
  seller: {
    role: 'seller',
    name: 'Lafarge Africa Depot Yard',
    contactPerson: 'Alhaji Garba Sanusi (Yard Director)',
    email: 'g.sanusi@lafarge-depot.ng',
    phone: '+234 802 114 8830',
    quarryLicense: 'QL-OGUN-2024-991',
    yardLocation: 'Ewekoro Quarry Zone, Km 32 Lagos-Abeokuta Expressway',
    sellerVerified: true,
    settlementBank: 'Zenith Bank PLC (Acct: ****3391)',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80',
  },
  trucker: {
    role: 'trucker',
    name: 'Musa Ibrahim (Heavy Transporter)',
    contactPerson: 'Musa Ibrahim',
    email: 'musa.ibrahim@transhaul.ng',
    phone: '+234 813 990 1204',
    nin: 'NIN-77401928401',
    truckType: '30-Ton SinoTruck Heavy Tipper',
    plateNumber: 'KJA-992-XA',
    frscClearance: 'FRSC-VALID-2026',
    currentLocation: 'Ibese Quarry Zone, Ogun State',
    activeRoute: 'Abeokuta → Lagos Corridor',
    walletBalance: 345000,
    settlementBank: 'First Bank PLC (Acct: ****4419)',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  },
};

// Initial Available Truckers
const INITIAL_TRUCKERS = [
  {
    id: 'trucker-1',
    driverName: 'Musa Ibrahim',
    company: 'Musa Heavy Freight Lines',
    rating: 4.9,
    completedTrips: 340,
    truckType: '30-Ton Heavy Tipper Truck',
    plateNumber: 'KJA-992-XA',
    currentLocation: 'Ibese Quarry Zone, Ogun State',
    proximity: '3.2 km',
    status: 'Ready for Loading',
    ratePerKm: 1800,
    gitInsured: true,
    isBackhaul: true,
    capacity: '30 Tons',
  },
  {
    id: 'trucker-2',
    driverName: 'Suleiman Ibrahim',
    company: 'Express Logistics Ltd',
    rating: 4.85,
    completedTrips: 210,
    truckType: '45-Ton Flatbed Trailer',
    plateNumber: 'LSD-912-YY',
    currentLocation: 'Apapa Port Corridor, Lagos',
    proximity: '8.5 km',
    status: 'Available Nearby',
    ratePerKm: 1600,
    gitInsured: true,
    isBackhaul: false,
    capacity: '45 Tons',
  },
  {
    id: 'trucker-3',
    driverName: 'Emeka Nwosu',
    company: 'Trans-Niger Haulage',
    rating: 4.95,
    completedTrips: 512,
    truckType: '20-Ton Tri-Axle Tipper',
    plateNumber: 'OG-331-AB',
    currentLocation: 'Ibadan Commercial Hub, Oyo',
    proximity: '14.1 km',
    status: 'En-Route Return Trip',
    ratePerKm: 1350,
    gitInsured: true,
    isBackhaul: true,
    capacity: '20 Tons',
  },
];

export function AppProvider({ children }) {
  // Navigation & Role State
  const [currentView, setCurrentView] = useState('landing');
  const [userRole, setUserRole] = useState('buyer');

  // Profiles State
  const [profiles, setProfiles] = useState(INITIAL_PROFILES);
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  // Products Catalog State
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Active Order & Escrow State
  const [activeOrder, setActiveOrder] = useState({
    id: 'OG-892401',
    product: INITIAL_PRODUCTS[0],
    quantity: 100,
    fulfillmentType: 'delivery',
    commodityTotal: 480000,
    freightTotal: 117000,
    escrowFee: 8955,
    grandTotal: 605955,
    trucker: INITIAL_TRUCKERS[0],
    origin: 'Ewekoro Yard, Ogun State',
    destination: 'Site B4, Lekki Phase 1, Lagos',
    status: 'Escrow Locked & Funded',
    escrowStage: 3,
    dispatchTime: '2026-08-18 08:30 AM',
    etaRemaining: '4h 15m',
    trackingCode: 'TRK-992-01A',
  });

  // Complete Bidirectional Negotiation State
  const [negotiations, setNegotiations] = useState([
    {
      id: 'neg-101',
      type: 'commodity',
      productName: 'Elephant Bulk Cement (50kg Bags)',
      buyerName: 'Julius Berger Site Operations',
      sellerName: 'Lafarge Africa Depot',
      originalPrice: 4800,
      offeredPrice: 4450,
      quantity: 500,
      unit: '50kg Bag',
      status: 'pending_seller', // 'pending_seller' | 'pending_buyer' | 'accepted' | 'declined'
      sellerNote: 'Requesting volume discount for 500 bags order.',
      history: [
        { sender: 'buyer', price: 4450, note: 'Requesting volume discount for 500 bags order.', time: 'Today 09:15 AM' },
      ],
      date: '2026-08-18 09:15 AM',
    },
    {
      id: 'neg-102',
      type: 'freight',
      productName: 'Haulage: Abeokuta to Ibadan (30-Ton Granite)',
      buyerName: 'Dapo Construction Co.',
      sellerName: 'Musa Ibrahim (Transporter)',
      originalPrice: 120000,
      offeredPrice: 105000,
      quantity: 30,
      unit: 'Ton',
      status: 'accepted',
      sellerNote: 'Matched with backhaul return journey.',
      history: [
        { sender: 'buyer', price: 105000, note: 'Matched with backhaul return journey.', time: 'Today 08:00 AM' },
        { sender: 'trucker', price: 105000, note: 'Accepted backhaul rate discount.', time: 'Today 08:15 AM' },
      ],
      date: '2026-08-18 08:00 AM',
    },
  ]);

  // Truckers List & Live Proximity Config
  const [truckers, setTruckers] = useState(INITIAL_TRUCKERS);
  const [truckerState, setTruckerState] = useState({
    currentLocation: 'Ibese Quarry Zone, Ogun State',
    activeRoute: 'Abeokuta → Lagos Corridor',
    isBackhaulEnabled: true,
  });

  // Helper Functions
  const navigateTo = (view) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const switchRole = (role) => {
    setUserRole(role);
    if (role === 'seller') setCurrentView('seller_portal');
    else if (role === 'trucker') setCurrentView('trucker_portal');
    else if (currentView === 'seller_portal' || currentView === 'trucker_portal') {
      setCurrentView('marketplace');
    }
  };

  const startNegotiation = (newNeg) => {
    setNegotiations((prev) => [newNeg, ...prev]);
  };

  const respondNegotiation = (id, status) => {
    setNegotiations((prev) =>
      prev.map((neg) => {
        if (neg.id === id) {
          const updated = { ...neg, status };
          // If accepted, update active order pricing
          if (status === 'accepted') {
            setActiveOrder((order) => ({
              ...order,
              commodityTotal: neg.offeredPrice * neg.quantity,
              grandTotal: neg.offeredPrice * neg.quantity + (order.freightTotal || 0) + Math.round((neg.offeredPrice * neg.quantity + (order.freightTotal || 0)) * 0.015),
            }));
          }
          return updated;
        }
        return neg;
      })
    );
  };

  const counterNegotiation = (id, counterPrice, note, senderRole) => {
    setNegotiations((prev) =>
      prev.map((neg) => {
        if (neg.id === id) {
          const nextStatus = senderRole === 'seller' || senderRole === 'trucker' ? 'pending_buyer' : 'pending_seller';
          const newHistory = [
            ...(neg.history || []),
            { sender: senderRole, price: Number(counterPrice), note, time: 'Just now' },
          ];
          return {
            ...neg,
            offeredPrice: Number(counterPrice),
            status: nextStatus,
            sellerNote: note,
            history: newHistory,
          };
        }
        return neg;
      })
    );
  };

  const updateTruckerLocation = (newLocation, newRoute, isBackhaul) => {
    setTruckerState({
      currentLocation: newLocation,
      activeRoute: newRoute,
      isBackhaulEnabled: isBackhaul,
    });

    setTruckers((prev) =>
      prev.map((t) => {
        if (t.id === 'trucker-1') {
          return {
            ...t,
            currentLocation: newLocation,
            isBackhaul: isBackhaul,
            proximity: '1.5 km',
          };
        }
        return t;
      })
    );
  };

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        navigateTo,
        userRole,
        setUserRole,
        switchRole,
        profiles,
        setProfiles,
        profileModalOpen,
        setProfileModalOpen,
        products,
        setProducts,
        selectedProduct,
        setSelectedProduct,
        activeOrder,
        setActiveOrder,
        negotiations,
        startNegotiation,
        respondNegotiation,
        counterNegotiation,
        truckers,
        setTruckers,
        truckerState,
        updateTruckerLocation,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
