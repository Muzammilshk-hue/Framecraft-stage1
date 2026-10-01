import React, { useState, useEffect } from 'react';

export default function SubscriptionModal({
  isOpen,
  onClose,
  claimedSpots = 0,
  maxSpots = 2500,
  isSubscribed = false,
  userFoundingNumber = 0,
  onProcessPayment,
  paymentStatus,
  errorMessage,
  utrNumber,
  setUtrNumber,
  onCancelSubscription
}) {
  const [email, setEmail] = useState('');
  const [isTrialStarted, setIsTrialStarted] = useState(false);
  const [savedEmail, setSavedEmail] = useState('');

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
      alert('Please enter a valid Gmail / Email address.');
      return;
    }
    localStorage.setItem('framecraft_trial_email', email);
    setSavedEmail(email);
    setIsTrialStarted(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#111] text-white border border-stone-800 rounded-2xl max-w-md w-full p-6 relative shadow-2xl max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-white font-bold text-lg"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold text-emerald-400 mb-1">FrameCraft Founding Trial</h2>
        <p className="text-xs text-stone-400 mb-4">Spot #{claimedSpots + 1} of {maxSpots}</p>

        {/* SECTION 1: FREE TRIAL (GMAIL REGISTRATION) */}
        {!isTrialStarted ? (
          <form onSubmit={handleStartTrial} className="bg-stone-900/80 p-4 rounded-xl border border-stone-800 mb-5">
            <label className="block text-xs font-semibold text-stone-300 mb-2">
              Enter Gmail / Email to activate 2-Day Trial:
            </label>
            <input
              type="email"
              required
              placeholder="you@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-stone-950 border border-stone-700 rounded-lg text-white mb-3 focus:outline-none focus:border-emerald-500"
            />
            <button
              type="submit"
              className="w-full bg-emerald-600 text-white py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-emerald-500 transition"
            >
              Start Free 2-Day Trial →
            </button>
          </form>
        ) : (
          <div className="bg-emerald-950/50 border border-emerald-800/60 p-4 rounded-xl text-center mb-5">
            <span className="text-xs font-bold text-emerald-400 block">✓ Trial Activated</span>
            <p className="text-[11px] text-stone-300 mt-1">
              Registered to: <strong className="text-white">{savedEmail}</strong>
            </p>
            <p className="text-[10px] text-emerald-400 mt-1 font-mono">
              Timer: 47:59:59 remaining
            </p>
          </div>
        )}

        {/* SECTION 2: ₹25 LIFETIME FOUNDING CLAIM (UPI) */}
        <div className="border-t border-stone-800 pt-4">
          <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
            Claim Lifetime Founding Badge (₹25)
          </h3>

          {errorMessage && (
            <p className="text-xs text-red-400 bg-red-950/40 border border-red-800/50 p-2 rounded mb-3">
              {errorMessage}
            </p>
          )}

          <form onSubmit={onProcessPayment} className="space-y-3">
            <div>
              <label className="block text-[11px] text-stone-400 mb-1">
                Enter 12-Digit UPI UTR / Transaction Ref No:
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 423456789012"
                value={utrNumber || ''}
                onChange={(e) => setUtrNumber(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-stone-950 border border-stone-700 rounded-lg text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <button
              type="submit"
              disabled={paymentStatus === 'verifying'}
              className="w-full bg-amber-500 hover:bg-amber-400 text-black font-bold py-2.5 rounded-lg text-xs uppercase tracking-wider transition disabled:opacity-50"
            >
              {paymentStatus === 'verifying' ? 'Verifying UTR...' : 'Claim Spot for ₹25 →'}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
