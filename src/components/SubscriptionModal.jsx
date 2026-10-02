import React, { useState, useEffect } from 'react';

export default function SubscriptionModal({
  isOpen,
  onClose,
  claimedSpots,
  maxSpots = 2500,
  isSubscribed,
  onProcessPayment,
  paymentStatus,
  errorMessage,
  utrNumber,
  setUtrNumber
}) {
  // Live Timer State (Starting at 48 Hours = 172,800 seconds)
  const [secondsRemaining, setSecondsRemaining] = useState(48 * 3600);

  useEffect(() => {
    if (!isOpen) return;

    const timer = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  // Format seconds to HH:MM:SS
  const formatTimer = (totalSeconds) => {
    const hrs = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
    const mins = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
    const secs = (totalSeconds % 60).toString().padStart(2, '0');
    return `${hrs}:${mins}:${secs}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-sm bg-[#121413] text-white rounded-2xl p-6 shadow-2xl border border-stone-800">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-white text-xl font-bold transition"
        >
          ✕
        </button>

        {/* Header */}
        <h2 className="text-xl font-semibold text-[#34d399] tracking-tight">
          FrameCraft Founding Trial
        </h2>
        <p className="text-xs text-stone-400 mt-0.5">
          Spot #{claimedSpots} of {maxSpots}
        </p>

        {/* Trial Status Card with Working Timer */}
        <div className="mt-4 p-4 rounded-xl bg-[#092e20]/80 border border-[#10b981]/30 text-center">
          <div className="text-sm font-semibold text-[#10b981] flex items-center justify-center gap-1.5">
            <span>✓</span> Trial Activated
          </div>
          <p className="text-xs text-stone-300 mt-1">
            Registered to: <span className="font-medium text-white">shk.muzzu369@gmail.com</span>
          </p>
          <div className="mt-2 text-xs font-mono text-[#34d399] bg-[#031e13] py-1.5 px-3 rounded-lg inline-block border border-[#10b981]/20">
            Timer: {formatTimer(secondsRemaining)} remaining
          </div>
        </div>

        {/* Form Section */}
        <form onSubmit={onProcessPayment} className="mt-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#f59e0b] mb-1">
              CLAIM LIFETIME FOUNDING BADGE (₹25)
            </label>
            <p className="text-[11px] text-stone-400 mb-2">
              Enter 12-Digit UPI UTR / Transaction Ref No:
            </p>
            <input
              type="text"
              value={utrNumber}
              onChange={(e) => setUtrNumber(e.target.value)}
              placeholder="e.g. 423456789012"
              maxLength={12}
              className="w-full bg-[#1c1f1d] border border-stone-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-stone-500 focus:outline-none focus:border-[#f59e0b] transition"
            />
            {errorMessage && (
              <p className="text-xs text-red-400 mt-1.5">{errorMessage}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={paymentStatus === 'verifying' || isSubscribed}
            className="w-full py-3 bg-[#f59e0b] hover:bg-[#d97706] text-black font-bold text-xs uppercase tracking-wider rounded-xl transition shadow-md disabled:opacity-50"
          >
            {paymentStatus === 'verifying'
              ? 'VERIFYING PAYMENT...'
              : isSubscribed
              ? 'BADGE CLAIMED ✓'
              : 'CLAIM SPOT FOR ₹25 →'}
          </button>
        </form>
      </div>
    </div>
  );
}
