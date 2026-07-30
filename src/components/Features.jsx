import React from 'react';
import { ShieldCheck, Truck, FileText, Lock, Gauge, Layers, CheckCircle2 } from 'lucide-react';

export function Features() {
  const featuresList = [
    {
      icon: ShieldCheck,
      color: 'text-[#16A34A]',
      title: 'Automated Dual Escrow',
      desc: 'Escrow holds funds securely until buyer signs electronic Proof of Delivery (POD) on mobile.',
    },
    {
      icon: Gauge,
      color: 'text-[#0038A8]',
      title: 'Axle-Load Weight Matcher',
      desc: 'Algorithm matches cargo weight with truck axle ratings to ensure legal, safe transit compliance.',
    },
    {
      icon: FileText,
      color: 'text-[#FF5500]',
      title: 'Electronic Waybills (e-Waybills)',
      desc: 'Instant QR-encoded digital waybills generated at yard pickup for instant road inspection checks.',
    },
    {
      icon: Lock,
      color: 'text-purple-400',
      title: 'Embedded GIT Insurance',
      desc: 'Comprehensive Goods-In-Transit protection covering theft, accidents, or transit damage.',
    },
    {
      icon: Layers,
      color: 'text-[#0038A8]',
      title: 'Direct Supplier Pricing',
      desc: 'Eliminates broker price padding. Commodity prices sourced directly from verified quarry yards.',
    },
    {
      icon: Truck,
      color: 'text-[#FF5500]',
      title: 'Return Load Optimization',
      desc: 'Reduces unladen return trips by matching outbound trucks to commodity sellers needing haulage.',
    },
  ];

  return (
    <section id="features" className="py-20 md:py-28 bg-[#0D1322] relative border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0038A8]/20 border border-[#0038A8]/40 text-[#60A5FA] text-xs font-semibold uppercase tracking-wider">
            Platform Capability Specs
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Built for Commercial Rigor & Trust
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Purpose-engineered features designed specifically for bulk materials trade and heavy fleet operations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuresList.map((feat, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all hover:-translate-y-1 space-y-4"
            >
              <div className="p-3 rounded-xl bg-slate-800/80 w-fit">
                <feat.icon className={`w-6 h-6 ${feat.color}`} />
              </div>
              <h3 className="text-lg font-bold text-white">{feat.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Features;
