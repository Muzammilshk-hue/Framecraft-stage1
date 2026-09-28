import React, { useState } from 'react';

function App() {
  // Preserved states from your backend/functionality protocol
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null); // null, 'verifying', 'success'
  const [utrNumber, setUtrNumber] = useState('');
  const [claimedSpots, setClaimedSpots] = useState(0);

  // New UI state for Media Type Selector
  const [mediaType, setMediaType] = useState('video'); // 'video' or 'photo'
  // Preserved Payment Handler
  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    setPaymentStatus('verifying');
    setTimeout(() => {
    setClaimedSpots(prev => prev + 1);
      setPaymentStatus('success');
      setTimeout(() => {
        setShowPaymentModal(false);
        setPaymentStatus(null);
        setUtrNumber('');
      }, 2000);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#fcfbf8] text-[#2c3329] font-sans pb-24">
      
      {/* 1. HEADER */}
      <header className="flex justify-between items-center p-4 border-b border-[#e9e8e2]">
        <div className="flex items-center space-x-3">
          <svg className="w-6 h-6 text-[#4a5d4e]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-lg tracking-wide uppercase">FrameCraft</span>
            <span className="text-[10px] border border-[#4a5d4e] rounded-full px-2 py-0.5 text-[#4a5d4e]">Stage 1</span>
          </div>
        </div>
        <div className="w-8 h-8 rounded-full border border-[#4a5d4e] flex items-center justify-center bg-gray-100">
          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
        </div>
      </header>

      {/* 2. PRIMARY TOP NAVIGATION */}
      <nav className="flex justify-around items-center px-2 py-3 border-b border-[#e9e8e2] bg-[#fcfbf8]">
        <button className="flex flex-col items-center text-[#4a5d4e] font-bold">
          <div className="px-4 py-1 bg-[#4a5d4e] text-white rounded-md text-xs mb-1 shadow-sm">HOME</div>
        </button>
        <button className="text-xs font-medium text-gray-400 uppercase">Projects</button>
        <button className="text-xs font-medium text-gray-400 uppercase">Resources</button>
        <button className="text-xs font-medium text-gray-400 uppercase">Settings</button>
      </nav>

      <main className="px-4 max-w-md mx-auto">
        
        {/* THE CALLING HEADER */}
        <div className="text-center my-6">
          <h1 className="text-3xl font-serif italic text-[#2c3329]">The Calling</h1>
          <p className="text-xs text-gray-400 tracking-widest mt-1">T E X T</p>
        </div>

                        {/* 3. HERO CARD: FOUNDING OFFER */}
        <div className="border border-[#e9e8e2] rounded-2xl bg-white p-5 shadow-sm relative">
          <div className="flex justify-between items-start mb-2">
            <div className="text-xs font-semibold text-[#4a5d4e] flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>
              Stage 1 Founding Offer
            </div>
            <div className="text-[10px] bg-gray-100 px-2 py-1 rounded text-gray-500 border border-gray-200">
              Limited to 2,500
            </div>
          </div>

          <div className="flex justify-between items-center mt-4">
            <div>
              {/* Dynamic Spot Number Starting at #1 */}
              <div className="text-3xl font-bold text-[#2c3329]">#{claimedSpots + 1} <span className="text-lg text-gray-400 font-normal">/ 2500</span></div>
              <div className="text-sm font-medium mt-1">₹25 <span className="text-gray-500">— Founding Subscription</span></div>
              <p className="text-[10px] text-gray-400 mt-2">Be one of the first 2,500 FrameCraft subscribers.</p>
            </div>
            
            {/* Sleek Circular Badge */}
            <div className="w-24 h-24 rounded-full bg-[#1a2e20] border-[3px] border-[#cda851] shadow-lg flex flex-col items-center justify-center flex-shrink-0">
              <span className="text-[9px] text-[#cda851] font-semibold tracking-wider mb-0.5">FRAMECRAFT</span>
              <span className="text-white font-bold text-2xl tracking-tight">#{claimedSpots + 1}</span>
              <span className="text-[10px] text-[#cda851] mt-0.5">1/2500</span>
            </div>
          </div>

          <div className="flex justify-between items-center mt-6 pt-4 border-t border-[#e9e8e2]">
             <div className="flex space-x-4">
                <div className="text-[10px] text-gray-500 flex flex-col items-center"><span className="text-[#2c3329] font-bold">#{claimedSpots + 1}</span> Founding Badge</div>
                <div className="text-[10px] text-gray-500 flex flex-col items-center"><span className="text-[#2c3329] font-bold flex items-center">🔒 ₹25</span> Price Locked</div>
             </div>
             {/* Dynamic Spots Remaining */}
             <div className="text-[10px] border border-gray-200 px-2 py-1 rounded text-gray-500 bg-gray-50">
               {2500 - claimedSpots} spots remaining
             </div>
          </div>

          <button 
            onClick={() => setShowPaymentModal(true)}
            className="w-full mt-4 bg-[#4a5d4e] text-white py-3 rounded-lg font-bold text-xs tracking-widest uppercase hover:bg-[#3f4f42] transition-colors"
          >
            Claim My Spot →
          </button>
          <p className="text-[8px] text-center text-gray-400 mt-2 leading-tight">
            After 2,500 founding spots are claimed, Stage 2 pricing begins.<br/>Founding price terms apply as stated in the subscription terms.
          </p>
        </div>
        
        
            
        

          
        

        {/* 4. MEDIA SELECTOR (VIDEO / PHOTO) */}
        <div className="flex bg-white border border-[#e9e8e2] rounded-full mt-6 p-1 shadow-sm">
          <button 
            onClick={() => setMediaType('video')}
            className={`flex-1 flex items-center justify-center py-2 rounded-full text-sm font-medium transition-colors ${mediaType === 'video' ? 'bg-[#4a5d4e] text-white' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            Video
          </button>
          <button 
            onClick={() => setMediaType('photo')}
            className={`flex-1 flex items-center justify-center py-2 rounded-full text-sm font-medium transition-colors ${mediaType === 'photo' ? 'bg-[#4a5d4e] text-white' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
            Photo
          </button>
        </div>

        {/* 5. ACTIVE STAGE 1 FEATURES */}
        <div className="mt-4 border border-[#e9e8e2] rounded-2xl bg-white p-4 shadow-sm flex flex-col space-y-4">
          
          {mediaType === 'video' ? (
            <>
              {/* VIDEO: Family and Professional Active */}
              <div className="flex items-center space-x-2 pb-3 border-b border-[#e9e8e2]">
                <div className="w-1/2">
                  <div className="flex items-center text-sm font-semibold text-[#2c3329] mb-3">
                    <svg className="w-4 h-4 mr-1 text-[#4a5d4e]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                    Family
                  </div>
                  <div className="flex space-x-3 text-gray-500">
                    <button className="hover:text-[#4a5d4e]"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg></button>
                    <button className="hover:text-[#4a5d4e]"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg></button>
                  </div>
                </div>
                <div className="w-px h-12 bg-[#e9e8e2]"></div>
                <div className="w-1/2 pl-4">
                  <div className="flex items-center text-sm font-semibold text-[#2c3329] mb-3">
                    <svg className="w-4 h-4 mr-1 text-[#4a5d4e]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                    Professional
                  </div>
                  <div className="flex space-x-3 text-gray-500">
                    <button className="hover:text-[#4a5d4e]"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg></button>
                    <button className="hover:text-[#4a5d4e]"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg></button>
                    <button className="hover:text-[#4a5d4e]"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg></button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
               {/* PHOTO: Only Photo Features Active */}
               <div className="flex flex-col items-center justify-center py-4">
                 <div className="text-sm font-semibold text-[#2c3329] mb-4">Photo Studio</div>
                 <div className="flex space-x-6 text-gray-500">
                    <button className="flex flex-col items-center hover:text-[#4a5d4e]">
                      <div className="w-10 h-10 border border-gray-200 rounded-lg flex items-center justify-center mb-1"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg></div>
                      <span className="text-[10px]">Create</span>
                    </button>
                    <button className="flex flex-col items-center hover:text-[#4a5d4e]">
                      <div className="w-10 h-10 border border-gray-200 rounded-lg flex items-center justify-center mb-1"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg></div>
                      <span className="text-[10px]">Saved</span>
                    </button>
                 </div>
               </div>
            </>
          )}

        </div>
      </main>

      {/* 6. BOTTOM / SECONDARY ECOSYSTEM (COMING SOON) */}
      <footer className="fixed bottom-0 w-full bg-[#fcfbf8] border-t border-[#e9e8e2] px-2 py-3 overflow-hidden">
        {/* COMING SOON WATERMARK */}
        <div className="absolute inset-0 flex items-center justify-center z-10 bg-white/40 backdrop-blur-[1px] pointer-events-none">
           <div className="bg-gray-100/90 border border-gray-200 text-gray-400 font-bold tracking-widest text-[10px] px-4 py-1 rounded-full transform -rotate-2">
             COMING SOON
           </div>
        </div>
        
        {/* Greyed out / disabled icons */}
        <div className="flex justify-around items-center opacity-40 grayscale pointer-events-none">
          <div className="flex flex-col items-center"><svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg><span className="text-[9px]">Clubs</span></div>
          <div className="flex flex-col items-center"><svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg><span className="text-[9px]">Shops</span></div>
          <div className="flex flex-col items-center bg-[#4a5d4e] text-white p-2 rounded-2xl"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg><span className="text-[9px] mt-1">Board</span></div>
          <div className="flex flex-col items-center"><svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2-2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg><span className="text-[9px]">Pole Voting</span></div>
          <div className="flex flex-col items-center"><svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg><span className="text-[9px]">Social</span></div>
        </div>
      </footer>

      {/* PRESERVED: Payment Modal (Your existing functionality) */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm">
            <h3 className="font-bold text-lg mb-4">Complete Payment</h3>
            <p className="text-sm text-gray-600 mb-4">Scan QR or transfer ₹25 via UPI, then enter your 12-digit UTR number below.</p>
            
            {paymentStatus === 'success' ? (
              <div className="text-green-600 font-bold text-center py-4 border border-green-200 bg-green-50 rounded-lg">
                Payment Verified! Spot Claimed.
              </div>
            ) : (
              <form onSubmit={handlePaymentSubmit} className="space-y-4">
                <input 
                  type="text" 
                  placeholder="Enter 12-digit UTR"
                  value={utrNumber}
                  onChange={(e) => setUtrNumber(e.target.value)}
                  required
                  className="w-full border p-2 rounded-lg"
                  maxLength={12}
                />
                <button 
                  type="submit" 
                  disabled={paymentStatus === 'verifying'}
                  className="w-full bg-[#4a5d4e] text-white py-2 rounded-lg font-bold"
                >
                  {paymentStatus === 'verifying' ? 'Verifying...' : 'Submit UTR'}
                </button>
                <button 
                  type="button"
                  onClick={() => setShowPaymentModal(false)}
                  className="w-full text-gray-500 text-sm mt-2"
                >
                  Cancel
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}

export default App;
        
