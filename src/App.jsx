import React, { useState } from 'react';
import {
  Aperture,
  BarChart3,
  BookOpen,
  Bookmark,
  Check,
  ChevronRight,
  CircleUserRound,
  Grid2X2,
  Home,
  Image,
  LockKeyhole,
  Plus,
  Sparkles,
  Star,
  X,
} from 'lucide-react';

const UPI_INTENT_URL = ""; // PLACEHOLDER for GPay/PhonePe UPI Intent integration in next phase

const POLL_OPTIONS = [
  'Automatic AI Captions & Template Store',
  'Improved Family Mode with Creator Ecosystem',
  'Custom LUT Color Grading & Multi-Track Audio',
  'Advanced AI Script & Voiceover Generator',
];

const COMPARISON_ROWS = [
  ['Workspace Editors', 'Full Access', 'Full Access'],
  ['FrameAI Assistant', 'Standard Guidance', 'Enhanced Gemini AI Engine'],
  ['Inventory Earning Slots', '0 Slots', '10 Lifetime Active Slots · 0 recurring fees'],
  ['Price Guarantee', 'Standard Future Pricing', '₹25 Rate Locked Forever'],
  ['Profile Recognition', 'Standard Avatar', 'Unique Circular Founder Badge'],
  ['Stage 2 FrameStore', 'Standard Access', 'Priority Creator & Template Publishing'],
];

function FounderAvatar({ isFounder }) {
  return (
    <div className="relative">
      <div className="flex size-11 items-center justify-center rounded-full border-2 border-emerald-700 bg-cream text-emerald-700">
        <CircleUserRound size={23} strokeWidth={1.7} />
      </div>
      {isFounder && (
        <span aria-label="Early Founder badge" className="absolute -bottom-1 -left-1 flex size-5 items-center justify-center rounded-full border-2 border-cream bg-gold text-[#4a3900] shadow-sm">
          <Star size={10} fill="currentColor" />
        </span>
      )}
    </div>
  );
}

function ActionButton({ icon: Icon, label, onClick }) {
  return (
    <button type="button" onClick={onClick} className="flex min-h-20 flex-col items-center justify-center gap-2 rounded-2xl border border-emerald-700/15 bg-cream px-2 py-3 text-xs font-bold text-emerald-700 transition hover:bg-emerald-50 active:scale-[.98]">
      <Icon size={21} strokeWidth={1.8} />
      {label}
    </button>
  );
}

function Modal({ onClose, onClaim }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-stone-950/45 p-0 sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-labelledby="welcome-title">
      <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-[2rem] bg-cream p-5 shadow-2xl sm:rounded-[2rem] sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div><p className="mb-1 text-xs font-bold uppercase tracking-[.18em] text-emerald-700">Stage 1 · Early access</p><h2 id="welcome-title" className="text-2xl font-black text-stone-900">Welcome, Creator! 👋</h2></div>
          <button type="button" onClick={onClose} aria-label="Close dialog" className="rounded-full p-2 text-stone-500 hover:bg-stone-200"><X size={20} /></button>
        </div>
        <p className="mt-5 text-sm leading-6 text-stone-600">Welcome to FrameCraft—a video editor built with powerful creator features. We are currently in Stage 1, and full ecosystem features are actively being developed. Further advanced features will unlock after reaching 4,500 subscribers.</p>
        <div className="mt-5 rounded-2xl border border-gold/40 bg-gold/10 p-4"><h3 className="font-bold text-stone-900">Early Founder Advantage</h3><p className="mt-1 text-sm leading-6 text-stone-700">Joining right now gives you a massive advantage. If you buy the ₹25 Introductory Subscription, your price is locked at ₹25 forever. Later developed stages will be significantly more expensive for new users (e.g., ₹169), but early founders will never pay more.</p></div>
        <p className="mt-5 text-sm leading-6 text-stone-600"><strong className="text-stone-900">Badge & Spot Counter:</strong> As an Early Founder, you also earn a Unique Circular Founder Badge that you can set on your profile photo. Secure your seat now to become subscriber <strong className="text-emerald-700">#3,470 / 4,500</strong>!</p>
        <div className="mt-5 overflow-hidden rounded-2xl border border-stone-200"><div className="grid grid-cols-[1.15fr_1fr_1fr] bg-stone-100 px-3 py-3 text-[10px] font-bold uppercase tracking-wider text-stone-500"><span>Feature</span><span>Freemium</span><span className="text-emerald-700">₹25 subscription</span></div>{COMPARISON_ROWS.map(([feature, free, paid]) => <div key={feature} className="grid grid-cols-[1.15fr_1fr_1fr] gap-2 border-t border-stone-200 px-3 py-3 text-[11px] leading-4"><span className="font-semibold text-stone-800">{feature}</span><span className="text-stone-500">{free}</span><span className="font-semibold text-emerald-700">{paid}</span></div>)}</div>
        <button type="button" onClick={onClaim} className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-700 py-3.5 text-sm font-bold text-white shadow-lg hover:bg-emerald-800">Claim my spot · ₹25 <ChevronRight size={17} /></button>
      </div>
    </div>
  );
}

