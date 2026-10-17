import React, { useState, useEffect, useRef } from 'react';
import SubscriptionModal from './components/SubscriptionModal';

/* -------------------------------------------------------------------------- */
/*  CONSTANTS                                                                 */
/* -------------------------------------------------------------------------- */

const MAX_SPOTS = 4500;
const TRIAL_SECONDS = 48 * 3600;

// Palette: Emerald #047857 (primary), Rich Cream #FDFBF7 (background/cards), Gold #D4AF37 (founder highlights)
const STORAGE_KEYS = {
  mediaType: 'framecraft:mediaType:v1',
  trialStart: 'framecraft:trialStartedAt:v1',
  pollVote: 'framecraft:pollVote:v1',
};

const POLL_OPTIONS = [
  { id: 'ai-captions-template-store', label: 'Automatic AI Captions & Template Store' },
  { id: 'family-mode-creator-ecosystem', label: 'Improved Family Mode with Creator Ecosystem' },
  { id: 'lut-grading-multitrack-audio', label: 'Custom LUT Color Grading & Multi-Track Audio' },
  { id: 'ai-script-voiceover', label: 'Advanced AI Script & Voiceover Generator' },
];

const COMPARISON_ROWS = [
  { feature: 'Workspace Editors', free: 'Full Access', paid: 'Full Access' },
  { feature: 'FrameAI Assistant', free: 'Standard Guidance', paid: 'Enhanced Gemini AI Engine' },
  {
    feature: 'Inventory Earning Slots',
    free: '0 Slots',
    paid: '10 Lifetime Active Slots',
    paidNote: '0 recurring fees',
  },
  { feature: 'Price Guarantee', free: 'Standard Future Pricing', paid: '₹25 Rate Locked Forever' },
  { feature: 'Profile Recognition', free: 'Standard Avatar', paid: 'Unique Circular Founder Badge' },
  {
    feature: 'Stage 2 FrameStore',
    free: 'Standard Access',
    paid: 'Priority Creator & Template Publishing',
  },
];

const NAV_TABS = [
  { id: 'home', label: 'Home', icon: 'home' },
  { id: 'learn', label: 'Learn More / Legal Terms', short: 'Learn', icon: 'book' },
  { id: 'ai', label: 'FrameAI', icon: 'sparkles' },
  { id: 'profile', label: 'Profile', icon: 'user' },
];

/* -------------------------------------------------------------------------- */
/*  SAFE localStorage HELPERS (private mode / blocked storage never crashes)  */
/* -------------------------------------------------------------------------- */

function readStorage(key) {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeStorage(key, value) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* storage unavailable: keep working in memory */
  }
}

// Trial start is persisted so the countdown survives reloads.
// If storage is blocked, an in-memory fallback keeps the timer ticking for this session.
let trialStartFallback = null;

function getTrialStart() {
  const stored = Number(readStorage(STORAGE_KEYS.trialStart));
  if (stored > 0) return stored;
  if (trialStartFallback) return trialStartFallback;
  const now = Date.now();
  trialStartFallback = now;
  writeStorage(STORAGE_KEYS.trialStart, String(now));
  return now;
}

function getTrialSecondsLeft() {
  const elapsed = Math.floor((Date.now() - getTrialStart()) / 1000);
  return Math.max(0, TRIAL_SECONDS - elapsed);
}

function formatClock(totalSeconds) {
  const hrs = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  const mins = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  const secs = String(totalSeconds % 60).padStart(2, '0');
  return `${hrs}:${mins}:${secs}`;
}

/* -------------------------------------------------------------------------- */
/*  ICONS (inline SVG, no icon library)                                       */
/* -------------------------------------------------------------------------- */

