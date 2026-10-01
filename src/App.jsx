import SubscriptionModal, { ProfileAvatarWithBadge } from './components/SubscriptionModal';

    import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

function App() {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null); // null, 'verifying', 'success'
  const [utrNumber, setUtrNumber] = useState('');
  const [claimedSpots, setClaimedSpots] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubModalOpen, setIsSubModalOpen] = useState(false);
    
  // Navigation / UI state
  const [mediaType, setMediaType] = useState('video'); // 'video' or 'photo'

  // Fetch live claimed spots count on mount & set up real-time sync
  useEffect(() => {
    fetchGlobalCount();

    // Subscribe to live database changes globally
    const channel = supabase
      .channel('realtime-transactions')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'transactions' },
        () => {
          fetchGlobalCount();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchGlobalCount = async () => {
    const { count, error } = await supabase
      .from('transactions')
      .select('*', { count: 'exact', head: true });

    if (!error && count !== null) {
      setClaimedSpots(count);
    }
  };

  // Real Database Payment Verification & Insertion
  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setPaymentStatus('verifying');

    const nextBadgeNumber = claimedSpots + 1;

    // Save transaction to Supabase
    const { error } = await supabase
      .from('transactions')
      .insert([{ utr_number: utrNumber, badge_number: nextBadgeNumber }]);

    if (error) {
      if (error.code === '23505') {
        setErrorMessage('This UTR number has already been used.');
      } else {
        setErrorMessage('Payment failed. Please check your UTR and try again.');
      }
      setPaymentStatus(null);
      return;
    }

    // Success
    setClaimedSpots(prev => prev + 1);
    setPaymentStatus('success');

    setTimeout(() => {
      setShowPaymentModal(false);
      setPaymentStatus(null);
      setUtrNumber('');
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

      {/* 2. TOP ECOSYSTEM NAV (COMING SOON UNIFORM) */}
      <div className="relative border-b border-[#e9e8e2] bg-[#fcfbf8] py-3 px-2 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center z-10 bg-white/40 backdrop-blur-[1px] pointer-events-none">
           <div className="bg-gray-100/90 border border-gray-200 text-gray-400 font-bold tracking-widest text-[10px] px-4 py-1 rounded-full transform -rotate-2">
             COMING SOON
           </div>
        </div>
        
        <div className="flex justify-around items-center opacity-40 grayscale pointer-events-none">
          <div className="flex flex-col items-center"><svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg><span className="text-[9px]">Clubs</span></div>
          <div className="flex flex-col items-center"><svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg><span className="text-[9px]">Shops</span></div>
          <div className="flex flex-col items-center"><svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg><span className="text-[9px]">Board</span></div>
          <div className="flex flex-col items-center"><svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2-2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg><span className="text-[9px]">Pole Voting</span></div>
          <div className="flex flex-col items-center"><svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg><span className="text-[9px]">Social</span></div>
        </div>
      </div>

      <main className="px-4 max-w-md mx-auto">
        
        {/* THE CALLING HEADER */}
        <div className="text-center my-6">
          <button
            type="button"
            onClick={() => setIsSubModalOpen(true)}
            className="mx-auto mb-3 flex items-center gap-2 px-3 py-1.5 bg-[#4a5d4e]/10 border border-[#4a5d4e]/30 hover:bg-[#4a5d4e]/20 rounded-full text-xs font-bold text-[#4a5d4e] transition-all"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            <span>Stage 1 Founding • ₹25</span>
          </button>
            
            
            
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
              <div className="text-3xl font-bold text-[#2c3329]">#{claimedSpots + 1} <span className="text-lg text-gray-400 font-normal">/ 2500</span></div>
              <div className="text-sm font-medium mt-1">₹25 <span className="text-gray-500">— Founding Subscription</span></div>
              <p className="text-[10px] text-gray-400 mt-2">Be one of the first 2,500 FrameCraft subscribers.</p>
            </div>
            
            {/* Live Synchronized Badge */}
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
             <div className="text-[10px] border border-gray-200 px-2 py-1 rounded text-gray-500 bg-gray-50">
               {2500 - claimedSpots} spots remaining
            
            <div className="text-[10px] border border-gray-200 px-2 py-1 rounded text-gray-500 bg-gray-50">
              {2500 - claimedSpots} spots remaining
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsSubModalOpen(true)}
            className="w-full mt-6 bg-[#4a5d4e] text-white py-3 rounded-lg font-bold text-xs tracking-widest uppercase flex items-center justify-center"
          >
            Claim My Spot →
          </button>

          <p className="text-[10px] text-stone-400 text-center mt-3">
            After 2,500 founding spots are claimed, Stage 2 pricing begins.<br />
            Founding price terms apply as stated in subscription terms.
          </p>
        </div>
      </div>
          
        

        {/* 4. MEDIA SELECTOR */}
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

        {/* 5. ACTIVE STAGE 1 WORKSPACE OPTIONS */}
        <div className="mt-4 border border-[#e9e8e2] rounded-2xl bg-white p-4 shadow-sm">
          {mediaType === 'video' ? (
            <div className="flex flex-col space-y-4">
              
              {/* FAMILY MODE */}
              <div className="pb-3 border-b border-[#e9e8e2]">
                <div className="flex items-center text-sm font-semibold text-[#2c3329] mb-3">
                  <svg className="w-4 h-4 mr-1 text-[#4a5d4e]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                  Family
                </div>
                <div className="flex space-x-6 text-gray-600">
                  <button onClick={() => alert('Family Create Mode Opened')} className="flex flex-col items-center hover:text-[#4a5d4e]">
                    <div className="w-8 h-8 border border-gray-200 rounded-lg flex items-center justify-center mb-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg></div>
                    <span className="text-[10px] font-medium">Create</span>
                  </button>
                  <button onClick={() => alert('Family Saved Library Opened')} className="flex flex-col items-center hover:text-[#4a5d4e]">
                    <div className="w-8 h-8 border border-gray-200 rounded-lg flex items-center justify-center mb-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg></div>
                    <span className="text-[10px] font-medium">Saved</span>
                  </button>
                </div>
              </div>

              {/* PROFESSIONAL MODE */}
              <div>
                <div className="flex items-center text-sm font-semibold text-[#2c3329] mb-3">
                  <svg className="w-4 h-4 mr-1 text-[#4a5d4e]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                  Professional
                </div>
                <div className="flex space-x-5 text-gray-600">
                  <button onClick={() => alert('Pro Create Studio Opened')} className="flex flex-col items-center hover:text-[#4a5d4e]">
                    <div className="w-8 h-8 border border-gray-200 rounded-lg flex items-center justify-center mb-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg></div>
                    <span className="text-[10px] font-medium">Create</span>
                  </button>
                  <button onClick={() => alert('Pro Saved Assets Opened')} className="flex flex-col items-center hover:text-[#4a5d4e]">
                    <div className="w-8 h-8 border border-gray-200 rounded-lg flex items-center justify-center mb-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg></div>
                    <span className="text-[10px] font-medium">Saved</span>
                  </button>
                  <button onClick={() => alert('Pro Inventory Opened')} className="flex flex-col items-center hover:text-[#4a5d4e]">
                    <div className="w-8 h-8 border border-gray-200 rounded-lg flex items-center justify-center mb-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg></div>
                    <span className="text-[10px] font-medium">Inventory</span>
                  </button>
                  <button onClick={() => alert('Pro Analytics Dashboard Opened')} className="flex flex-col items-center hover:text-[#4a5d4e]">
                    <div className="w-8 h-8 border border-gray-200 rounded-lg flex items-center justify-center mb-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg></div>
                    <span className="text-[10px] font-medium">Analytics</span>
                  </button>
                </div>
              </div>

            </div>
          ) : (
            /* PHOTO MODE */
            <div className="flex flex-col items-center justify-center py-4">
              <div className="text-sm font-semibold text-[#2c3329] mb-4">Photo Studio</div>
              <div className="flex space-x-6 text-gray-600">
                 <button onClick={() => alert('Photo Create Studio Opened')} className="flex flex-col items-center hover:text-[#4a5d4e]">
                   <div className="w-10 h-10 border border-gray-200 rounded-lg flex items-center justify-center mb-1"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg></div>
                   <span className="text-[10px] font-medium">Create</span>
                 </button>
                 <button onClick={() => alert('Photo Saved Assets Opened')} className="flex flex-col items-center hover:text-[#4a5d4e]">
                   <div className="w-10 h-10 border border-gray-200 rounded-lg flex items-center justify-center mb-1"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg></div>
                   <span className="text-[10px] font-medium">Saved</span>
                 </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* 6. BOTTOM PRIMARY NAV */}
      <footer className="fixed bottom-0 w-full bg-[#fcfbf8] border-t border-[#e9e8e2] px-2 py-3 z-40">
        <nav className="flex justify-around items-center max-w-md mx-auto">
          <button className="flex flex-col items-center text-[#4a5d4e] font-bold">
            <div className="px-4 py-1.5 bg-[#4a5d4e] text-white rounded-md text-xs shadow-sm">HOME</div>
          </button>
          <button onClick={() => alert('Projects section coming soon')} className="text-xs font-medium text-gray-400 uppercase tracking-wider">Projects</button>
          <button onClick={() => alert('Resources section coming soon')} className="text-xs font-medium text-gray-400 uppercase tracking-wider">Resources</button>
          <button onClick={() => alert('Settings section coming soon')} className="text-xs font-medium text-gray-400 uppercase tracking-wider">Settings</button>
        </nav>
      </footer>

            {/* REAL STAGE 1 SUBSCRIPTION MODAL */}
      <SubscriptionModal
        isOpen={isSubModalOpen}
        onClose={() => setIsSubModalOpen(false)}
        claimedSpots={claimedSpots}
        maxSpots={4500}
        isSubscribed={paymentStatus === 'success'}
        userFoundingNumber={claimedSpots}
        onProcessPayment={handlePaymentSubmit}
        paymentStatus={paymentStatus}
        errorMessage={errorMessage}
        utrNumber={utrNumber}
        setUtrNumber={setUtrNumber}
        onCancelSubscription={() => setPaymentStatus(null)}
      />
    
      )}

    </div>
  );
}

export default App;

