import React from 'react';
import { ArrowRight, ShieldCheck, MapPin, Truck, Package, Clock, CheckCircle2 } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-36 md:pb-24 overflow-hidden bg-gradient-to-b from-[#0B0E14] via-[#0D1322] to-[#0B0E14]">
      {/* Dynamic Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#0038A8_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#0038A8]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#FF5500]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-left">


            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12]">
              Source Bulk Goods.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-300">
                Match Freight.
              </span>{' '}
              <span className="text-[#FF5500] block mt-1">Track to Site.</span>
            </h1>

            {/* Evidence-backed Subtitle */}
            <p className="text-slate-300 text-lg sm:text-xl font-normal leading-relaxed max-w-2xl">
              Ogaloader integrates bulk material procurement directly with verified axle-load truck matching, 
              escrow-secured payments, and live GPS transit telemetry.
            </p>

            {/* Call to Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <a
                href="#waitlist"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#FF5500] hover:bg-[#E04B00] text-white text-base font-bold transition-all shadow-lg shadow-[#FF5500]/25 hover:shadow-xl hover:shadow-[#FF5500]/35 hover:-translate-y-0.5"
              >
                Get Early Access
                <ArrowRight className="w-5 h-5" />
              </a>

              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700/80 text-base font-semibold transition-all"
              >
                See Operational Workflow
              </a>
            </div>

            {/* Fact Metrics Bar */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-800/80">
              <div>
                <div className="text-xl sm:text-2xl font-bold text-white flex items-center gap-1.5">
                  <ShieldCheck className="w-5 h-5 text-[#16A34A] flex-shrink-0" />
                  T+1 Escrow
                </div>
                <div className="text-xs text-slate-400 font-medium mt-1">
                  Automated payout on digital POD
                </div>
              </div>

              <div>
                <div className="text-xl sm:text-2xl font-bold text-white flex items-center gap-1.5">
                  <Truck className="w-5 h-5 text-[#FF5500] flex-shrink-0" />
                  Live GPS
                </div>
                <div className="text-xs text-slate-400 font-medium mt-1">
                  Real-time telemetry tracking
                </div>
              </div>

              <div>
                <div className="text-xl sm:text-2xl font-bold text-white flex items-center gap-1.5">
                  <Package className="w-5 h-5 text-[#0038A8] flex-shrink-0" />
                  Direct Trade
                </div>
                <div className="text-xs text-slate-400 font-medium mt-1">
                  Verified suppliers & 0 broker markup
                </div>
              </div>
            </div>

          </div>

          {/* Right Visual: Real-time Telemetry Dashboard Card */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Telemetry Tracking Widget */}
              <div className="rounded-2xl bg-slate-900/90 border border-slate-700/80 p-6 shadow-2xl shadow-black/80 backdrop-blur-xl space-y-5">
                
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-3.5">
                  <div className="flex items-center gap-2">
                    <span className="flex h-2.5 w-2.5 rounded-full bg-[#16A34A] animate-ping" />
                    <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                      Live Transit Telemetry
                    </span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
                    In Transit
                  </span>
                </div>

                {/* Route Detail */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex flex-col items-center pt-1">
                      <div className="w-3 h-3 rounded-full bg-[#0038A8] border-2 border-white" />
                      <div className="w-0.5 h-10 bg-slate-700 my-1" />
                      <div className="w-3 h-3 rounded-full bg-[#FF5500] border-2 border-white" />
                    </div>
                    
                    <div className="space-y-4 flex-1">
                      <div>
                        <div className="text-[11px] font-semibold text-slate-400 uppercase">Pickup Origin</div>
                        <div className="text-sm font-bold text-white">Apapa Port Depot, Lagos</div>
                      </div>
                      <div>
                        <div className="text-[11px] font-semibold text-slate-400 uppercase">Destination Yard</div>
                        <div className="text-sm font-bold text-white">Kano Central Distribution Hub</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Cargo & ETA metrics */}
                <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
                  <div>
                    <div className="text-xs font-medium text-slate-400">Cargo Spec</div>
                    <div className="text-sm font-bold text-slate-100 mt-0.5">Bulk Cement · 30 Tons</div>
                  </div>
                  <div>
                    <div className="text-xs font-medium text-slate-400">Estimated Arrival</div>
                    <div className="text-sm font-bold text-emerald-400 mt-0.5 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      5h 45m remaining
                    </div>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-400">Dispatch</span>
                    <span className="text-emerald-400">68% Complete</span>
                    <span className="text-slate-400">Delivery</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#0038A8] via-[#FF5500] to-[#16A34A] w-[68%]" />
                  </div>
                </div>

                {/* Inline Vehicle Fleet Spec Badge (Replaces overlapping absolute badge) */}
                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/90 border border-slate-800">
                  <div className="w-9 h-9 rounded-lg bg-[#FF5500]/20 flex items-center justify-center text-[#FF5500] flex-shrink-0">
                    <Truck className="w-4.5 h-4.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-white truncate">Axle-Load Matched Vehicle</div>
                    <div className="text-[11px] text-slate-400 truncate">30-Ton Tipper Heavy Fleet</div>
                  </div>
                  <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 flex-shrink-0">
                    Verified
                  </span>
                </div>

                {/* e-Waybill Verification Badge */}
                <div className="flex items-center justify-between pt-2 text-xs text-slate-400 border-t border-slate-800">
                  <span className="font-mono text-slate-300">e-Waybill: #OG-892401</span>
                  <span className="flex items-center gap-1 text-emerald-400 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Escrow Locked
                  </span>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;