export default function App() {
  const isFounder = true;
  const [mediaType, setMediaType] = useState('video');
  const [pollVote, setPollVote] = useState(null);
  const [isKnowMoreOpen, setIsKnowMoreOpen] = useState(false);
  const [toast, setToast] = useState('');

  const action = (name) => {
    setToast(`${name} is coming soon.`);
    window.setTimeout(() => setToast(''), 2200);
  };

  return (
    <div className="min-h-screen bg-[#f3efe7] pb-24 font-sans text-stone-900">
      <main className="mx-auto max-w-3xl px-4 py-5 sm:px-6">
        <header className="mb-6 flex items-center justify-between"><div className="flex items-center gap-2.5"><div className="flex size-10 items-center justify-center rounded-2xl bg-emerald-700 text-white shadow-sm"><Aperture size={23} /></div><div><p className="text-[10px] font-bold uppercase tracking-[.22em] text-emerald-700">Creator workspace</p><h1 className="text-lg font-black tracking-tight">FrameCraft Stage-1</h1></div></div><button type="button" aria-label="Open profile" onClick={() => action('Profile')}><FounderAvatar isFounder={isFounder} /></button></header>

        <section className="rounded-[1.75rem] border border-stone-200 bg-cream p-5 shadow-sm sm:p-6"><div className="flex items-center justify-between"><span className="rounded-full bg-gold/15 px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest text-[#8a6d0b]">✦ Stage 1 Founding Offer</span><span className="text-xs font-semibold text-emerald-700">₹25 forever</span></div><div className="mt-5 flex items-end justify-between gap-3"><div><p className="text-4xl font-black tracking-tight">Build before launch.</p><p className="mt-1 max-w-md text-sm text-stone-500">Join the first 4,500 creators shaping FrameCraft.</p></div><div className="text-right"><p className="text-lg font-black text-emerald-700">3,470 <span className="text-xs font-medium text-stone-400">/ 4,500</span></p><p className="text-[10px] font-semibold uppercase tracking-wide text-stone-400">subscribers claimed</p></div></div><div className="mt-4 h-2 overflow-hidden rounded-full bg-stone-200"><div className="h-full w-[77%] rounded-full bg-emerald-700" /></div><div className="mt-5 grid grid-cols-2 gap-2"><button type="button" onClick={() => setIsKnowMoreOpen(true)} className="rounded-2xl border border-emerald-700 py-3 text-sm font-bold text-emerald-700 hover:bg-emerald-50">Know More</button><button type="button" onClick={() => action('Claim')} className="rounded-2xl bg-emerald-700 py-3 text-sm font-bold text-white shadow-md hover:bg-emerald-800">Claim my spot · ₹25</button></div></section>

        <section className="mt-6"><div className="flex gap-1 rounded-full bg-stone-200 p-1">{[['video', 'Video'], ['photo', 'Photo']].map(([id, label]) => <button type="button" key={id} aria-pressed={mediaType === id} onClick={() => setMediaType(id)} className={`flex flex-1 items-center justify-center gap-2 rounded-full py-2.5 text-sm font-bold ${mediaType === id ? 'bg-emerald-700 text-white shadow' : 'text-stone-500'}`}>{id === 'video' ? <Sparkles size={16} /> : <Image size={16} />}{label}</button>)}</div></section>

        <section className="mt-6 flex flex-col gap-4">{mediaType === 'video' ? <><div className="rounded-3xl border border-stone-200 bg-cream p-5"><h2 className="font-black">Family Mode</h2><p className="mt-1 text-xs text-stone-500">Simple and fast. Make a video in a few taps.</p><div className="mt-4 grid grid-cols-2 gap-3"><ActionButton icon={Plus} label="Create" onClick={() => action('Create')} /><ActionButton icon={Bookmark} label="Saved" onClick={() => action('Saved')} /></div></div><div className="rounded-3xl border border-stone-200 bg-cream p-5"><h2 className="font-black">Professional Mode</h2><p className="mt-1 text-xs text-stone-500">Advanced tools for serious editing.</p><div className="mt-4 grid grid-cols-2 gap-3"><ActionButton icon={Plus} label="Create" onClick={() => action('Create')} /><ActionButton icon={Bookmark} label="Saved" onClick={() => action('Saved')} /><ActionButton icon={Grid2X2} label="Inventory" onClick={() => action('Inventory')} /><ActionButton icon={BarChart3} label="Analytics" onClick={() => action('Analytics')} /></div></div></> : <div className="rounded-3xl border border-stone-200 bg-cream p-5"><h2 className="font-black">Photo Mode</h2><p className="mt-1 text-xs text-stone-500">Create and manage your photo projects.</p><div className="mt-4 grid grid-cols-2 gap-3"><ActionButton icon={Plus} label="Create" onClick={() => action('Create')} /><ActionButton icon={Bookmark} label="Saved" onClick={() => action('Saved')} /></div></div>}</section>

        <section className="mt-6 rounded-3xl border border-stone-200 bg-cream p-5"><div className="flex items-center justify-between"><h2 className="font-black">Community Poll</h2><span className="rounded-full bg-emerald-700/10 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-emerald-700">Free for everyone</span></div><p className="mt-1 text-xs text-stone-500">What should we build next? Pick one.</p><div className="mt-4 flex flex-col gap-2">{POLL_OPTIONS.map((option) => <button type="button" role="radio" aria-checked={pollVote === option} key={option} onClick={() => setPollVote(option)} className={`flex items-center gap-3 rounded-2xl border px-3 py-3 text-left text-xs ${pollVote === option ? 'border-emerald-700 bg-emerald-50 font-bold' : 'border-stone-200 text-stone-600'}`}><span className={`flex size-5 shrink-0 items-center justify-center rounded-full border ${pollVote === option ? 'border-emerald-700 bg-emerald-700 text-white' : 'border-stone-300'}`}>{pollVote === option && <Check size={12} />}</span>{option}</button>)}</div></section>

        <section className="relative mt-6 overflow-hidden rounded-3xl border border-stone-200 bg-stone-900 p-6 text-white"><div className="pointer-events-none select-none blur-[2px] opacity-50"><div className="flex gap-3"><div className="h-20 flex-1 rounded-2xl bg-emerald-700/60" /><div className="h-20 flex-1 rounded-2xl bg-gold/60" /><div className="h-20 flex-1 rounded-2xl bg-white/20" /></div><div className="mt-4 h-3 w-2/3 rounded bg-white/20" /><div className="mt-2 h-3 w-1/2 rounded bg-white/10" /></div><div className="absolute inset-0 flex flex-col items-center justify-center bg-stone-950/30 text-center"><LockKeyhole size={22} className="mb-2 text-gold" /><h2 className="text-xl font-black">Shop <span className="text-gold">(Coming Soon)</span></h2><p className="mt-1 text-xs text-white/70">Stage 2 creator templates & assets</p></div></section>
      </main>
      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-stone-200 bg-cream/95 px-3 py-2 shadow-[0_-8px_25px_rgba(28,25,23,.08)] backdrop-blur"><div className="mx-auto flex max-w-3xl items-center justify-around"><button type="button" className="flex flex-col items-center gap-1 px-3 py-1 text-emerald-700"><Home size={19} /><span className="text-[10px] font-bold">Home</span></button><button type="button" onClick={() => setIsKnowMoreOpen(true)} className="flex flex-col items-center gap-1 px-3 py-1 text-stone-500"><BookOpen size={19} /><span className="text-[10px] font-bold">Learn More</span></button><button type="button" onClick={() => action('FrameAI')} className="flex flex-col items-center gap-1 px-3 py-1 text-stone-500"><Sparkles size={19} /><span className="text-[10px] font-bold">FrameAI</span></button><button type="button" onClick={() => action('Profile')} className="flex flex-col items-center gap-1 px-3 py-1 text-stone-500"><CircleUserRound size={19} /><span className="text-[10px] font-bold">Profile</span></button></div></nav>
      {isKnowMoreOpen && <Modal onClose={() => setIsKnowMoreOpen(false)} onClaim={() => { setIsKnowMoreOpen(false); action('Claim'); }} />}
      {toast && <div role="status" className="fixed bottom-20 left-1/2 z-50 -translate-x-1/2 rounded-full bg-stone-900 px-4 py-2 text-xs font-semibold text-white shadow-lg">{toast}</div>}
    </div>
  );
}