const ICON_PATHS = {
  aperture: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="m14.31 8 5.74 9.94" />
      <path d="M9.69 8h11.48" />
      <path d="m7.38 12 5.74-9.94" />
      <path d="M9.69 16 3.95 6.06" />
      <path d="M14.31 16H2.83" />
      <path d="m16.62 12-5.74 9.94" />
    </>
  ),
  user: <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />,
  home: <path d="M3 10.5 12 3l9 7.5V20a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1v-9.5z" />,
  book: (
    <path d="M4 19.5v-15A2.5 2.5 0 016.5 2H19a1 1 0 011 1v18a1 1 0 01-1 1H6.5a1 1 0 010-5H20" />
  ),
  sparkles: (
    <path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  bookmark: <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />,
  grid: (
    <path d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
  ),
  chart: (
    <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  ),
  star: <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  check: <path d="M5 13l4 4L19 7" />,
  video: (
    <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
  ),
  photo: (
    <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
  ),
};

function Icon({ name, className = 'w-5 h-5', filled = false, strokeWidth = 1.8 }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICON_PATHS[name]}
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  SMALL PRESENTATIONAL COMPONENTS                                           */
/* -------------------------------------------------------------------------- */

// FLOOR 1 helper: circular profile avatar with gold founder badge on the bottom-left edge.
function ProfileAvatar({ isFounder, founderRank, size = 'md', onClick }) {
  const sizes = {
    md: { box: 'w-10 h-10', icon: 'w-5 h-5', badge: 'w-[18px] h-[18px]', badgeIcon: 'w-2.5 h-2.5' },
    lg: { box: 'w-20 h-20', icon: 'w-9 h-9', badge: 'w-8 h-8', badgeIcon: 'w-4 h-4' },
  }[size];

  const content = (
    <>
      <span
        className={`${sizes.box} rounded-full border-2 border-[#047857] bg-[#FDFBF7] text-[#047857] flex items-center justify-center`}
      >
        <Icon name="user" className={sizes.icon} />
      </span>
      {isFounder && (
        <span
          title={`Founder ${founderRank}`}
          role="img"
          aria-label={`Founder badge ${founderRank}`}
          className={`absolute -bottom-1 -left-1 ${sizes.badge} rounded-full bg-[#D4AF37] border-2 border-[#FDFBF7] text-[#3b2f05] flex items-center justify-center shadow`}
        >
          <Icon name="star" className={sizes.badgeIcon} filled strokeWidth={1} />
        </span>
      )}
    </>
  );

  if (!onClick) return <div className="relative inline-flex">{content}</div>;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Open profile"
      className="relative inline-flex rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#047857] focus-visible:ring-offset-2"
    >
      {content}
    </button>
  );
}

