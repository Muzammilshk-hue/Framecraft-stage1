import { useState } from 'react';
import {
  Heart,
  Home,
  Image,
  LayoutGrid,
  Settings,
  ShoppingBag,
  Sparkles,
  User,
  Wand2,
} from 'lucide-react';

const navigationItems = [
  { label: 'Home', icon: Home },
  { label: 'Family', icon: Heart },
  { label: 'Pro', icon: Wand2 },
  { label: 'Shop', icon: ShoppingBag },
  { label: 'Profile', icon: User },
];

const cards = [
  {
    title: 'Create a frame',
    description: 'Turn your favorite memories into something special.',
    icon: Image,
    accent: 'bg-blue-50 text-blue-600',
  },
  {
    title: 'Your family space',
    description: 'Keep everyone close, wherever life takes you.',
    icon: Heart,
    accent: 'bg-rose-50 text-rose-500',
  },
  {
    title: 'Explore inspiration',
    description: 'Find fresh ideas for your next FrameCraft story.',
    icon: Sparkles,
    accent: 'bg-amber-50 text-amber-600',
  },
];

function App() {
  const [activeTab, setActiveTab] = useState('Home');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-[72px] max-w-2xl items-center justify-between px-5 sm:px-8">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm shadow-blue-200">
              <LayoutGrid size={19} strokeWidth={2.3} aria-hidden="true" />
            </div>
            <span className="text-[19px] font-semibold tracking-[-0.03em]">FrameCraft</span>
          </div>
          <button
            type="button"
            aria-label="Open settings"
            className="flex size-10 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            <Settings size={20} strokeWidth={1.8} aria-hidden="true" />
          </button>
        </div>
      </header>

      <main className="mx-auto w-full max-w-2xl px-5 pb-32 pt-8 sm:px-8 sm:pt-12">
        <section aria-labelledby="home-screen-title">
          <div className="mb-8">
            <p className="mb-2 text-sm font-medium text-blue-600">Welcome back</p>
            <h1 id="home-screen-title" className="text-3xl font-semibold tracking-[-0.045em] text-slate-950 sm:text-4xl">
              Home Screen Content
            </h1>
            <p className="mt-3 max-w-md text-[15px] leading-6 text-slate-500">
              A calm space for the moments and people that matter most.
            </p>
          </div>

          <div className="mb-8 rounded-3xl bg-blue-600 p-6 text-white shadow-xl shadow-blue-100 sm:p-8">
            <div className="mb-10 flex items-start justify-between gap-5">
              <div>
                <p className="mb-2 text-sm font-medium text-blue-100">Your next masterpiece</p>
                <h2 className="max-w-[230px] text-2xl font-semibold leading-tight tracking-[-0.035em]">
                  Make room for a new memory.
                </h2>
              </div>
              <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-white/15">
                <Wand2 size={21} strokeWidth={1.8} aria-hidden="true" />
              </div>
            </div>
            <button
              type="button"
              className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-blue-700 transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-blue-600"
            >
              Start creating
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {cards.map(({ title, description, icon: Icon, accent }) => (
              <article key={title} className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm shadow-slate-200/40">
                <div className={`mb-5 flex size-10 items-center justify-center rounded-xl ${accent}`}>
                  <Icon size={19} strokeWidth={1.9} aria-hidden="true" />
                </div>
                <h2 className="font-semibold tracking-[-0.02em]">{title}</h2>
                <p className="mt-2 text-sm leading-5 text-slate-500">{description}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <nav aria-label="Primary navigation" className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200/80 bg-white/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2 shadow-[0_-8px_30px_rgba(15,23,42,0.06)] backdrop-blur">
        <div className="mx-auto flex max-w-2xl items-center justify-between">
          {navigationItems.map(({ label, icon: Icon }) => {
            const isActive = activeTab === label;
            return (
              <button
                key={label}
                type="button"
                aria-current={isActive ? 'page' : undefined}
                onClick={() => setActiveTab(label)}
                className={`flex min-w-[54px] flex-1 flex-col items-center gap-1 rounded-xl py-2 text-[11px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1 sm:gap-1.5 sm:text-xs ${isActive ? 'text-blue-600' : 'text-slate-400 hover:text-slate-700'}`}
              >
                <span className={`flex size-8 items-center justify-center rounded-xl transition-colors ${isActive ? 'bg-blue-50' : ''}`}>
                  <Icon size={20} strokeWidth={isActive ? 2.2 : 1.8} aria-hidden="true" />
                </span>
                <span>{label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

export default App;
