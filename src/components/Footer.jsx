import React from 'react';
import Logo from './Logo';
import { ShieldCheck, Lock, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#080B10] border-t border-slate-800/80 pt-16 pb-12 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <Logo variant="badge" />
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Digital Freight & Bulk Commodity Marketplace. Direct supplier trade, 
              algorithmic truck matching, and escrow settlement.
            </p>
            <div className="flex items-center gap-3 text-xs text-slate-500 pt-2">
              <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                <ShieldCheck className="w-4 h-4" />
                Escrow Protected
              </span>
              <span>·</span>
              <span>NIN & CAC Verified</span>
            </div>
          </div>

          {/* Nav Columns */}
          <div className="md:col-span-7 grid grid-cols-3 gap-8">
            <div className="space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-200">Platform</div>
              <ul className="space-y-2 text-xs">
                <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#marketplace" className="hover:text-white transition-colors">Commodities</a></li>
                <li><a href="#features" className="hover:text-white transition-colors">Platform Specs</a></li>
                <li><a href="#for-you" className="hover:text-white transition-colors">Transporter Solutions</a></li>
              </ul>
            </div>

            <div className="space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-200">Governance</div>
              <ul className="space-y-2 text-xs">
                <li><a href="#" className="hover:text-white transition-colors">Escrow Protocols</a></li>
                <li><a href="#" className="hover:text-white transition-colors">GIT Insurance Terms</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Driver NIN Verification</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Supplier Audit Criteria</a></li>
              </ul>
            </div>

            <div className="space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-200">Legal & Security</div>
              <ul className="space-y-2 text-xs">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Dispute Resolution</a></li>
                <li><a href="#" className="hover:text-white transition-colors">NDPR Compliance</a></li>
              </ul>
            </div>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div>
            © {new Date().getFullYear()} Ogaloader Technologies Inc. All rights reserved.
          </div>

          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-400">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span>Escrow Protected · Live Telemetry · Verified Freight</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
