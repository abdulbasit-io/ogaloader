import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Mail } from 'lucide-react';

export function WaitlistCTA() {
  const [email, setEmail] = useState('');
  const [userRole, setUserRole] = useState('buyer');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError(true);
      setTimeout(() => setError(false), 2000);
      return;
    }
    setSubmitted(true);
  };

  return (
    <section id="waitlist" className="py-20 md:py-28 bg-gradient-to-b from-[#0B0E14] via-[#0D1322] to-[#0B0E14] border-t border-slate-800 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-slate-900 via-[#0B0E14] to-slate-900 border border-[#0038A8]/40 shadow-2xl relative overflow-hidden text-center">
          
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF5500]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#0038A8]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-2xl mx-auto space-y-6 relative z-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Get Early Access to the Ogaloader Suite
            </h2>

            <p className="text-slate-300 text-base sm:text-lg">
              Join verified commercial buyers, quarry operators, and fleet transporters securing early trade capacity.
            </p>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 flex items-center justify-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0" />
                <span className="text-base font-bold">
                  Registration Received! Our operational team will contact you shortly.
                </span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 pt-2">
                
                {/* Role selection toggle */}
                <div className="flex justify-center gap-2 max-w-md mx-auto">
                  <button
                    type="button"
                    onClick={() => setUserRole('buyer')}
                    className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                      userRole === 'buyer'
                        ? 'bg-[#0038A8] text-white'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    Commercial Buyer
                  </button>
                  <button
                    type="button"
                    onClick={() => setUserRole('seller')}
                    className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                      userRole === 'seller'
                        ? 'bg-[#0038A8] text-white'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    Commodity Supplier
                  </button>
                  <button
                    type="button"
                    onClick={() => setUserRole('driver')}
                    className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                      userRole === 'driver'
                        ? 'bg-[#0038A8] text-white'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    Fleet Owner / Driver
                  </button>
                </div>

                {/* Input + Button */}
                <div className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto">
                  <div className="relative w-full">
                    <Mail className="w-5 h-5 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter corporate or business email..."
                      className={`w-full pl-11 pr-4 py-3.5 rounded-xl bg-slate-950 border text-white text-sm focus:outline-none transition-all ${
                        error ? 'border-red-500' : 'border-slate-800 focus:border-[#0038A8]'
                      }`}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#FF5500] hover:bg-[#E04B00] text-white font-bold text-sm whitespace-nowrap transition-all shadow-md shadow-[#FF5500]/25 flex items-center justify-center gap-2"
                  >
                    Submit Request
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="text-xs text-slate-500 pt-2">
                  🔒 Zero spam policy. We perform NIN/CAC verification during account activation.
                </div>
              </form>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}

export default WaitlistCTA;
