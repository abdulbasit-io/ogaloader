import React from 'react';
import { AlertCircle, CheckCircle2, PhoneOff, Compass, Scale, ShieldAlert, Zap, Truck, DollarSign, Eye } from 'lucide-react';

export function ProblemSolution() {
  const problems = [
    {
      icon: PhoneOff,
      title: 'Manual Phone Dispatching',
      desc: 'Freight matching relies on phone calls to middlemen who inflate transport prices by up to 35%.',
    },
    {
      icon: Compass,
      title: 'Unladen Return Trips',
      desc: 'Transporters return empty from long-haul deliveries due to lack of origin load visibility, wasting fuel.',
    },
    {
      icon: ShieldAlert,
      title: 'Zero Transit Telemetry',
      desc: 'Cargo owners have zero visibility into driver locations, causing theft risk and unpredictable arrival times.',
    },
    {
      icon: Scale,
      title: 'Restricted Material Reach',
      desc: 'Quarries, cement hubs, and grain sellers are constrained to localized buyers without regional digital reach.',
    },
  ];

  const solutions = [
    {
      icon: Zap,
      title: 'Algorithmic Truck Matching',
      desc: 'Instant matching based on proximity, truck axle load, and cargo weight—removing broker overhead.',
    },
    {
      icon: Truck,
      title: 'Return Load Optimization',
      desc: 'Connects return-corridor trucks directly to commodity sellers located near their drop-off point.',
    },
    {
      icon: Eye,
      title: 'Encrypted GPS Telemetry',
      desc: 'Live location tracking, geofenced route warnings, and digital Electronic Waybills (e-Waybills).',
    },
    {
      icon: DollarSign,
      title: 'Automated Dual Escrow',
      desc: 'Funds held securely until buyer signs electronic Proof of Delivery (POD) via mobile app.',
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-[#0B0E14] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF5500]/10 border border-[#FF5500]/20 text-[#FF5500] text-xs font-semibold uppercase tracking-wider">
            Operational Analysis
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Transforming Regional Heavy Goods Logistics
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Traditional bulk material trade suffers from manual fragmentation. Ogaloader embeds transport 
            directly into product checkout.
          </p>
        </div>

        {/* Two Column Grid: Current Bottlenecks vs Ogaloader System */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Current Bottlenecks */}
          <div className="p-8 rounded-2xl bg-red-950/20 border border-red-900/30 space-y-6">
            <div className="flex items-center gap-3 border-b border-red-900/30 pb-4">
              <div className="p-2.5 rounded-xl bg-red-500/10 text-red-400">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Traditional Supply Chain Bottlenecks</h3>
                <p className="text-xs text-red-300 font-medium">Unorganized, manual, & high-friction</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {problems.map((prob, i) => (
                <div key={i} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <prob.icon className="w-5 h-5 text-red-400" />
                  <h4 className="text-sm font-bold text-slate-200">{prob.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{prob.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Ogaloader Solution System */}
          <div className="p-8 rounded-2xl bg-[#0038A8]/10 border border-[#0038A8]/30 space-y-6">
            <div className="flex items-center gap-3 border-b border-[#0038A8]/30 pb-4">
              <div className="p-2.5 rounded-xl bg-[#0038A8]/20 text-blue-400">
                <CheckCircle2 className="w-6 h-6 text-[#16A34A]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">The Ogaloader Infrastructure</h3>
                <p className="text-xs text-blue-300 font-medium">Algorithmic, verified, & telemetry-backed</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {solutions.map((sol, i) => (
                <div key={i} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <sol.icon className="w-5 h-5 text-[#FF5500]" />
                  <h4 className="text-sm font-bold text-slate-200">{sol.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{sol.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

export default ProblemSolution;
