import React, { useState } from 'react';
import logoImg from '../../public/assets/logo.jpg';

/**
 * Ogaloader Logo Component
 * Encapsulates brand graphics cleanly without layout overflow or background clashing.
 */
export function Logo({ variant = 'badge', className = '' }) {
  const [imgError, setImgError] = useState(false);

  if (!imgError && (variant === 'image' || variant === 'badge')) {
    return (
      <div className={`inline-flex items-center rounded-lg bg-white px-2.5 py-1 shadow-sm border border-slate-200/60 transition-transform duration-200 hover:scale-[1.02] flex-shrink-0 ${className}`}>
        <img
          src={logoImg}
          alt="Ogaloader Logo"
          onError={() => setImgError(true)}
          className="h-8 md:h-9 w-auto max-w-[160px] object-contain block"
        />
      </div>
    );
  }

  // High-DPI Vector SVG Fallback / Vector Brand Mark
  return (
    <div className={`inline-flex items-center gap-2.5 group cursor-pointer ${className}`}>
      <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[#0038A8] to-[#00246C] p-1.5 shadow-md shadow-[#0038A8]/20 transition-transform duration-200 group-hover:scale-105">
        <svg viewBox="0 0 100 100" fill="none" className="h-full w-full">
          {/* Outer O Circle */}
          <circle cx="50" cy="50" r="42" stroke="#FFFFFF" strokeWidth="12" fill="none" />
          {/* Package Icon */}
          <rect x="35" y="42" width="30" height="26" rx="3" fill="#FF5500" />
          <path d="M42 42 L50 50 L58 42" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          {/* Truck Wing Accent */}
          <path d="M60 30 L85 45 L60 60" fill="#E52B1E" />
        </svg>
      </div>
      <div className="flex flex-col leading-none">
        <span className="font-['Plus_Jakarta_Sans'] text-xl font-extrabold tracking-tight text-white">
          Oga<span className="text-[#FF5500]">loader</span>
        </span>
        <span className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
          Freight & Commodity Exchange
        </span>
      </div>
    </div>
  );
}

export default Logo;