// Persisted 48h trial countdown. Isolated so only this node re-renders every second.
function TrialCountdown() {
  const [secondsLeft, setSecondsLeft] = useState(() => getTrialSecondsLeft());

  useEffect(() => {
    const id = setInterval(() => setSecondsLeft(getTrialSecondsLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex items-center justify-between rounded-xl border border-[#047857]/20 bg-[#047857]/5 px-3 py-2 text-xs">
      <span className="font-medium text-stone-600">Trial time left</span>
      <span className="font-mono font-semibold text-[#047857]">
        {secondsLeft > 0 ? formatClock(secondsLeft) : 'Trial ended'}
      </span>
    </div>
  );
}

// FLOOR 4 helper: one direct-action button (no dropdowns, arrows or nested menus).
function ActionButton({ icon, label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex min-h-[88px] flex-col items-center justify-center gap-2 rounded-2xl border border-[#047857]/20 bg-[#FDFBF7] px-3 py-4 text-sm font-semibold text-[#047857] shadow-sm transition active:scale-[0.98] hover:bg-[#047857]/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#047857]"
    >
      <Icon name={icon} className="h-6 w-6" strokeWidth={1.7} />
      {label}
    </button>
  );
}

function ModeCard({ title, description, children }) {
  return (
    <section className="rounded-3xl border border-stone-200 bg-[#FDFBF7] p-5 shadow-sm">
      <h3 className="text-base font-bold text-stone-900">{title}</h3>
      <p className="mb-4 mt-0.5 text-xs text-stone-500">{description}</p>
      <div className="grid grid-cols-2 gap-3">{children}</div>
    </section>
  );
}

function PlaceholderPanel({ title, children }) {
  return (
    <section className="rounded-3xl border border-stone-200 bg-[#FDFBF7] p-6 shadow-sm">
      <h2 className="text-xl font-bold text-stone-900">{title}</h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-stone-600">{children}</div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  APP                                                                       */
/* -------------------------------------------------------------------------- */

export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  // [BADGE INTEGRATION PLACEHOLDER] flip isFounder from the verified-payment result in the next phase.
  const [isFounder, setIsFounder] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [founderRank, setFounderRank] = useState('#0001');

  // Founding spots (counter is local until a backend source exists).
  // eslint-disable-next-line no-unused-vars
  const [claimedSpots, setClaimedSpots] = useState(3470);

  // Modals
  const [isKnowMoreOpen, setIsKnowMoreOpen] = useState(false);
  const [isSubModalOpen, setIsSubModalOpen] = useState(false);

  // Subscription flow state (props consumed by SubscriptionModal)
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [utrNumber, setUtrNumber] = useState('');

  // FLOOR 3: Video / Photo, persisted locally.
  const [mediaType, setMediaType] = useState(() => {
    const stored = readStorage(STORAGE_KEYS.mediaType);
    return stored === 'photo' ? 'photo' : 'video';
  });

  // FLOOR 5: poll choice, persisted locally. Ignores values that are not a current option.
  const [pollVote, setPollVote] = useState(() => {
    const stored = readStorage(STORAGE_KEYS.pollVote);
    return POLL_OPTIONS.some((o) => o.id === stored) ? stored : null;
  });

  // Lightweight toast for actions that do not have a screen yet.
  const [toast, setToast] = useState('');
  const toastTimer = useRef(null);

  useEffect(() => {
    writeStorage(STORAGE_KEYS.mediaType, mediaType);
  }, [mediaType]);

  useEffect(() => () => clearTimeout(toastTimer.current), []);

  // Know More modal: lock page scroll behind it and close on Escape.
  useEffect(() => {
    if (!isKnowMoreOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setIsKnowMoreOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isKnowMoreOpen]);

  const showToast = (message) => {
    setToast(message);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(''), 2200);
  };

  const handleAction = (label) => showToast(`${label} is coming soon.`);

  const handleVote = (optionId) => {
    setPollVote(optionId);
    writeStorage(STORAGE_KEYS.pollVote, optionId);
  };

  const openClaimFlow = () => {
    setIsKnowMoreOpen(false);
    setIsSubModalOpen(true);
  };

  // Subscription flow handler (submit handler for SubscriptionModal).
  const handlePaymentSubmit = (e) => {
    e.preventDefault();

    // [UPI INTENT PAYMENT PLACEHOLDER]
    // Next phase: launch this intent for GPay / PhonePe / Paytm, process the ₹25 transaction,
    // and verify the UTR server-side. Until then the verification below is SIMULATED.
    const UPI_INTENT_URL = ''; // PLACEHOLDER: Will be configured in next step for GPay/PhonePe/Paytm intent execution
    void UPI_INTENT_URL;

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

  const spotsRemaining = Math.max(0, MAX_SPOTS - claimedSpots);
  const spotsPercent = Math.min(100, Math.round((claimedSpots / MAX_SPOTS) * 100));

  /* ------------------------------ HOME SCREEN ------------------------------ */

  const renderHome = () => (
    <div className="space-y-6">
      {/* FLOOR 2: SHOWCASE CARD */}
      <section className="rounded-3xl border border-stone-200 bg-[#FDFBF7] p-5 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#D4AF37]/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#8a6d0b]">
            <Icon name="star" className="h-3 w-3" filled strokeWidth={1} />
            Stage 1 Founding Offer
          </span>
        </div>

        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-3xl font-extrabold text-stone-900">₹25</p>
            <p className="text-xs text-stone-500">Introductory Subscription · price locked forever</p>
          </div>
          <div className="shrink-0 whitespace-nowrap text-right">
            <p className="text-lg font-bold text-[#047857]">
              {claimedSpots.toLocaleString('en-US')}
              <span className="text-sm font-medium text-stone-400"> / {MAX_SPOTS.toLocaleString('en-US')}</span>
            </p>
            <p className="text-[11px] text-stone-500">{spotsRemaining.toLocaleString('en-US')} spots left</p>
          </div>
        </div>

        <div
          className="mt-3 h-2 w-full overflow-hidden rounded-full bg-stone-200"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={MAX_SPOTS}
          aria-valuenow={claimedSpots}
          aria-label="Founding spots claimed"
        >
          <div className="h-full rounded-full bg-[#047857]" style={{ width: `${spotsPercent}%` }} />
        </div>

        <div className="mt-4">
          <TrialCountdown />
        </div>

        <button
          type="button"
          onClick={() => setIsKnowMoreOpen(true)}
          className="mt-4 w-full rounded-2xl bg-[#047857] py-3.5 text-sm font-bold uppercase tracking-wider text-white shadow-md transition hover:bg-[#065f46] active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#047857] focus-visible:ring-offset-2"
        >
          Know More
        </button>
        <button
          type="button"
          onClick={() => setIsSubModalOpen(true)}
          className="mt-2 w-full rounded-2xl border border-[#047857] py-3 text-xs font-bold uppercase tracking-wider text-[#047857] transition hover:bg-[#047857]/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#047857]"
        >
          Claim my spot · ₹25
        </button>
      </section>

      {/* FLOOR 3: MODE TOGGLE SWITCH */}
      <div
        role="group"
        aria-label="Media type"
        className="flex gap-1 rounded-full bg-stone-200/70 p-1"
      >
        {[
          { id: 'video', label: 'Video', icon: 'video' },
          { id: 'photo', label: 'Photo', icon: 'photo' },
        ].map((option) => {
          const active = mediaType === option.id;
          return (
            <button
              key={option.id}
              type="button"
              aria-pressed={active}
              onClick={() => setMediaType(option.id)}
              className={`flex flex-1 items-center justify-center gap-2 rounded-full py-3 text-sm font-bold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#047857] ${
                active ? 'bg-[#047857] text-white shadow' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Icon name={option.icon} className="h-4 w-4" strokeWidth={2} />
              {option.label}
            </button>
          );
        })}
      </div>

      {/* FLOOR 4: DIRECT ACTION BUTTON GRIDS */}
      {mediaType === 'video' ? (
        <div className="space-y-4">
          <ModeCard title="Family Mode" description="Simple and fast. Make a video in a few taps.">
            <ActionButton icon="plus" label="Create" onClick={() => handleAction('Create')} />
            <ActionButton icon="bookmark" label="Saved" onClick={() => handleAction('Saved')} />
          </ModeCard>

          <ModeCard title="Professional Mode" description="Advanced tools for serious editing.">
            <ActionButton icon="plus" label="Create" onClick={() => handleAction('Create')} />
            <ActionButton icon="bookmark" label="Saved" onClick={() => handleAction('Saved')} />
            <ActionButton icon="grid" label="Inventory" onClick={() => handleAction('Inventory')} />
            <ActionButton icon="chart" label="Analytics" onClick={() => handleAction('Analytics')} />
          </ModeCard>
        </div>
      ) : (
        <ModeCard title="Photo" description="Create and manage your photo projects.">
          <ActionButton icon="plus" label="Create" onClick={() => handleAction('Create')} />
          <ActionButton icon="bookmark" label="Saved" onClick={() => handleAction('Saved')} />
        </ModeCard>
      )}

      {/* FLOOR 5: FREE COMMUNITY VOTING POLL */}
      <section className="rounded-3xl border border-stone-200 bg-[#FDFBF7] p-5 shadow-sm">
        <div className="mb-1 flex items-center justify-between">
          <h2 id="poll-title" className="text-base font-bold text-stone-900">
            Community Poll
          </h2>
          <span className="rounded-full bg-[#047857]/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#047857]">
            Free for everyone
          </span>
        </div>
        <p className="mb-4 text-xs text-stone-500">What should we build next? Pick one.</p>

        <div role="radiogroup" aria-labelledby="poll-title" className="space-y-2">
          {POLL_OPTIONS.map((option) => {
            const selected = pollVote === option.id;
            return (
              <button
                key={option.id}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => handleVote(option.id)}
                className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left text-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#047857] ${
                  selected
                    ? 'border-[#047857] bg-[#047857]/10 font-semibold text-stone-900'
                
