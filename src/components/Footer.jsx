import React from 'react';
import Logo from './Logo';
import { ShieldCheck, Lock } from 'lucide-react';

// Custom Sharp Brand SVG Icons (Zero external dependency issues)
function YouTubeIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function InstagramIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function FacebookIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function TikTokIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.68 6.34 6.34 0 0 0 9.34 22a6.34 6.34 0 0 0 6.34-6.32V9.05a8.16 8.16 0 0 0 4.91 1.6V7.2a4.86 4.86 0 0 1-1-.51z" />
    </svg>
  );
}

export function Footer() {
  const socialLinks = [
    {
      name: 'YouTube',
      url: 'https://www.youtube.com/@Ogaloader',
      icon: YouTubeIcon,
      hoverBg: 'hover:bg-[#FF0000] hover:text-white',
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/ogaloader',
      icon: InstagramIcon,
      hoverBg: 'hover:bg-[#E4405F] hover:text-white',
    },
    {
      name: 'Facebook',
      url: 'https://web.facebook.com/ogaloader',
      icon: FacebookIcon,
      hoverBg: 'hover:bg-[#1877F2] hover:text-white',
    },
    {
      name: 'TikTok',
      url: 'https://www.tiktok.com/@ogaloader',
      icon: TikTokIcon,
      hoverBg: 'hover:bg-slate-200 hover:text-black',
    },
  ];

  return (
    <footer className="bg-[#080B10] border-t border-slate-800/80 pt-16 pb-12 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Brand Info & Social Connect */}
          <div className="md:col-span-5 space-y-4">
            <Logo variant="badge" />
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Digital Freight & Bulk Commodity Marketplace. Direct supplier trade, 
              algorithmic truck matching, and escrow settlement.
            </p>
            
            <div className="flex items-center gap-3 text-xs text-slate-500 pt-1">
              <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                <ShieldCheck className="w-4 h-4" />
                Escrow Protected
              </span>
              <span>·</span>
              <span>NIN & CAC Verified</span>
            </div>

            {/* Social Media Links Bar */}
            <div className="pt-3">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2.5">
                Connect With Us
              </div>
              <div className="flex items-center gap-2.5">
                {socialLinks.map((social) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Ogaloader on ${social.name}`}
                      className={`p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 transition-all duration-200 hover:scale-105 ${social.hoverBg}`}
                    >
                      <IconComponent className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
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

          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white text-xs transition-colors"
                >
                  {s.name}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-400">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Escrow Protected</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
