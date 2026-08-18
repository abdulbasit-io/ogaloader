import React, { useState } from 'react';
import { X, User, ShieldCheck, Building2, MapPin, Phone, Mail, FileText, CreditCard, Truck, Check, Save } from 'lucide-react';
import { useApp } from '../context/AppContext';

export function UserProfileModal({ onClose }) {
  const { userRole, profiles, setProfiles } = useApp();
  const activeProfile = profiles[userRole] || profiles.buyer;

  const [formData, setFormData] = useState({ ...activeProfile });
  const [saved, setSaved] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setProfiles((prev) => ({
      ...prev,
      [userRole]: formData,
    }));
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-xl rounded-3xl border border-slate-200 shadow-2xl overflow-hidden my-8 relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-[#0B0E14] text-white p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={formData.avatar}
              alt={formData.name}
              className="w-12 h-12 rounded-2xl object-cover border-2 border-[#0038A8]"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold text-white">{formData.name}</h3>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wider border border-emerald-500/40 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Verified
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {userRole === 'buyer' && 'Commercial Buyer Account'}
                {userRole === 'seller' && 'Bulk Commodity Quarry / Depot Supplier'}
                {userRole === 'trucker' && 'Heavy Haulage Transporter Account'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Profile Form Body */}
        {saved ? (
          <div className="p-8 text-center space-y-3 text-emerald-600">
            <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-8 h-8 text-emerald-600" />
            </div>
            <div className="text-lg font-extrabold text-slate-900">Profile Updated Successfully!</div>
            <p className="text-xs text-slate-500">Your verification badge and settlement bank settings have been updated.</p>
          </div>
        ) : (
          <form onSubmit={handleSave} className="p-6 space-y-5 text-xs font-medium">
            
            {/* BUYER PROFILE FIELDS */}
            {userRole === 'buyer' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Company / Organization Name:</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 font-bold text-slate-900 focus:ring-2 focus:ring-[#0038A8]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">CAC Registration No:</label>
                    <input
                      type="text"
                      value={formData.cacReg}
                      onChange={(e) => handleChange('cacReg', e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-300 font-mono font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Contact Officer:</label>
                    <input
                      type="text"
                      value={formData.contactPerson}
                      onChange={(e) => handleChange('contactPerson', e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-300 font-semibold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Primary Job Site Address:</label>
                  <input
                    type="text"
                    value={formData.siteAddress}
                    onChange={(e) => handleChange('siteAddress', e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 font-semibold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Corporate Email:</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-300 font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Phone Number:</label>
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-300 font-semibold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Refund & Escrow Settlement Account:</label>
                  <input
                    type="text"
                    value={formData.settlementBank}
                    onChange={(e) => handleChange('settlementBank', e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 font-semibold bg-slate-50"
                  />
                </div>
              </div>
            )}

            {/* SELLER PROFILE FIELDS */}
            {userRole === 'seller' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Quarry / Depot Yard Name:</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 font-bold text-slate-900 focus:ring-2 focus:ring-[#0038A8]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Mining License QL ID:</label>
                    <input
                      type="text"
                      value={formData.quarryLicense}
                      onChange={(e) => handleChange('quarryLicense', e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-300 font-mono font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Yard Operations Officer:</label>
                    <input
                      type="text"
                      value={formData.contactPerson}
                      onChange={(e) => handleChange('contactPerson', e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-300 font-semibold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Quarry Yard Location Coordinates:</label>
                  <input
                    type="text"
                    value={formData.yardLocation}
                    onChange={(e) => handleChange('yardLocation', e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Payout Settlement Bank Account:</label>
                  <input
                    type="text"
                    value={formData.settlementBank}
                    onChange={(e) => handleChange('settlementBank', e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 font-semibold bg-slate-50"
                  />
                </div>
              </div>
            )}

            {/* TRUCKER PROFILE FIELDS */}
            {userRole === 'trucker' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Driver Full Name:</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 font-bold text-slate-900 focus:ring-2 focus:ring-[#0038A8]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">NIN Identification No:</label>
                    <input
                      type="text"
                      value={formData.nin}
                      onChange={(e) => handleChange('nin', e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-300 font-mono font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Plate License Number:</label>
                    <input
                      type="text"
                      value={formData.plateNumber}
                      onChange={(e) => handleChange('plateNumber', e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-300 font-mono font-bold text-[#0038A8]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Truck Body Spec:</label>
                    <input
                      type="text"
                      value={formData.truckType}
                      onChange={(e) => handleChange('truckType', e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-300 font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">FRSC Safety Clearance:</label>
                    <input
                      type="text"
                      value={formData.frscClearance}
                      onChange={(e) => handleChange('frscClearance', e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-300 font-semibold bg-emerald-50 text-emerald-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Driver Earnings Payout Bank Account:</label>
                  <input
                    type="text"
                    value={formData.settlementBank}
                    onChange={(e) => handleChange('settlementBank', e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 font-semibold bg-slate-50"
                  />
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="pt-3 flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="w-1/2 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="w-1/2 py-3 rounded-xl bg-[#0038A8] hover:bg-blue-900 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md"
              >
                <Save className="w-4 h-4" /> Save Profile Details
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}

export default UserProfileModal;
