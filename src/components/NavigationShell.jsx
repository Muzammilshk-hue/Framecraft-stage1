import React, { useState } from 'react';
​// Built-in SVG Icons (No external npm packages required)
const IconHome = ({ className }) => (
<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
);
​const IconHeart = ({ className }) => (
<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
);
​const IconSliders = ({ className }) => (
<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="4" y1="21" y2="14"/><line x1="4" x2="4" y1="10" y2="3"/><line x1="12" x2="12" y1="21" y2="12"/><line x1="12" x2="12" y1="8" y2="3"/><line x1="20" x2="20" y1="21" y2="16"/><line x1="20" x2="20" y1="12" y2="3"/><line x1="2" x2="6" y1="14" y2="14"/><line x1="10" x2="14" y1="8" y2="8"/><line x1="18" x2="22" y1="16" y2="16"/></svg>
);
​const IconShop = ({ className }) => (
<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><line x1="3" x2="21" y1="6" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
);
​const IconUser = ({ className }) => (
<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);
​const IconSettings = ({ className }) => (
<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
);
​const IconSparkles = ({ className }) => (
<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/></svg>
);
​const IconImage = ({ className }) => (
<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
);
​const IconVideo = ({ className }) => (
<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 8-6 4 6 4V8Z"/><rect width="14" height="12" x="2" y="6" rx="2" ry="2"/></svg>
);
​export default function NavigationShell() {
const [activeTab, setActiveTab] = useState('home');
​const navItems = [
{ id: 'home', label: 'Home', icon: IconHome },
{ id: 'family', label: 'Family', icon: IconHeart },
{ id: 'pro', label: 'Pro', icon: IconSliders },
{ id: 'shop', label: 'Shop', icon: IconShop },
{ id: 'profile', label: 'Profile', icon: IconUser },
];
​return (
<div className="flex flex-col min-h-screen bg-gray-50 text-gray-800 font-sans pb-20">
{/* Top Header Bar */}
<header className="sticky top-0 z-40 flex items-center justify-between px-5 py-4 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
<div className="flex items-center space-x-2">
<div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
F
</div>
<span className="text-xl font-bold tracking-tight text-gray-900">FrameCraft</span>
</div>
<button className="p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors">
<IconSettings className="w-5 h-5" />
</button>
</header>
​{/* Main Content Area /}
<main className="flex-1 max-w-md mx-auto w-full px-4 py-6 space-y-6">
{/ Active Tab Header */}
<div className="flex items-center justify-between">
<div>
<h1 className="text-2xl font-bold text-gray-900 capitalize">
{activeTab === 'home' && 'Welcome to FrameCraft'}
{activeTab === 'family' && 'Family Mode'}
{activeTab === 'pro' && 'Pro Tools'}
{activeTab === 'shop' && 'Asset Store'}
{activeTab === 'profile' && 'Your Account'}
</h1>
<p className="text-sm text-gray-500 mt-0.5">
{activeTab === 'home' && 'Create stunning photos and videos in seconds.'}
{activeTab === 'family' && 'Simple tools built for quick family edits.'}
{activeTab === 'pro' && 'Advanced multi-track editing & AI filters.'}
{activeTab === 'shop' && 'Unlock new stickers, templates, and effects.'}
{activeTab === 'profile' && 'Manage your subscription and preferences.'}
</p>
</div>
</div>
​{/* Quick Start Cards */}
<div className="grid grid-cols-2 gap-3">
<div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col items-center text-center space-y-2">
<div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
<IconImage className="w-6 h-6" />
</div>
<span className="font-medium text-sm text-gray-800">New Photo</span>
</div>
<div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col items-center text-center space-y-2">
<div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
<IconVideo className="w-6 h-6" />
</div>
<span className="font-medium text-sm text-gray-800">New Video</span>
</div>
</div>
​{/* Featured Card */}
<div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-5 text-white shadow-md">
<div className="flex items-center space-x-2 text-blue-200 text-xs font-semibold uppercase tracking-wider mb-2">
<IconSparkles className="w-4 h-4" />
<span>AI Magic</span>
</div>
<h2 className="text-lg font-bold mb-1">Enhance photos automatically</h2>
<p className="text-sm text-blue-100 mb-4">Fix lighting, color balance, and sharp detail in one tap.</p>
<button className="bg-white text-blue-600 px-4 py-2 rounded-xl text-sm font-semibold shadow-sm hover:bg-blue-50 transition-colors">
Try AI Studio
</button>
</div>
​{/* Recent Projects Placeholder */}
<div className="space-y-3">
<h3 className="font-semibold text-gray-800 text-sm">Recent Projects</h3>
<div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm flex items-center justify-between">
<div className="flex items-center space-x-3">
<div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400">
<IconImage className="w-6 h-6" />
</div>
<div>
<p className="text-sm font-semibold text-gray-800">Family Portrait</p>
<p className="text-xs text-gray-400">Edited 2 hours ago</p>
</div>
</div>
<span className="text-xs font-medium bg-green-50 text-green-600 px-2.5 py-1 rounded-full">Draft</span>
</div>
</div>
</main>
​{/* Fixed Bottom Navigation Bar */}
<nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-t border-gray-100 px-4 py-2 shadow-lg">
<div className="max-w-md mx-auto flex items-center justify-around">
{navItems.map((item) => {
const Icon = item.icon;
const isActive = activeTab === item.id;
return (
<button
key={item.id}
onClick={() => setActiveTab(item.id)}
className={flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-200 ${ isActive ? 'text-blue-600 scale-105' : 'text-gray-400 hover:text-gray-600' }}
>
<Icon className="w-5 h-5" />
<span className={text-[10px] mt-1 font-medium ${isActive ? 'font-semibold text-blue-600' : ''}}>
{item.label}
</span>
</button>
);
})}
</div>
</nav>
