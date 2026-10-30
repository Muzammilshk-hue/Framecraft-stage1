import React, { useEffect, useRef, useState } from "react";
import {
  Aperture,
  ArrowLeft,
  BarChart3,
  Bookmark,
  Check,
  CircleUserRound,
  Download,
  FileVideo,
  Grid2X2,
  Home,
  Image,
  Info,
  LockKeyhole,
  MoreHorizontal,
  Play,
  Plus,
  Save,
  Settings,
  Sparkles,
  Star,
  Trash2,
  Upload,
  X,
} from "lucide-react";

const UPI_INTENT_URL = ""; // PLACEHOLDER for GPay/PhonePe UPI Intent integration in next phase
const POLL_OPTIONS = [
  "Automatic AI Captions & Template Store",
  "Improved Family Mode with Creator Ecosystem",
  "Custom LUT Color Grading & Multi-Track Audio",
  "Advanced AI Script & Voiceover Generator",
];
const COMPARISON_ROWS = [
  ["Workspace Editors", "Full Access", "Full Access"],
  ["FrameAI Assistant", "Standard Guidance", "Enhanced Gemini AI Engine"],
  [
    "Inventory Earning Slots",
    "0 Slots",
    "10 Lifetime Active Slots · 0 recurring fees",
  ],
  ["Price Guarantee", "Standard Future Pricing", "₹25 Rate Locked Forever"],
  ["Profile Recognition", "Standard Avatar", "Unique Circular Founder Badge"],
  [
    "Stage 2 FrameStore",
    "Standard Access",
    "Priority Creator & Template Publishing",
  ],
];

function FounderAvatar({ isFounder, assignedSpot }) {
  return (
    <div className="relative">
      <div className="flex size-11 items-center justify-center rounded-full border-2 border-[#047857] bg-white text-[#047857]">
        <CircleUserRound size={23} strokeWidth={1.7} />
      </div>
      {isFounder && (
        <span
          aria-label={assignedSpot ? `Assigned spot ${assignedSpot}` : "Early Founder badge"}
          className="absolute -bottom-1 -left-1 flex size-5 items-center justify-center rounded-full border-2 border-white bg-[#D4AF37] text-[9px] font-black text-[#4a3900] shadow-sm"
        >
          {assignedSpot ? assignedSpot : <Star size={10} fill="currentColor" />}
        </span>
      )}
    </div>
  );
}

