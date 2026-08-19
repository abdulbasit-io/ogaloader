import React, { useState } from 'react';
import { Search, Filter, ShoppingBag, ShieldCheck, MapPin, Truck, ChevronRight, SlidersHorizontal, ArrowUpRight, MessageSquare, Check, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export function CommodityMarketplace({ onOpenProductDetail, onOpenNegotiation }) {
  const { products, setSelectedProduct, navigateTo } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Commodities');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [sortBy, setSortBy] = useState('featured');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const categories = [
    'All Commodities',
    'Bulk Cement',
    'Sand & Aggregate',
    'Granite & Gravel',
    'Grains & Agriculture',
    'Rebar & Steel',
  ];

  const locations = [
    'All Locations',
    'Lagos',
    'Ogun',
    'Kano',
    'Ibadan',
  ];

  // Filter & Sort Logic
  const filteredProducts = products.filter((prod) => {
    const matchesCategory =
      selectedCategory === 'All Commodities' || prod.category === selectedCategory;
    const matchesLocation =
      selectedLocation === 'All Locations' ||
      prod.sellerLocation.toLowerCase().includes(selectedLocation.toLowerCase());
    const matchesSearch =
      prod.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prod.seller.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prod.category.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesLocation && matchesSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.pricePerUnit - b.pricePerUnit;
    if (sortBy === 'price-high') return b.pricePerUnit - a.pricePerUnit;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  // Pagination calculation
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage) || 1;
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="pt-28 pb-20 bg-[#F8FAFC] min-h-screen text-slate-900">
      
      {/* Header Banner */}
      <div className="bg-[#0B0E14] text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#0038A8]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Buy Heavy Goods & Building Materials
              </h1>
              <p className="text-slate-400 text-base max-w-2xl mt-2">
                Fair prices directly from quarries and suppliers. Pick up your order yourself or get easy truck delivery right to your site.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => navigateTo('logistics')}
                className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold border border-slate-700 flex items-center gap-2 transition-all"
              >
                <Truck className="w-4 h-4 text-orange-400" />
                Find Trucks
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Controls & Search Bar */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm mb-8 space-y-4">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            
            {/* Search Input */}
            <div className="md:col-span-6 relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search bulk cement, sharp sand, granite, grains, rebar..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0038A8] text-sm"
              />
            </div>

            {/* Location Selector */}
            <div className="md:col-span-3">
              <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50">
                <MapPin className="w-4 h-4 text-[#0038A8] flex-shrink-0" />
                <select
                  value={selectedLocation}
                  onChange={(e) => {
                    setSelectedLocation(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full bg-transparent text-sm text-slate-800 focus:outline-none font-medium"
                >
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Sort Selector */}
            <div className="md:col-span-3">
              <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50">
                <SlidersHorizontal className="w-4 h-4 text-slate-500 flex-shrink-0" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full bg-transparent text-sm text-slate-800 focus:outline-none font-medium"
                >
                  <option value="featured">Featured List</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Seller Rating</option>
                </select>
              </div>
            </div>

          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none pt-2 border-t border-slate-100">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#0038A8] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between pb-4">
          <div className="text-sm font-semibold text-slate-600">
            Showing <span className="text-slate-900 font-extrabold">{sortedProducts.length}</span> verified bulk commodity listings
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Escrow Settlement Protected</span>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {paginatedProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => onOpenProductDetail(product)}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden group hover:-translate-y-1 cursor-pointer"
            >
              <div>
                {/* Image & Category Pill */}
                <div className="relative h-48 bg-slate-100 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#0B0E14]/80 backdrop-blur-md text-white text-xs font-bold">
                    {product.category}
                  </div>
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    Verified
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-[#0038A8]" />
                    <span>{product.sellerLocation}</span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 line-clamp-2 group-hover:text-[#0038A8] transition-colors">
                    {product.title}
                  </h3>

                  <div className="text-xs text-slate-600 font-medium line-clamp-2">
                    {product.description}
                  </div>

                  {/* Supplier & Rating */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <div className="font-bold text-slate-700">{product.seller}</div>
                    <div className="flex items-center gap-1 text-amber-600 font-bold">
                      ★ {product.rating} <span className="text-slate-400">({product.reviewsCount})</span>
                    </div>
                  </div>

                  {/* Specifications Snippet */}
                  <div className="bg-slate-50 p-2.5 rounded-xl text-xs space-y-1 text-slate-600">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Min. Order:</span>
                      <span className="font-bold text-slate-800">{product.minOrderQty} {product.unit}s</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Yard Stock:</span>
                      <span className="font-bold text-emerald-600">{product.stockQty.toLocaleString()} {product.unit}s Available</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Price & Actions Footer */}
              <div className="p-5 bg-slate-50/80 border-t border-slate-100 space-y-3" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-2xl font-extrabold text-[#0038A8]">
                      ₦{product.pricePerUnit.toLocaleString()}
                    </span>
                    <span className="text-xs font-semibold text-slate-500"> / {product.unit}</span>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-white px-2 py-1 rounded border border-slate-200">
                    Quarry Gate Price
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenNegotiation(product);
                    }}
                    className="py-2.5 px-3 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-slate-600" />
                    Negotiate
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenProductDetail(product);
                    }}
                    className="py-2.5 px-3 rounded-xl bg-[#FF5500] hover:bg-[#E04B00] text-white text-xs font-bold flex items-center justify-center gap-1 transition-all shadow-sm"
                  >
                    Order & Transport
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Pagination Bar */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 pt-4">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-50 text-xs font-bold"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-9 h-9 rounded-xl text-xs font-bold transition-all ${
                  currentPage === page
                    ? 'bg-[#0038A8] text-white'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {page}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-50 text-xs font-bold"
            >
              Next
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

export default CommodityMarketplace;
