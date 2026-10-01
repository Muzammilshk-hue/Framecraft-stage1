import React, { useState, useEffect } from 'react';

export default function SubscriptionModal({ isOpen, onClose, claimedSpots, maxSpots }) {
  const [email, setEmail] = useState('');
  const [isTrialStarted, setIsTrialStarted] = useState(false);
  const [savedEmail, setSavedEmail] = useState('');

  // Check if trial was already started in this browser
  useEffect(() => {
    const existingEmail = localStorage.getItem('framecraft_trial_email');
    if (existingEmail) {
      setSavedEmail(existingEmail);
      setIsTrialStarted(true);
    }
  }, []);

  const handleStartTrial = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      alert('Please enter a valid email address to start your trial.');
      return;
    }
    localStorage.setItem('framecraft_trial_email', email);
    setSavedEmail(email);
    setIsTrialStarted(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-sm w-full p-6 relative shadow-xl max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 font-bold"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold text-[#2c3329] mb-1">FrameCraft Founding Trial</h2>
        <p className="text-xs text-gray-500 mb-4">Spot #{claimedSpots + 1} of {maxSpots}</p>

        {/* TRIAL REGISTRATION AREA */}
        {!isTrialStarted ? (
          <form onSubmit={handleStartTrial} className="bg-stone-50 p-4 rounded-xl border border-stone-200 mb-4">
            <label className="block text-xs font-semibold text-[#2c3329] mb-1">
              Enter your Email / Gmail to activate 2-Day Trial:
            </label>
            <input
              type="email"
              required
              placeholder="you@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg mb-3 focus:outline-none focus:border-[#4a5d4e]"
            />
            <button
              type="submit"
              className="w-full bg-[#4a5d4e] text-white py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-[#3d4d40]"
            >
              Start Free 2-Day Trial →
            </button>
          </form>
        ) : (
          <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl text-center mb-4">
            <span className="text-xs font-bold text-emerald-800 block">✓ Trial Activated</span>
            <p className="text-[11px] text-emerald-700 mt-1">
              Registered to: <strong>{savedEmail}</strong>
            </p>
            <p className="text-[10px] text-emerald-600 mt-1">
              Time remaining: 47:59:59
            </p>
          </div>
        )}

        {/* PAID FOUNDING CLAIM */}
        <div className="border-t border-gray-100 pt-4">
          <p className="text-xs text-gray-600 mb-2 font-medium">Or lock in your lifetime founding badge for ₹25:</p>
          <button
            type="button"
            onClick={() => alert('Proceeding to UPI Payment...')}
            className="w-full bg-[#1a2e20] text-[#cda851] py-3 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-black"
          >
            Claim Spot #2 for ₹25 →
          </button>
        </div>

      </div>
    </div>
  );
}
