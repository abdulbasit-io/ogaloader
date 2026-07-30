import React, { useState } from 'react';
import { ShoppingBag, Truck, ShieldCheck, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';

export function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      number: '01',
      icon: ShoppingBag,
      title: 'Select Commodity & Tonnage',
      summary: 'Choose verified building materials or agricultural bulk directly from listed supplier yards.',
      details: [
        'Filter by grade (e.g. 42.5N Cement, 3/4 Granite, Yellow Maize)',
        'Specify exact quantity in metric tons or bag count',
        'Receive instant bulk product pricing without middleman fees',
      ],
    },
    {
      number: '02',
      icon: Truck,
      title: 'Algorithmic Truck Matching',
      summary: 'System automatically dispatches nearby verified fleet vehicles suited for the load.',
      details: [
        'Match by vehicle type (Tipper, Flatbed, Tanker, Container)',
        'Axle-load capacity validation to prevent overloading',
        'Direct driver route calculation to pickup point',
      ],
    },
    {
      number: '03',
      icon: ShieldCheck,
      title: 'Escrow Lock & GIT Insurance',
      summary: 'Payments are charged upfront and held securely in escrow until verified delivery.',
      details: [
        'Total cost transparently itemized (Goods + Freight + Insurance)',
        'Embedded Goods-In-Transit (GIT) insurance activated',
        'Funds protected against trip cancellation or cargo default',
      ],
    },
    {
      number: '04',
      icon: MapPin,
      title: 'Live Telemetry & Digital POD',
      summary: 'Track truck progress in real-time and release payout via digital sign-off.',
      details: [
        'Live GPS tracking with geofenced arrival alerts',
        'Electronic Waybill (e-Waybill) generated at pickup yard',
        'T+1 automated payout to seller & driver upon buyer POD signature',
      ],
    },
  ];

  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-[#F8FAFC] relative border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0038A8]/10 border border-[#0038A8]/20 text-[#0038A8] text-xs font-bold uppercase tracking-wider">
            Operational Blueprint
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Four Verified Steps from Order to Site Delivery
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            A single unified workflow connecting commodity buyers, supplier yards, and freight transporters.
          </p>
        </div>

        {/* Step Tabs for Interactive Exploration */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Step Selector Column */}
          <div className="lg:col-span-5 space-y-3">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isActive = activeStep === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`p-5 rounded-2xl cursor-pointer transition-all duration-200 border ${
                    isActive
                      ? 'bg-white border-[#FF5500] shadow-lg shadow-[#FF5500]/10'
                      : 'bg-slate-100/80 border-slate-200 hover:bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`p-2.5 rounded-xl transition-colors ${
                          isActive ? 'bg-[#FF5500] text-white' : 'bg-slate-200 text-slate-700'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-500 block uppercase tracking-wider">
                          Step {step.number}
                        </span>
                        <h3 className="text-base font-bold text-slate-900 mt-0.5">{step.title}</h3>
                      </div>
                    </div>
                    <ArrowRight
                      className={`w-5 h-5 transition-transform ${
                        isActive ? 'text-[#FF5500] translate-x-1' : 'text-slate-400'
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Step Detailed Card Column */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-2xl bg-white border border-slate-200 shadow-xl space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <span className="text-4xl font-extrabold text-[#0038A8]">
                  {steps[activeStep].number}
                </span>
                <span className="px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#0038A8] text-xs font-bold">
                  Operational Phase
                </span>
              </div>

              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-slate-900">{steps[activeStep].title}</h3>
                <p className="text-slate-600 text-base leading-relaxed">
                  {steps[activeStep].summary}
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Key Verification Points:
                </div>
                <div className="space-y-3">
                  {steps[activeStep].details.map((detail, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <CheckCircle2 className="w-5 h-5 text-[#16A34A] flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-800 font-medium">{detail}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

export default HowItWorks;
