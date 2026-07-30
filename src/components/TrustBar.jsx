import React from 'react';
import { ShieldCheck, Truck, MapPin, FileCheck } from 'lucide-react';

export function TrustBar() {
  const trustItems = [
    {
      icon: ShieldCheck,
      color: 'text-[#16A34A] bg-emerald-50 border-emerald-200',
      title: 'T+1 Escrow Settlement',
      desc: 'Funds released on digital Proof of Delivery',
    },
    {
      icon: FileCheck,
      color: 'text-[#0038A8] bg-blue-50 border-blue-200',
      title: 'NIN & CAC Vetted',
      desc: 'Biometric driver & supplier verification',
    },
    {
      icon: MapPin,
      color: 'text-[#FF5500] bg-orange-50 border-orange-200',
      title: 'Live GPS Telemetry',
      desc: 'Real-time waypoint and speed logs',
    },
    {
      icon: Truck,
      color: 'text-purple-700 bg-purple-50 border-purple-200',
      title: '0 Broker Markups',
      desc: 'Direct supplier trade & freight pricing',
    },
  ];

  return (
    <div className="border-y border-slate-200 bg-[#F8FAFC] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustItems.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-all"
            >
              <div className={`p-3.5 rounded-xl border flex-shrink-0 ${item.color}`}>
                <item.icon className="w-6 h-6" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900 flex items-center gap-1">
                  {item.title}
                </div>
                <div className="text-xs text-slate-600 mt-0.5">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TrustBar;
