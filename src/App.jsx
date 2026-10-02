import React, { useState } from 'react';
import SubscriptionModal from './components/SubscriptionModal';

export default function App() {
  const [isSubModalOpen, setIsSubModalOpen] = useState(false);
  const [mediaType, setMediaType] = useState('video');
  const [claimedSpots, setClaimedSpots] = useState(1);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [utrNumber, setUtrNumber] = useState('');

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    if (!utrNumber || utrNumber.length < 12) {
      setErrorMessage('Please enter a valid 12-digit UTR number.');
      return;
    }
    setErrorMessage('');
    setPaymentStatus('verifying');

    setTimeout(() => {
      setPaymentStatus('success');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#fcfbf9] text-[#2c3329] font-sans pb-24">
      {/* 1. HEADER */}
      <header className="flex justify-between items-center p-4 border-b border-[#ebe8e2]">
        <div className="flex items-center space-x-3">
          <svg className="w-6 h-6 text-[#4a5d4e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-lg tracking-wide uppercase">FrameCraft</span>
            <span className="text-[10px] border border-[#4a5d4e] rounded-full px-2 py-0.5 text-[#4a5d4e]">Stage 1</span>
          </div>
        </div>
        <div className="w-8 h-8 rounded-full border border-[#4a5d4e] flex items-center justify-center bg-gray-100">
          <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
      </header>

      {/* 2. TOP ECOSYSTEM ROW */}
      <div className="relative border-b border-[#ebe8e2] bg-[#fcfbf9] py-3 px-2 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center z-10 bg-white/40 backdrop-blur-[1px] pointer-events-none">
          <div className="bg-gray-100/90 border border-gray-200 text-gray-400 font-bold tracking-widest text-[10px] px-4 py-1 rounded-full uppercase">
            COMING SOON
          </div>
        </div>
        <div className="flex justify-around items-center opacity-40 grayscale pointer-events-none">
          <div className="flex flex-col items-center"><svg className="w-5 h-5 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg></div>
          <div className="flex flex-col items-center"><svg className="w-5 h-5 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg></div>
          <div className="flex flex-col items-center"><svg className="w-5 h-5 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg></div>
          <div className="flex flex-col items-center"><svg className="w-5 h-5 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg></div>
        </div>
      </div>

      <main className="px-4 max-w-md mx-auto">
        {/* THE CALLING HEADER */}
        <div className="text-center my-6">
          <button
            type="button"
            onClick={() => setIsSubModalOpen(true)}
            className="mx-auto mb-3 flex items-center gap-2 px-3 py-1.5 bg-[#4a5d4e]/10 border border-[#4a5d4e]/30 hover:bg-[#4a5d4e]/20 text-[#4a5d4e] rounded-full text-xs font-semibold transition"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            <span>Stage 1 Founding • ₹25</span>
          </button>
          <h1 className="text-3xl font-serif italic text-[#2c3329]">The Calling</h1>
          <p className="text-xs text-gray-400 tracking-widest mt-1">TEXT</p>
        </div>

        {/* 3. MAIN OFFER CARD */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#ebe8e2] mb-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#2c3329]">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              Stage 1 Founding Offer
            </div>
            <div className="text-[10px] bg-gray-100 px-2 py-1 rounded text-gray-500 border border-gray-200">
              Limited to 2,500
            </div>
          </div>

          <div className="flex justify-between items-center my-4">
            <div>
              <div className="text-3xl font-bold text-[#2c3329]">
                #{claimedSpots} <span className="text-lg text-gray-400 font-normal">/ 2500</span>
              </div>
              <div className="text-sm font-medium mt-1 text-[#2c3329]">
                ₹25 — Founding Subscription
              </div>
              <p className="text-xs text-gray-400 mt-1 max-w-[200px]">
                Be one of the first 2,500 FrameCraft subscribers.
              </p>
            </div>
            <div className="w-20 h-20 rounded-full bg-[#1c241b] border-2 border-[#c5a059] flex flex-col items-center justify-center text-center p-2 shadow-md">
              <span className="text-[8px] uppercase tracking-widest text-[#c5a059] font-semibold">FRAMECRAFT</span>
              <span className="text-lg font-bold text-white leading-none my-0.5">#{claimedSpots}</span>
              <span className="text-[8px] text-[#c5a059]">{claimedSpots}/2500</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs py-3 border-t border-b border-gray-100 my-4 text-stone-600">
            <div className="text-center">
              <div className="font-semibold text-stone-800">#{claimedSpots}</div>
              <div className="text-[10px] text-stone-400">Founding Badge</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-stone-800">🔒 ₹25</div>
              <div className="text-[10px] text-stone-400">Price Locked</div>
            </div>
            <div className="text-center bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
              <div className="font-semibold text-stone-800">{2500 - claimedSpots} spots remaining</div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsSubModalOpen(true)}
            className="w-full py-3 bg-[#4a5d4e] hover:bg-[#3d4d40] text-white font-semibold text-xs tracking-wider uppercase rounded-xl transition shadow-sm"
          >
            CLAIM MY SPOT →
          </button>

          <p className="text-[10px] text-gray-400 text-center mt-3">
            After 2,500 founding spots are claimed, Stage 2 pricing begins. Founding price terms apply as stated in subscription terms.
          </p>
        </div>

        {/* 4. MEDIA SELECTOR */}
        <div className="max-w-md mx-auto px-4 mb-6">
          <div className="bg-[#eaece9] p-1 rounded-full flex gap-1">
            <button
              type="button"
              onClick={() => setMediaType('video')}
              className={`flex-1 py-2 rounded-full font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                mediaType === 'video' ? 'bg-[#4a5d4e] text-white shadow-sm' : 'text-stone-600'
              }`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Video
            </button>
            <button
              type="button"
              onClick={() => setMediaType('photo')}
              className={`flex-1 py-2 rounded-full font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                mediaType === 'photo' ? 'bg-[#4a5d4e] text-white shadow-sm' : 'text-stone-600'
              }`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Photo
            </button>
          </div>
        </div>

        {/* 5. WORKSPACE CONTAINER (Stacked Vertical Columns) */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#ebe8e2] mb-24 space-y-8">
          
          {/* FAMILY SECTION */}
          <div>
            <h3 className="text-sm font-semibold text-[#2c3329] mb-6 flex items-center gap-2">
              <svg className="w-4 h-4 text-stone-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              Family
            </h3>
            <div className="flex flex-col items-center space-y-6">
              {/* Create */}
              <div className="flex flex-col items-center">
                <button type="button" className="w-14 h-14 rounded-2xl bg-[#f8f8f7] border border-stone-200 flex items-center justify-center text-stone-600 hover:bg-stone-100 transition shadow-sm mb-1.5">
                  <span className="text-2xl leading-none font-light">+</span>
                </button>
                <span className="text-xs text-stone-500 font-medium">Create</span>
              </div>

              {/* Saved */}
              <div className="flex flex-col items-center">
                <button type="button" className="w-14 h-14 rounded-2xl bg-[#f8f8f7] border border-stone-200 flex items-center justify-center text-stone-600 hover:bg-stone-100 transition shadow-sm mb-1.5">
                  <svg className="w-6 h-6 stroke-[1.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                </button>
                <span className="text-xs text-stone-500 font-medium">Saved</span>
              </div>
            </div>
          </div>

          {/* PROFESSIONAL SECTION - Only visible in Video mode */}
          {mediaType === 'video' && (
            <div className="pt-4 border-t border-stone-100">
              <h3 className="text-sm font-semibold text-[#2c3329] mb-6 flex items-center gap-2">
                <svg className="w-4 h-4 text-stone-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2H4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Professional
              </h3>
              <div className="flex flex-col items-center space-y-6">
                {/* 1. Analytics */}
                <div className="flex flex-col items-center">
                  <button type="button" className="w-14 h-14 rounded-2xl bg-[#f8f8f7] border border-stone-200 flex items-center justify-center text-stone-600 hover:bg-stone-100 transition shadow-sm mb-1.5">
                    <svg className="w-6 h-6 stroke-[1.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </button>
                  <span className="text-xs text-stone-500 font-medium">Analytics</span>
                </div>

                {/* 2. Inventory */}
                <div className="flex flex-col items-center">
                  <button type="button" className="w-14 h-14 rounded-2xl bg-[#f8f8f7] border border-stone-200 flex items-center justify-center text-stone-600 hover:bg-stone-100 transition shadow-sm mb-1.5">
                    <svg className="w-6 h-6 stroke-[1.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </button>
                  <span className="text-xs text-stone-500 font-medium">Inventory</span>
                </div>

                {/* 3. Create */}
                <div className="flex flex-col items-center">
                  <button type="button" className="w-14 h-14 rounded-2xl bg-[#f8f8f7] border border-stone-200 flex items-center justify-center text-stone-600 hover:bg-stone-100 transition shadow-sm mb-1.5">
                    <span className="text-2xl leading-none font-light">+</span>
                  </button>
                  <span className="text-xs text-stone-500 font-medium">Create</span>
                </div>

                {/* 4. Saved */}
                <div className="flex flex-col items-center">
                  <button type="button" className="w-14 h-14 rounded-2xl bg-[#f8f8f7] border border-stone-200 flex items-center justify-center text-stone-600 hover:bg-stone-100 transition shadow-sm mb-1.5">
                    <svg className="w-6 h-6 stroke-[1.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                  </button>
                  <span className="text-xs text-stone-500 font-medium">Saved</span>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* 6. BOTTOM PRIMARY NAV */}
      <footer className="fixed bottom-0 w-full bg-[#fcfbf9] border-t border-stone-200 py-3 px-4 z-40">
        <nav className="flex justify-around items-center max-w-md mx-auto text-[11px] font-semibold uppercase tracking-wider text-stone-500">
          <button type="button" className="px-3 py-1.5 bg-[#4a5d4e] text-white rounded-lg font-bold">
            HOME
          </button>
          <button type="button" className="px-3 py-1.5 hover:text-stone-800 transition">
            PROJECTS
          </button>
          <button type="button" className="px-3 py-1.5 hover:text-stone-800 transition">
            RESOURCES
          </button>
          <button type="button" className="px-3 py-1.5 hover:text-stone-800 transition">
            SETTINGS
          </button>
        </nav>
      </footer>

      {/* 7. SUBSCRIPTION MODAL */}
      <SubscriptionModal
        isOpen={isSubModalOpen}
        onClose={() => setIsSubModalOpen(false)}
        claimedSpots={claimedSpots}
        maxSpots={2500}
        isSubscribed={paymentStatus === 'success'}
        userFoundingNumber={claimedSpots}
        onProcessPayment={handlePaymentSubmit}
        paymentStatus={paymentStatus}
        errorMessage={errorMessage}
        utrNumber={utrNumber}
        setUtrNumber={setUtrNumber}
      />
    </div>
  );
        }
                  
