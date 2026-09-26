import React, { useState } from 'react';

export default function App() {
  // Navigation & View State
  const [currentView, setCurrentView] = useState('home'); // 'home', 'family', 'pro', 'shop', 'profile', 'settings'
  const [familyTab, setFamilyTab] = useState('create'); // 'create', 'saved', 'export'
  const [proTab, setProTab] = useState('create'); // 'create', 'inventory', 'analytics'

  // Interactive Poll State
  const [selectedPollOption, setSelectedPollOption] = useState(null);
  const [pollVotes, setPollVotes] = useState({ 1: 142, 2: 389, 3: 97 });

  // Payment Modal State (Preserved Stage 1 Logic)
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [utrNumber, setUtrNumber] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');

  const handleVote = (optionId) => {
    if (!selectedPollOption) {
      setSelectedPollOption(optionId);
      setPollVotes(prev => ({ ...prev, [optionId]: prev[optionId] + 1 }));
    }
  };

  const handleUtrSubmit = (e) => {
    e.preventDefault();
    if (!utrNumber.trim()) return;
    setPaymentStatus('verifying');
    setTimeout(() => {
      setPaymentStatus('success');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col max-w-md mx-auto border-x border-slate-200 shadow-xl relative pb-10">
      
      {/* 1. HEADER */}
      <header className="bg-white border-b border-slate-200 px-4 py-3 sticky top-0 z-40 flex items-center justify-between">
        <div 
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => setCurrentView('home')}
        >
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black text-lg">
            F
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">FrameCraft</span>
        </div>

        <div className="flex items-center space-x-2">
          {/* Profile Access */}
          <button 
            onClick={() => setCurrentView('profile')}
            className={`p-2 rounded-full transition-colors ${currentView === 'profile' ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-100'}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </button>
          
          {/* Settings Access */}
          <button 
            onClick={() => setCurrentView('settings')}
            className={`p-2 rounded-full transition-colors ${currentView === 'settings' ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-100'}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
      </header>

      {/* VIEW CONTROLLER */}
      {currentView === 'home' && (
        <main className="p-4 space-y-6 flex-1">
          
          {/* Welcome Card */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-5 text-white shadow-md">
            <h2 className="text-2xl font-extrabold tracking-tight">FrameCraft Studio</h2>
            <p className="text-blue-100 text-sm mt-1">Select an edit mode or explore the ecosystem.</p>
          </div>

          {/* MODE SELECTION CARDS */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Select Editing Mode</h3>
            
            {/* 2. FAMILY MODE ENTRY POINT */}
            <div 
              onClick={() => setCurrentView('family')}
              className="bg-emerald-50 border border-emerald-200 hover:border-emerald-300 p-5 rounded-2xl cursor-pointer transition-all shadow-sm hover:shadow-md flex items-center justify-between"
            >
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-xl">🌿</span>
                  <h4 className="text-lg font-bold text-emerald-900">Family Mode</h4>
                </div>
                <p className="text-xs text-emerald-700">Simple, peaceful editing without complexity.</p>
                <div className="flex space-x-2 pt-2 text-[10px] font-semibold text-emerald-800">
                  <span className="bg-emerald-100 px-2 py-0.5 rounded">Create</span>
                  <span className="bg-emerald-100 px-2 py-0.5 rounded">Saved</span>
                  <span className="bg-emerald-100 px-2 py-0.5 rounded">Gallery Export</span>
                </div>
              </div>
              <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>

            {/* 3. PROFESSIONAL MODE ENTRY POINT */}
            <div 
              onClick={() => setCurrentView('pro')}
              className="bg-slate-900 border border-slate-800 text-white p-5 rounded-2xl cursor-pointer transition-all shadow-sm hover:shadow-md flex items-center justify-between"
            >
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-xl">⚡</span>
                  <h4 className="text-lg font-bold text-white">Professional Mode</h4>
                  <span className="bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">PRO</span>
                </div>
                <p className="text-xs text-slate-300">Advanced tools, analytics, & AI suite.</p>
                <div className="flex space-x-2 pt-2 text-[10px] font-semibold text-slate-300">
                  <span className="bg-slate-800 px-2 py-0.5 rounded">Workspace</span>
                  <span className="bg-slate-800 px-2 py-0.5 rounded">Inventory</span>
                  <span className="bg-slate-800 px-2 py-0.5 rounded">Analytics</span>
                </div>
              </div>
              <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          {/* 4. SHOP SECTION */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Marketplace</h3>
            <div 
              onClick={() => setCurrentView('shop')}
              className="bg-white border border-slate-200 hover:border-slate-300 p-4 rounded-xl cursor-pointer transition-all shadow-sm flex items-center justify-between"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2.5 bg-amber-50 text-amber-600 rounded-lg">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-800">FrameCraft Shop</h4>
                  <p className="text-xs text-slate-500">Premium templates, frames & PRO access</p>
                </div>
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); setShowPaymentModal(true); }}
                className="bg-blue-600 text-white font-bold text-xs px-3 py-1.5 rounded-lg hover:bg-blue-700"
              >
                ₹25 PRO
              </button>
            </div>
          </div>

          {/* 6. VOTING POLL (ACTIVE EXCEPTION) */}
          <div className="bg-white border border-slate-200 p-4 rounded-2xl space-y-3 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Community Poll</span>
              <span className="text-[10px] bg-blue-50 text-blue-600 font-semibold px-2 py-0.5 rounded-full">Active</span>
            </div>
            <h4 className="font-bold text-sm text-slate-900">Which feature should we build next?</h4>
            
            <div className="space-y-2">
              {[
                { id: 1, title: 'AI Background Removal' },
                { id: 2, title: 'Cinematic Video Overlay Filters' },
                { id: 3, title: 'Custom Typography Generator' }
              ].map(option => {
                const totalVotes = Object.values(pollVotes).reduce((a, b) => a + b, 0);
                const pct = Math.round((pollVotes[option.id] / totalVotes) * 100);
                const isSelected = selectedPollOption === option.id;

                return (
                  <button
                    key={option.id}
                    onClick={() => handleVote(option.id)}
                    className={`w-full text-left p-2.5 rounded-xl border transition-all text-xs relative overflow-hidden ${
                      isSelected ? 'border-blue-600 bg-blue-50/50' : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div 
                      className="absolute top-0 left-0 bottom-0 bg-blue-100/60 transition-all duration-500" 
                      style={{ width: `${pct}%` }} 
                    />
                    <div className="relative z-10 flex justify-between items-center">
                      <span className="font-medium text-slate-800">{option.title}</span>
                      <span className="font-bold text-slate-600">{pct}%</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 5. COMING SOON ECOSYSTEM FEATURES */}
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Ecosystem Roadmap</h3>
              <span className="text-[10px] bg-slate-200 text-slate-600 font-bold px-2 py-0.5 rounded-full">Future Releases</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { title: 'Clans', desc: 'Collaborative team editing spaces' },
                { title: 'Creator Marketplace', desc: 'Sell your custom frames & templates' },
                { title: 'Ad Workshop', desc: 'Monetized brand campaign frames' },
                { title: 'Creator Earnings', desc: 'Track payout & revenue streams' },
                { title: 'Business Suite', desc: 'Enterprise assets & white-labeling' }
              ].map((item, idx) => (
                <div key={idx} className="bg-slate-100/80 border border-slate-200 p-3 rounded-xl relative opacity-80">
                  <span className="absolute top-2 right-2 bg-slate-200 text-slate-600 text-[9px] font-extrabold px-1.5 py-0.5 rounded">
                    SOON
                  </span>
                  <h5 className="font-bold text-xs text-slate-800 pr-10">{item.title}</h5>
                  <p className="text-[10px] text-slate-500 mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </main>
      )}

      {/* 2. FAMILY MODE SUB-VIEW */}
      {currentView === 'family' && (
        <div className="p-4 space-y-4 flex-1">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <button 
              onClick={() => setCurrentView('home')} 
              className="text-xs font-bold text-slate-600 flex items-center space-x-1 hover:text-slate-900"
            >
              <span>← Back Home</span>
            </button>
            <span className="text-xs font-extrabold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full">
              Family Mode
            </span>
          </div>

          {/* Family Mode Sub-Tabs */}
          <div className="flex bg-slate-200 p-1 rounded-xl">
            {['create', 'saved', 'export'].map((tab) => (
              <button
                key={tab}
                onClick={() => setFamilyTab(tab)}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg capitalize transition-all ${
                  familyTab === tab ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-600'
                }`}
              >
                {tab === 'export' ? 'Export to Gallery' : tab}
              </button>
            ))}
          </div>

          {/* Family Mode Content */}
          <div className="bg-white border border-emerald-100 rounded-2xl p-6 text-center space-y-4 shadow-sm min-h-[300px] flex flex-col justify-center items-center">
            {familyTab === 'create' && (
              <>
                <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center text-2xl">
                  🖼️
                </div>
                <h3 className="font-bold text-slate-800">Family Photo Frame Editor</h3>
                <p className="text-xs text-slate-500 max-w-xs">Clean, simple photo frame selection for family memories.</p>
                <button className="bg-emerald-600 text-white font-bold text-xs px-5 py-2.5 rounded-xl hover:bg-emerald-700">
                  Select Photo
                </button>
              </>
            )}
      {/* 4. SHOP VIEW */}
      {currentView === 'shop' && (
        <div className="p-4 space-y-4 flex-1">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <button 
              onClick={() => setCurrentView('home')} 
              className="text-xs font-bold text-slate-600 hover:text-slate-900"
            >
              ← Back Home
            </button>
            <span className="text-xs font-extrabold text-amber-800 bg-amber-100 px-2.5 py-1 rounded-full">
              FrameCraft Shop
            </span>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-sm">
            <div className="border border-blue-100 bg-blue-50/50 p-4 rounded-xl space-y-2">
              <span className="text-[10px] font-bold bg-blue-600 text-white px-2 py-0.5 rounded">PRO PLAN</span>
              <h3 className="font-bold text-slate-900">FrameCraft Lifetime Pro</h3>
              <p className="text-xs text-slate-600">Unlock all professional editing features, unlimited AI models, and priority rendering.</p>
              <div className="pt-2 flex items-center justify-between">
                <span className="text-xl font-extrabold text-blue-600">₹25 <span className="text-xs font-normal text-slate-500">one-time</span></span>
                <button 
                  onClick={() => setShowPaymentModal(true)}
                  className="bg-blue-600 text-white font-bold text-xs px-4 py-2 rounded-xl"
                >
                  Get Pro
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PROFILE VIEW */}
      {currentView === 'profile' && (
        <div className="p-4 space-y-4 flex-1">
          <button onClick={() => setCurrentView('home')} className="text-xs font-bold text-slate-600">← Back Home</button>
          <div className="bg-white border border-slate-200 rounded-2xl p-6 text-center space-y-3">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-xl mx-auto">
              FC
            </div>
            <h3 className="font-bold text-slate-900">User Account</h3>
            <span className="inline-block text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-full">
              Free Plan User
            </span>
          </div>
        </div>
      )}

      {/* SETTINGS VIEW */}
      {currentView === 'settings' && (
        <div className="p-4 space-y-4 flex-1">
          <button onClick={() => setCurrentView('home')} className="text-xs font-bold text-slate-600">← Back Home</button>
          <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3">
            <h3 className="font-bold text-sm text-slate-900">Settings</h3>
            <div className="space-y-2 text-xs text-slate-600">
              <div className="p-2.5 bg-slate-50 rounded-lg flex justify-between">
                <span>App Version</span>
                <span className="font-bold text-slate-800">Stage 1.0</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-lg flex justify-between">
                <span>Database Sync</span>
                <span className="font-bold text-emerald-600">Connected</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PRESERVED STAGE 1 UPI PAYMENT MODAL */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-5 max-w-xs w-full space-y-4 shadow-2xl relative">
            <button 
              onClick={() => { setShowPaymentModal(false); setPaymentStatus(''); }}
              className="absolute top-3 right-3 text-slate-400 hover:text-slate-600 text-sm font-bold"
            >
              ✕
            </button>

            <div className="text-center space-y-1">
              <span className="text-xs font-bold text-blue-600 uppercase">Upgrade to Pro</span>
              <h3 className="font-bold text-lg text-slate-900">Pay ₹25 via UPI</h3>
              <p className="text-xs text-slate-500">Enter your UPI UTR/Transaction number after payment.</p>
            </div>

            {paymentStatus === 'success' ? (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-xl text-center space-y-1">
                <span className="text-xl">✅</span>
                <p className="font-bold text-xs">UTR Submitted!</p>
                <p className="text-[10px] text-emerald-600">Verification in progress via Supabase.</p>
              </div>
            ) : (
              <form onSubmit={handleUtrSubmit} className="space-y-3">
                <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl text-center">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">UPI ID</span>
                  <p className="font-mono text-xs font-bold text-slate-800 select-all">framecraft@upi</p>
                </div>

                <input
                  type="text"
                  placeholder="Enter 12-digit UTR Number"
                  value={utrNumber}
                  onChange={(e) => setUtrNumber(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  required
                />

                <button
                  type="submit"
                  disabled={paymentStatus === 'verifying'}
                  className="w-full bg-blue-600 text-white font-bold text-xs py-2.5 rounded-xl hover:bg-blue-700 transition-colors"
                >
                  {paymentStatus === 'verifying' ? 'Verifying...' : 'Submit UTR Verification'}
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
 
