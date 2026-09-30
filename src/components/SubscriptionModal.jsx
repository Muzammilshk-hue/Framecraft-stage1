import React, { useState } from 'react';

export default function SubscriptionModal({
  isOpen,
  onClose,
  claimedSpots = 0,
  maxSpots = 4500,
  isSubscribed = false,
  userFoundingNumber = null,
  onProcessPayment,
  paymentStatus, // 'idle' | 'processing' | 'pending' | 'success' | 'failed' | 'delay'
  errorMessage,
  utrNumber,
  setUtrNumber,
  onCancelSubscription
}) {
  // Modal Navigation Views: 'OVERVIEW' | 'CHECKOUT' | 'ACTIVE' | 'CANCEL_CONFIRM'
  const [currentView, setCurrentView] = useState(isSubscribed ? 'ACTIVE' : 'OVERVIEW');
  const [trialStatus, setTrialStatus] = useState('available'); // 'available' | 'active' | 'expired'
  const [trialTimeLeft, setTrialTimeLeft] = useState('48:00:00');

  if (!isOpen) return null;

  const spotsRemaining = Math.max(0, maxSpots - claimedSpots);
  const isSoldOut = claimedSpots >= maxSpots;
  const nextSpotNumber = claimedSpots + 1;

  // Handle Trial Activation (Front-End State Engine)
  const handleStartTrial = () => {
    setTrialStatus('active');
    setTrialTimeLeft('47:59:59');
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-[#fcfbf8] border border-gray-200 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col">
        
        {/* ==========================================
            HEADER
           ========================================== */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 bg-white sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#4a5d4e] animate-pulse" />
            <h2 className="font-bold text-gray-900 text-base sm:text-lg tracking-tight">
              FrameCraft Subscription
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 active:bg-gray-300 flex items-center justify-center text-gray-600 transition-colors text-sm font-semibold"
          >
            ✕
          </button>
        </div>

        <div className="p-5 overflow-y-auto space-y-6 text-gray-800 text-xs sm:text-sm">

          {/* ==========================================
              VIEW 1: OVERVIEW & COMPARISON
             ========================================== */}
          {currentView === 'OVERVIEW' && (
            <>
              {/* FOUNDING OFFER CARD */}
              <div className="bg-gradient-to-br from-[#f4f6f3] to-[#e8ece6] border border-[#d2dcd0] rounded-xl p-4 sm:p-5 relative overflow-hidden shadow-sm">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className="inline-block px-2.5 py-0.5 bg-[#4a5d4e] text-white font-semibold text-[10px] rounded-full uppercase tracking-wider mb-1">
                      Stage 1 Founding Offer
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-gray-900">
                      {isSoldOut ? 'Founding Cohort Full' : `Next Founding Spot #${nextSpotNumber}`}
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="text-xl sm:text-2xl font-black text-gray-900">₹25</span>
                    <p className="text-[10px] text-gray-500 font-medium">Founding Price Lock</p>
                  </div>
                </div>

                <p className="text-gray-600 text-xs leading-relaxed mb-4">
                  Only users who successfully purchase within the first 4,500 paid spots belong to the guaranteed Stage 1 founding cohort.
                </p>

                {/* PROGRESS & METRICS */}
                <div className="space-y-1.5 mb-4">
                  <div className="flex justify-between text-[11px] font-semibold text-gray-700">
                    <span>{claimedSpots} / {maxSpots} Spots Claimed</span>
                    <span className={spotsRemaining < 500 ? 'text-amber-600 font-bold' : 'text-gray-500'}>
                      {spotsRemaining} Remaining
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#4a5d4e] transition-all duration-500"
                      style={{ width: `${Math.min(100, (claimedSpots / maxSpots) * 100)}%` }}
                    />
                  </div>
                </div>

                {/* BADGE MILESTONE NOTICE */}
                <div className="bg-white/80 backdrop-blur-sm p-2.5 rounded-lg border border-gray-200 text-[11px] text-gray-600 leading-snug mb-4">
                  🏆 <span className="font-semibold text-gray-800">Founding Badge Milestone:</span> Unlocks after 2,500 qualifying subscriptions are reached.
                </div>

                {/* PRIMARY CTA */}
                {isSoldOut ? (
                  <div className="w-full bg-gray-300 text-gray-600 text-center py-3 rounded-xl font-bold text-xs uppercase tracking-wider">
                    4,500 Founding Spots Filled
                  </div>
                ) : (
                  <button
                    onClick={() => setCurrentView('CHECKOUT')}
                    className="w-full bg-[#4a5d4e] hover:bg-[#3d4d40] active:scale-[0.99] text-white py-3 rounded-xl font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <span>CLAIM MY SPOT</span>
                    <span>→</span>
                  </button>
                )}

                {/* SECONDARY TRIAL CTA */}
                <div className="mt-3 text-center border-t border-gray-200/60 pt-3">
                  {trialStatus === 'available' && (
                    <button
                      onClick={handleStartTrial}
                      className="text-[#4a5d4e] hover:underline font-semibold text-xs transition-all"
                    >
                      TRY FREE FOR 2 DAYS
                    </button>
                  )}
                  {trialStatus === 'active' && (
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full text-[11px] text-emerald-800 font-medium">
                      <span>✓ 2-Day Trial Active</span>
                      <span className="font-mono text-[10px] text-emerald-600">({trialTimeLeft})</span>
                    </div>
                  )}
                  {trialStatus === 'expired' && (
                    <span className="text-[11px] text-gray-400 font-medium">Free 2-Day Trial Expired</span>
                  )}
                </div>
              </div>

              {/* ==========================================
                  STAGE 1 COMPARISON TABLE
                 ========================================== */}
              <div className="space-y-3">
                <h4 className="font-bold text-gray-900 text-xs uppercase tracking-wider text-gray-500">
                  Stage 1 Feature Matrix
                </h4>
                
                <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200 text-[11px] font-bold text-gray-600">
                        <th className="p-3">Feature</th>
                        <th className="p-3 text-center w-20">Free</th>
                        <th className="p-3 text-center w-24 bg-emerald-50/50 text-[#4a5d4e]">Founding</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-[11px]">
                      <tr>
                        <td className="p-3 font-medium text-gray-700">Family & Photo Editing</td>
                        <td className="p-3 text-center">✔️</td>
                        <td className="p-3 text-center bg-emerald-50/30">✔️</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-medium text-gray-700">Professional Video Tools</td>
                        <td className="p-3 text-center">✔️</td>
                        <td className="p-3 text-center bg-emerald-50/30">✔️</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-medium text-gray-700">Project Management & Drafts</td>
                        <td className="p-3 text-center text-gray-400">Local Only</td>
                        <td className="p-3 text-center font-semibold text-emerald-700 bg-emerald-50/30">Unrestricted</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-medium text-gray-700">Stage 1 AI Editing Guidance</td>
                        <td className="p-3 text-center text-gray-400">✖️</td>
                        <td className="p-3 text-center bg-emerald-50/30">✔️</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-medium text-gray-700">Server Founding Badge & #</td>
                        <td className="p-3 text-center text-gray-400">✖️</td>
                        <td className="p-3 text-center bg-emerald-50/30">✔️</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-medium text-gray-700">Founding Price Lock (₹25)</td>
                        <td className="p-3 text-center text-gray-400">✖️</td>
                        <td className="p-3 text-center bg-emerald-50/30">✔️</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* ==========================================
              VIEW 2: CHECKOUT UI & TERMS
             ========================================== */}
          {currentView === 'CHECKOUT' && (
            <div className="space-y-4">
              <button
                onClick={() => setCurrentView('OVERVIEW')}
                className="text-xs font-semibold text-gray-500 hover:text-gray-800 flex items-center gap-1 mb-2"
              >
                ← Back to overview
              </button>

              <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-3 shadow-sm">
                <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm">Stage 1 Founding Subscription</h3>
                    <p className="text-[11px] text-gray-500">Claiming Spot #{nextSpotNumber}</p>
                  </div>
                  <span className="text-lg font-black text-gray-900">₹25</span>
                </div>

                {/* TERMS & CANCELLATION RULE */}
                <div className="bg-amber-50/60 border border-amber-200/80 rounded-lg p-3 text-[11px] text-amber-900 space-y-1.5 leading-relaxed">
                  <p className="font-bold flex items-center gap-1">
                    ⚠️ 30-Day Cancellation & Badge Policy:
                  </p>
                  <p>
                    If a founding subscriber cancels within the first 30 days, the founding badge is temporarily detained/held according to the founding terms and will not be treated as an active permanent badge during the hold period.
                  </p>
                </div>

                <div className="text-[11px] text-gray-500 space-y-1 pt-1">
                  <p>• Founding numbers are server-authoritative and assigned automatically upon payment verification.</p>
                  <p>• Includes Stage 1 feature access and founding price guarantee.</p>
                </div>
              </div>

              {/* PAYMENT STATES & ACTIONS */}
              {paymentStatus === 'processing' && (
                <div className="bg-blue-50 border border-blue-200 text-blue-800 p-3 rounded-xl text-center text-xs font-semibold animate-pulse">
                  Processing payment verification... Please do not close this window.
                </div>
              )}

              {paymentStatus === 'pending' && (
                <div className="bg-amber-50 border border-amber-200 text-amber-800 p-3 rounded-xl text-center text-xs font-medium">
                  ⏳ Payment verification pending. Your founding status will update automatically upon backend confirmation.
                </div>
              )}

              {paymentStatus === 'failed' && (
                <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl text-center text-xs font-medium">
                  {errorMessage || 'Payment failed. Please check your transaction details and try again.'}
                </div>
              )}

              {/* PAYMENT INPUT FORM */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  onProcessPayment();
                }}
                className="space-y-3 pt-2"
              >
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">
                    Enter 12-Digit Transaction UTR:
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 4253XXXXXXXX"
                    value={utrNumber}
                    onChange={(e) => setUtrNumber(e.target.value)}
                    required
                    maxLength={12}
                    minLength={12}
                    disabled={paymentStatus === 'processing'}
                    className="w-full border border-gray-300 rounded-lg p-2.5 text-xs font-mono text-center tracking-wider focus:ring-2 focus:ring-[#4a5d4e] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={paymentStatus === 'processing' || utrNumber.length !== 12}
                  className="w-full bg-[#4a5d4e] hover:bg-[#3d4d40] disabled:bg-gray-300 text-white py-3 rounded-xl font-bold text-xs uppercase tracking-wider shadow-md transition-all"
                >
                  {paymentStatus === 'processing' ? 'Verifying...' : 'Submit & Claim Spot'}
                </button>
              </form>
            </div>
          )}

          {/* ==========================================
              VIEW 3: ACTIVE SUBSCRIPTION MANAGEMENT
             ========================================== */}
          {(currentView === 'ACTIVE' || isSubscribed) && (
            <div className="space-y-4">
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-center space-y-2">
                <span className="inline-block px-2.5 py-0.5 bg-emerald-700 text-white font-semibold text-[10px] rounded-full uppercase">
                  Active Subscription
                </span>
                <h3 className="font-bold text-gray-900 text-base">Stage 1 Founding Subscriber</h3>
                
                {/* SERVER AUTHORITATIVE BADGE PREVIEW */}
                <div className="my-3 inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-emerald-300 shadow-sm">
                  <div className="w-3 h-3 rounded-full bg-emerald-600 animate-ping" />
                  <span className="font-extrabold text-xs text-gray-900">
                    FOUNDER #{userFoundingNumber || 'VERIFIED'}
                  </span>
                </div>

                <p className="text-[11px] text-emerald-800">
                  Your founding price lock of ₹25 is locked to your profile.
                </p>
              </div>

              {/* CANCELLATION TRIGGER */}
              <div className="border-t border-gray-200 pt-4 text-center">
                <button
                  onClick={() => setCurrentView('CANCEL_CONFIRM')}
                  className="text-red-600 hover:text-red-800 font-semibold text-xs transition-colors"
                >
                  Cancel Subscription
                </button>
              </div>
            </div>
          )}

          {/* ==========================================
              VIEW 4: MULTI-STEP CANCELLATION CONFIRMATION
             ========================================== */}
          {currentView === 'CANCEL_CONFIRM' && (
            <div className="space-y-4">
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 space-y-3">
                <h3 className="font-bold text-red-900 text-sm">Are you sure you want to cancel?</h3>
                <p className="text-xs text-red-800 leading-relaxed">
                  Current Plan: <span className="font-semibold">Stage 1 Founding Subscription (₹25)</span>
                </p>

                {/* 30-DAY DETENTION WARNING */}
                <div className="bg-white p-3 rounded-lg border border-red-200 text-[11px] text-gray-700 space-y-1.5">
                  <p className="font-bold text-red-700">30-Day Badge Holding Rule:</p>
                  <p>
                    Canceling within the first 30 days places your founding badge in a <strong>detained/held status</strong> according to program terms. It will not be treated as an active permanent badge during this period.
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentView('ACTIVE')}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2.5 rounded-xl font-bold text-xs uppercase"
                >
                  Keep Subscription
                </button>
                <button
                  onClick={() => {
                    onCancelSubscription();
                    onClose();
                  }}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-xl font-bold text-xs uppercase"
                >
                  Confirm Cancel
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

{/* ==========================================
    COMPONENT H: PROFILE PHOTO BADGE PLACEMENT
   ========================================== */}
export function ProfileAvatarWithBadge({ userPhotoUrl, isFoundingUser, foundingNumber }) {
  return (
    <div className="relative inline-block w-10 h-10 sm:w-12 sm:h-12">
      {/* Profile Photo */}
      <img
        src={userPhotoUrl || "https://api.dicebear.com/7.x/avataaars/svg?seed=FrameCraft"}
        alt="User Profile"
        className="w-full h-full rounded-full object-cover border-2 border-white shadow-sm"
      />

      {/* Badge Placement: Bottom-Right Corner */}
      {isFoundingUser && (
        <div 
          className="absolute -bottom-1 -right-1 bg-[#4a5d4e] text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded-full border-2 border-white shadow-md flex items-center justify-center min-w-[20px]"
          title={`Verified Founder #${foundingNumber}`}
        >
          #{foundingNumber}
        </div>
      )}
    </div>
  );
                        }