function ClaimConfirmation({ assignedSpot, onClose, onKnowMore }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-5 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="claim-confirmation-title"
    >
      <div className="relative w-full max-w-sm rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close confirmation"
          className="absolute right-3 top-3 rounded-full p-1 text-gray-400 hover:bg-gray-50 hover:text-gray-600"
        >
          <X size={17} strokeWidth={1.5} />
        </button>
        <p className="text-xs font-bold uppercase tracking-[.18em] text-[#047857]">
          Spot reserved
        </p>
        <div className="mx-auto mt-4 flex size-20 items-center justify-center rounded-full border-2 border-[#D4AF37] bg-[#D4AF37]/10 text-2xl font-black text-[#8a6d0b]">
          #{assignedSpot}
        </div>
        <h2 id="claim-confirmation-title" className="mt-5 text-lg font-black text-gray-900">
          It&apos;s a small investment to upgrade to next phase
        </h2>
        <button
          type="button"
          onClick={onKnowMore}
          className="mt-5 rounded-2xl border border-[#047857] px-5 py-3 text-sm font-bold text-[#047857] hover:bg-emerald-50"
        >
          Know More
        </button>
      </div>
    </div>
  );
}
function ActionButton({ icon: Icon, label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex min-h-20 flex-col items-center justify-center gap-2 rounded-2xl border border-gray-100 bg-[#FDFBF7] px-2 py-3 text-xs font-bold text-[#047857] shadow-sm transition hover:border-[#047857]/30 hover:bg-emerald-50 active:scale-[.98]"
    >
      <Icon size={21} strokeWidth={1.8} />
      {label}
    </button>
  );
}
function Modal({ onClose, onClaim, claimedSlots, totalSlots }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="welcome-title"
    >
      <div className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-t-[2rem] border border-gray-100 bg-white p-5 shadow-2xl sm:rounded-[2rem] sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="mb-1 text-xs font-bold uppercase tracking-[.18em] text-[#047857]">
              Stage 1 · Early access
            </p>
            <h2
              id="welcome-title"
              className="text-2xl font-black text-gray-900"
            >
              Welcome, Creator!
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="rounded-full p-2 text-gray-500 hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>
        <p className="mt-5 text-sm leading-6 text-gray-600">
          Welcome to FrameCraft—a video editor built with powerful creator
          features. We are currently in Stage 1, and full ecosystem features are
          actively being developed. Further advanced features will unlock after
          reaching 4,500 subscribers.
        </p>
        <div className="mt-5 rounded-2xl border border-[#D4AF37]/40 bg-[#D4AF37]/10 p-4">
          <h3 className="font-bold text-gray-900">Early Founder Advantage</h3>
          <p className="mt-1 text-sm leading-6 text-gray-700">
            Joining right now gives you a massive advantage. If you buy the ₹25
            Introductory Subscription, your price is locked at ₹25 forever.
            Later developed stages will be significantly more expensive for new
            users (e.g., ₹169), but early founders will never pay more.
          </p>
        </div>
        <p className="mt-5 text-sm leading-6 text-gray-600">
          <strong className="text-gray-900">Badge & Spot Counter:</strong> As an
          Early Founder, you also earn a Unique Circular Founder Badge that you
          can set on your profile photo. Secure your seat now to become
          subscriber{" "}
          <strong className="text-[#047857]">
            #{claimedSlots.toLocaleString()} / {totalSlots.toLocaleString()}
          </strong>
          !
        </p>
        <div className="mt-5 overflow-hidden rounded-2xl border border-gray-200">
          <div className="grid grid-cols-[1.15fr_1fr_1fr] bg-gray-50 px-3 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-500">
            <span>Feature</span>
            <span>Freemium</span>
            <span className="text-[#047857]">₹25 subscription</span>
          </div>
          {COMPARISON_ROWS.map(([feature, free, paid]) => (
            <div
              key={feature}
              className="grid grid-cols-[1.15fr_1fr_1fr] gap-2 border-t border-gray-200 px-3 py-3 text-[11px] leading-4"
            >
              <span className="font-semibold text-gray-800">{feature}</span>
              <span className="text-gray-500">{free}</span>
              <span className="font-semibold text-[#047857]">{paid}</span>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={onClaim}
          className="mt-6 flex w-full items-center justify-center rounded-2xl bg-[#047857] py-3.5 text-sm font-bold text-white shadow-lg hover:bg-[#2d5a43]"
        >
          Claim my spot → ₹25
        </button>
      </div>
    </div>
  );
}

function VideoPicker({ onSelected, onCancel }) {
  const inputRef = useRef(null);
  const [error, setError] = useState("");
  const choose = (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("video/")) {
      setError(
        "Please choose a video file. Photos are not supported in Family Create.",
      );
      return;
    }
    onSelected(file);
  };
  return (
    <section className="mx-auto max-w-2xl rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
      <button
        type="button"
        onClick={onCancel}
        className="mb-6 flex items-center gap-2 text-sm font-bold text-gray-500"
      >
        <ArrowLeft size={17} /> Back
      </button>
      <div className="flex size-14 items-center justify-center rounded-2xl bg-emerald-50 text-[#047857]">
        <Upload size={26} />
      </div>
      <h2 className="mt-5 text-2xl font-black">Create a Family video</h2>
      <p className="mt-2 text-sm leading-6 text-gray-500">
        Select one video from your device. Your file stays in this browser for
        the preview and is not uploaded.
      </p>
      <input
        ref={inputRef}
        className="sr-only"
        type="file"
        accept="video/*"
        onChange={choose}
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#047857] py-3.5 text-sm font-bold text-white"
      >
        <FileVideo size={18} /> Choose video
      </button>
      {error && (
        <p
          role="alert"
          className="mt-4 rounded-xl bg-red-50 p-3 text-xs font-semibold text-red-700"
        >
          {error}
        </p>
      )}
      <p className="mt-4 text-center text-xs text-gray-400">
        Supported by your browser: MP4, WebM, MOV and other video formats.
      </p>
    </section>
  );
}

function VideoConfirmation({ file, onContinue, onCancel }) {
  const source = URL.createObjectURL(file);
  useEffect(() => () => URL.revokeObjectURL(source), [source]);
  return (
    <section className="mx-auto max-w-2xl rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
      <button
        type="button"
        onClick={onCancel}
        className="mb-6 flex items-center gap-2 text-sm font-bold text-gray-500"
      >
        <ArrowLeft size={17} /> Choose another
      </button>
      <div className="overflow-hidden rounded-2xl bg-gray-950">
        <video
          src={source}
          controls
          playsInline
          className="aspect-video w-full"
        />
      </div>
      <div className="mt-5 flex items-start gap-3">
        <div className="mt-1 rounded-lg bg-emerald-50 p-2 text-[#047857]">
          <Check size={16} />
        </div>
        <div className="min-w-0">
          <h2 className="font-black">Ready to edit</h2>
          <p className="mt-1 truncate text-sm text-gray-500">{file.name}</p>
          <p className="mt-1 text-xs text-gray-400">
            {(file.size / 1024 / 1024).toFixed(1)} MB · Family Mode project
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={() => onContinue(file)}
        className="mt-6 w-full rounded-2xl bg-[#047857] py-3.5 text-sm font-bold text-white"
      >
        Continue to editor
      </button>
    </section>
  );
}

function EditorWorkspace({ project, onBack, onSave, onExport }) {
  const [saved, setSaved] = useState(false);
  const source = URL.createObjectURL(project.file);
  useEffect(() => () => URL.revokeObjectURL(source), [source]);
  const save = () => {
    onSave(project);
    setSaved(true);
  };
  return (
    <section className="mx-auto max-w-4xl">
      <div className="mb-4 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-bold text-gray-500"
        >
          <ArrowLeft size={17} /> Home
        </button>
        <div className="flex items-center gap-2 text-xs font-semibold text-gray-400">
          {saved ? (
            <>
              <Check size={14} className="text-[#047857]" /> Saved locally
            </>
          ) : (
            "Unsaved project"
          )}
        </div>
      </div>
      <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#047857]">
              Family Mode editor
            </p>
            <h2 className="mt-1 truncate text-xl font-black">{project.name}</h2>
          </div>
          <button
            type="button"
            aria-label="More project actions"
            className="rounded-full p-2 text-gray-400 hover:bg-gray-100"
          >
            <MoreHorizontal size={19} />
          </button>
        </div>
        <div className="mt-5 overflow-hidden rounded-2xl bg-gray-950">
          <video
            src={source}
            controls
            playsInline
            className="aspect-video w-full"
          />
        </div>
        <div className="mt-5 rounded-2xl border border-dashed border-[#047857]/30 bg-emerald-50/40 p-5 text-center">
          <Sparkles className="mx-auto text-[#047857]" size={22} />
          <h3 className="mt-2 font-bold">Editing workspace reserved</h3>
          <p className="mt-1 text-xs leading-5 text-gray-500">
            Playback is ready. Trimming, effects, transitions and rendering will
            connect here when the video engine is added.
          </p>
        </div>
        <div className="mt-5 grid grid-cols-3 gap-2">
          <div className="rounded-xl bg-gray-50 p-3 text-center">
            <p className="text-[10px] font-bold uppercase text-gray-400">
              Timeline
            </p>
            <p className="mt-1 text-xs font-semibold text-gray-600">Reserved</p>
          </div>
          <div className="rounded-xl bg-gray-50 p-3 text-center">
            <p className="text-[10px] font-bold uppercase text-gray-400">
              Tools
            </p>
            <p className="mt-1 text-xs font-semibold text-gray-600">
              Ready to connect
            </p>
          </div>
          <div className="rounded-xl bg-gray-50 p-3 text-center">
            <p className="text-[10px] font-bold uppercase text-gray-400">
              FrameAI
            </p>
            <p className="mt-1 text-xs font-semibold text-gray-600">
              Interface reserved
            </p>
          </div>
        </div>
        <div className="mt-5 flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={save}
            className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-[#047857] py-3 text-sm font-bold text-[#047857]"
          >
            <Save size={17} /> Save project
          </button>
          <button
            type="button"
            onClick={onExport}
            className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gray-100 py-3 text-sm font-bold text-gray-500"
          >
            <Download size={17} /> Export unavailable
          </button>
        </div>
        <p className="mt-3 text-center text-[11px] text-gray-400">
          Export is intentionally disabled until genuine editing and rendering
          are available.
        </p>
      </div>
    </section>
  );
}

function SavedFamily({ projects, onOpen, onRemove, onBack }) {
  return (
    <section className="mx-auto max-w-3xl">
      <button
        type="button"
        onClick={onBack}
        className="mb-5 flex items-center gap-2 text-sm font-bold text-gray-500"
      >
        <ArrowLeft size={17} /> Back to workspace
      </button>
      <div className="flex items-end justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#047857]">
            Family Mode
          </p>
          <h2 className="mt-1 text-2xl font-black">Saved projects</h2>
        </div>
        <span className="text-xs font-semibold text-gray-400">
          {projects.length} project{projects.length === 1 ? "" : "s"}
        </span>
      </div>
      {projects.length === 0 ? (
        <div className="mt-5 rounded-2xl border border-dashed border-gray-200 bg-white p-10 text-center">
          <Bookmark className="mx-auto text-gray-300" size={30} />
          <h3 className="mt-3 font-bold">No Family projects yet</h3>
          <p className="mt-1 text-sm text-gray-500">
            Create a video to see saved editable projects here.
          </p>
        </div>
      ) : (
        <div className="mt-5 flex flex-col gap-3">
          {projects.map((project) => (
            <article
              key={project.id}
              className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-3 shadow-sm"
            >
              <div className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gray-950 text-white">
                {project.file ? (
                  <video
                    src={URL.createObjectURL(project.file)}
                    muted
                    className="size-full object-cover"
                  />
                ) : (
                  <Play size={20} />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="truncate text-sm font-bold">{project.name}</h3>
                <p className="mt-1 text-xs text-gray-400">
                  Family Mode · {project.status}
                </p>
                <p className="mt-1 text-[10px] text-gray-400">
                  {project.modified}
                </p>
              </div>
              <button
                type="button"
                onClick={() => onOpen(project)}
                className="rounded-xl bg-emerald-50 px-3 py-2 text-xs font-bold text-[#047857]"
              >
                Open
              </button>
              <button
                type="button"
                onClick={() => onRemove(project.id)}
                aria-label={`Remove ${project.name}`}
                className="rounded-xl p-2 text-gray-400 hover:bg-red-50 hover:text-red-600"
              >
                <Trash2 size={17} />
              </button>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

function HomeScreen({
  onCreate,
  onSaved,
  onKnowMore,
  mediaType,
  setMediaType,
  pollVote,
  setPollVote,
  claimedSlots,
  totalSlots,
  onClaim,
}) {
  const progress = Math.min(100, Math.round((claimedSlots / totalSlots) * 100));
  return (
    <>
      <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex items-center justify-between">
          <span className="rounded-full bg-[#D4AF37]/15 px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest text-[#8a6d0b]">
            Stage 1 Founding Offer
          </span>
          <span className="text-xs font-semibold text-[#047857]">
            ₹25 forever
          </span>
        </div>
        <div className="mt-5 flex items-end justify-between gap-3">
          <div>
            <p className="text-3xl font-black tracking-tight sm:text-4xl">
              Build before launch.
            </p>
            <p className="mt-1 max-w-md text-sm text-gray-500">
              Join the first {totalSlots.toLocaleString()} creators shaping
              FrameCraft.
            </p>
          </div>
          <div className="text-right">
            <p className="text-lg font-black text-[#047857]">
              {claimedSlots.toLocaleString()}{" "}
              <span className="text-xs font-medium text-gray-400">
                / {totalSlots.toLocaleString()}
              </span>
            </p>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">
              subscribers claimed
            </p>
          </div>
        </div>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-gray-100">
          <div
            className="h-full rounded-full bg-[#047857]"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-5 flex flex-col gap-2">
          <button
            type="button"
            onClick={onClaim}
            className="order-1 w-full rounded-2xl bg-[#047857] py-3.5 text-sm font-bold uppercase tracking-wide text-white shadow-md hover:bg-[#2d5a43]"
          >
            Claim my spot →
          </button>
          <button
            type="button"
            onClick={onKnowMore}
            className="order-2 rounded-2xl border border-[#047857] py-3 text-sm font-bold text-[#047857] hover:bg-emerald-50"
          >
            Know More
          </button>
        </div>
      </section>
      <section className="mt-6">
        <div className="flex gap-1 rounded-full bg-gray-100 p-1">
          {[
            ["video", "Video"],
            ["photo", "Photo"],
          ].map(([id, label]) => (
            <button
              type="button"
              key={id}
              aria-pressed={mediaType === id}
              onClick={() => setMediaType(id)}
              className={`flex flex-1 items-center justify-center gap-2 rounded-full py-2.5 text-sm font-bold ${mediaType === id ? "bg-[#047857] text-white shadow" : "text-gray-500"}`}
            >
              {id === "video" ? <Sparkles size={16} /> : <Image size={16} />}
              {label}
            </button>
          ))}
        </div>
      </section>
      <section className="mt-6 flex flex-col gap-4">
        {mediaType === "video" ? (
          <>
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <h2 className="font-black">Family Mode</h2>
              <p className="mt-1 text-xs text-gray-500">
                Simple and fast. Make a video in a few taps.
              </p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <ActionButton icon={Plus} label="Create" onClick={onCreate} />
                <ActionButton icon={Bookmark} label="Saved" onClick={onSaved} />
              </div>
            </div>
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <h2 className="font-black">Professional Mode</h2>
              <p className="mt-1 text-xs text-gray-500">
                Advanced tools for serious editing.
              </p>
              <div className="mt-4 grid grid-cols-4 gap-2 sm:gap-3">
                {[
                  [Plus, "Create"],
                  [Bookmark, "Saved"],
                  [Grid2X2, "Inventory"],
                  [BarChart3, "Analytics"],
                ].map(([Icon, label]) => (
                  <ActionButton
                    key={label}
                    icon={Icon}
                    label={label}
                    onClick={() => onKnowMore()}
                  />
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <h2 className="font-black">Photo Mode</h2>
            <p className="mt-1 text-xs text-gray-500">
              Create and manage your photo projects.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <ActionButton icon={Plus} label="Create" onClick={onKnowMore} />
              <ActionButton
                icon={Bookmark}
                label="Saved"
                onClick={onKnowMore}
              />
            </div>
          </div>
        )}
      </section>
      <section className="mt-6 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="font-black">Community Poll</h2>
          <span className="rounded-full bg-[#047857]/10 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-[#047857]">
            Free for everyone
          </span>
        </div>
        <p className="mt-1 text-xs text-gray-500">
          What should we build next? Pick one.
        </p>
        <div className="mt-4 flex flex-col gap-2">
          {POLL_OPTIONS.map((option) => (
            <button
              type="button"
              role="radio"
              aria-checked={pollVote === option}
              key={option}
              onClick={() =>
                setPollVote((currentVote) =>
                  currentVote === option ? null : option,
                )
              }
              className={`flex items-center gap-3 rounded-2xl border px-3 py-3 text-left text-xs ${pollVote === option ? "border-[#047857] bg-emerald-50 font-bold" : "border-gray-100 text-gray-600"}`}
            >
              <span
                className={`flex size-5 shrink-0 items-center justify-center rounded-full border ${pollVote === option ? "border-[#047857] bg-[#047857] text-white" : "border-gray-300"}`}
              >
                {pollVote === option && <Check size={12} />}
              </span>
              {option}
            </button>
          ))}
        </div>
      </section>
      <section className="relative mt-6 overflow-hidden rounded-2xl border border-gray-100 bg-gray-900 p-6 text-white shadow-sm">
        <div className="pointer-events-none select-none blur-[2px] opacity-50">
          <div className="flex gap-3">
            <div className="h-20 flex-1 rounded-2xl bg-[#047857]/60" />
            <div className="h-20 flex-1 rounded-2xl bg-[#D4AF37]/60" />
            <div className="h-20 flex-1 rounded-2xl bg-white/20" />
          </div>
          <div className="mt-4 h-3 w-2/3 rounded bg-white/20" />
          <div className="mt-2 h-3 w-1/2 rounded bg-white/10" />
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 text-center">
          <LockKeyhole size={22} className="mb-2 text-[#D4AF37]" />
          <h2 className="text-xl font-black">
            Shop <span className="text-[#D4AF37]">(Coming Soon)</span>
          </h2>
          <p className="mt-1 text-xs text-white/70">
            Stage 2 creator templates & assets
          </p>
        </div>
      </section>
    </>
  );
}

export default function App() {
  const isFounder = true;
  const [claimedSlots, setClaimedSlots] = useState(0);
  const [assignedSpot, setAssignedSpot] = useState(null);
  const [isClaimConfirmationOpen, setIsClaimConfirmationOpen] = useState(false);
  const claimInProgressRef = useRef(false);
  const [totalSlots] = useState(4500);
  const [mediaType, setMediaType] = useState("video");
  const [pollVote, setPollVote] = useState(null);
  const [screen, setScreen] = useState("home");
  const [selectedFile, setSelectedFile] = useState(null);
  const [currentProject, setCurrentProject] = useState(null);
  const [familyProjects, setFamilyProjects] = useState([]);
  const [isKnowMoreOpen, setIsKnowMoreOpen] = useState(false);
  const [toast, setToast] = useState("");
  const notify = (message) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2200);
  };
  const startFamilyCreate = () => {
    setSelectedFile(null);
    setScreen("family-picker");
  };
  const continueToEditor = (file) => {
    const project = {
      id: `${file.name}-${file.lastModified}`,
      name: file.name,
      file,
      status: "Editable draft",
      modified: new Date().toLocaleDateString(),
    };
    setCurrentProject(project);
    setScreen("editor");
  };
  const saveProject = (project) => {
    setFamilyProjects((projects) => [
      project,
      ...projects.filter((item) => item.id !== project.id),
    ]);
    notify("Family project saved");
  };
  const openProject = (project) => {
    setCurrentProject(project);
    setScreen("editor");
  };
  const removeProject = (id) => {
    if (
      window.confirm(
        "Remove this Family project? This only removes it from this session.",
      )
    )
      setFamilyProjects((projects) =>
        projects.filter((project) => project.id !== id),
      );
  };
  const claim = () => {
    if (claimInProgressRef.current || assignedSpot !== null) return;
    claimInProgressRef.current = true;
    const spotNumber = Math.min(claimedSlots + 1, totalSlots);
    setAssignedSpot(spotNumber);
    setClaimedSlots(spotNumber);
    setIsClaimConfirmationOpen(true);
  };
  return (
    <div className="min-h-screen bg-[#FDFBF7] pb-24 font-sans text-gray-900">
      <main className="mx-auto max-w-4xl px-4 py-5 sm:px-6">
        <header className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex size-10 items-center justify-center rounded-2xl bg-[#047857] text-white shadow-sm">
              <Aperture size={23} />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[.22em] text-[#047857]">
                Creator workspace
              </p>
              <h1 className="text-lg font-black tracking-tight">
                FrameCraft Stage-1
              </h1>
            </div>
          </div>
          <button
            type="button"
            aria-label="Open profile"
            onClick={() => notify("Profile area is ready for the next phase")}
          >
            <FounderAvatar isFounder={isFounder} assignedSpot={assignedSpot} />
          </button>
        </header>
        {screen === "home" && (
          <HomeScreen
            {...{
              onCreate: startFamilyCreate,
              onSaved: () => setScreen("family-saved"),
              onKnowMore: () => setIsKnowMoreOpen(true),
              mediaType,
              setMediaType,
              pollVote,
              setPollVote,
              claimedSlots,
              totalSlots,
              onClaim: claim,
            }}
          />
        )}
        {screen === "family-picker" && (
          <VideoPicker
            onSelected={setSelectedFile}
            onCancel={() => setScreen("home")}
          />
        )}
        {screen === "family-picker" && selectedFile && (
          <div className="fixed inset-0 z-40 overflow-y-auto bg-[#FDFBF7] px-4 py-6">
            <VideoConfirmation
              file={selectedFile}
              onContinue={continueToEditor}
              onCancel={() => setSelectedFile(null)}
            />
          </div>
        )}
        {screen === "editor" && currentProject && (
          <EditorWorkspace
            project={currentProject}
            onBack={() => setScreen("home")}
            onSave={saveProject}
            onExport={() =>
              notify("Export will be enabled with the video engine")
            }
          />
        )}
        {screen === "family-saved" && (
          <SavedFamily
            projects={familyProjects}
            onOpen={openProject}
            onRemove={removeProject}
            onBack={() => setScreen("home")}
          />
        )}
      </main>
      <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-gray-100 bg-white/95 px-3 py-2 shadow-[0_-8px_25px_rgba(28,25,23,.08)] backdrop-blur">
        <div className="mx-auto grid max-w-4xl grid-cols-4 gap-2">
          <button
            type="button"
            onClick={() => setScreen("home")}
            className="flex min-w-0 flex-col items-center justify-center gap-1 rounded-xl px-2 py-2 text-gray-500 transition hover:bg-gray-50 hover:text-[#047857]"
          >
            <Home size={17} />
            <span className="text-[10px] font-bold uppercase">Home</span>
          </button>
          <button
            type="button"
            onClick={() => setIsKnowMoreOpen(true)}
            className="flex min-w-0 flex-col items-center justify-center gap-1 rounded-xl px-2 py-2 text-gray-500 transition hover:bg-gray-50 hover:text-[#047857]"
          >
            <Info size={17} />
            <span className="text-[10px] font-bold uppercase">Resources</span>
          </button>
          <button
            type="button"
            onClick={() => notify("AI workspace is ready for the next phase")}
            className="flex min-w-0 flex-col items-center justify-center gap-1 rounded-xl px-2 py-2 text-gray-500 transition hover:bg-gray-50 hover:text-[#047857]"
          >
            <Sparkles size={17} />
            <span className="text-[10px] font-bold uppercase">AI</span>
          </button>
          <button
            type="button"
            onClick={() => notify("Settings area is ready for the next phase")}
            className="flex min-w-0 flex-col items-center justify-center gap-1 rounded-xl px-2 py-2 text-gray-500 transition hover:bg-gray-50 hover:text-[#047857]"
          >
            <Settings size={17} />
            <span className="text-[10px] font-bold uppercase">Settings</span>
          </button>
        </div>
      </nav>
      {isClaimConfirmationOpen && assignedSpot !== null && (
        <ClaimConfirmation
          assignedSpot={assignedSpot}
          onClose={() => setIsClaimConfirmationOpen(false)}
          onKnowMore={() => {
            setIsClaimConfirmationOpen(false);
            setIsKnowMoreOpen(true);
          }}
        />
      )}
      {isKnowMoreOpen && (
        <Modal
          onClose={() => setIsKnowMoreOpen(false)}
          onClaim={() => {
            setIsKnowMoreOpen(false);
            claim();
          }}
          claimedSlots={claimedSlots}
          totalSlots={totalSlots}
        />
      )}
      {toast && (
        <div
          role="status"
          className="fixed bottom-20 left-1/2 z-50 -translate-x-1/2 rounded-full bg-gray-900 px-4 py-2 text-xs font-semibold text-white shadow-lg"
        >
          {toast}
        </div>
      )}
    </div>
  );
}
