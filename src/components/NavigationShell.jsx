import React, { useState } from 'react';
import { Home, Heart, Sliders, ShoppingBag, User, Settings, Sparkles, Image, Video } from 'lucide-react';
export default function NavigationShell() {
const [activeTab, setActiveTab] = useState('home');
const navItems = [
{ id: 'home', label: 'Home', icon: Home },
{ id: 'family', label: 'Family', icon: Heart },
{ id: 'pro', label: 'Pro', icon: Sliders },
{ id: 'shop', label: 'Shop', icon: ShoppingBag },
{ id: 'profile', label: 'Profile', icon: User },
];
return (
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
<Settings className="w-5 h-5" />
</button>
</header>
{/* Main Content Area /}
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
{/* Quick Start Cards */}
<div className="grid grid-cols-2 gap-3">
<div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col items-center text-center space-y-2">
<div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
<Image className="w-6 h-6" />
</div>
<span className="font-medium text-sm text-gray-800">New Photo</span>
</div>
<div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col items-center text-center space-y-2">
<div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
<Video className="w-6 h-6" />
</div>
<span className="font-medium text-sm text-gray-800">New Video</span>
</div>
</div>
{/* Featured Card */}
<div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-5 text-white shadow-md">
<div className="flex items-center space-x-2 text-blue-200 text-xs font-semibold uppercase tracking-wider mb-2">
<Sparkles className="w-4 h-4" />
<span>AI Magic</span>
</div>
<h2 className="text-lg font-bold mb-1">Enhance photos automatically</h2>
<p className="text-sm text-blue-100 mb-4">Fix lighting, color balance, and sharp detail in one tap.</p>
<button className="bg-white text-blue-600 px-4 py-2 rounded-xl text-sm font-semibold shadow-sm hover:bg-blue-50 transition-colors">
Try AI Studio
</button>
</div>
{/* Recent Projects Placeholder */}
<div className="space-y-3">
<h3 className="font-semibold text-gray-800 text-sm">Recent Projects</h3>
<div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm flex items-center justify-between">
<div className="flex items-center space-x-3">
<div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400">
<Image className="w-6 h-6" />
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
{/* Fixed Bottom Navigation Bar */}
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
<Icon className={w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.75]'}} />
<span className={text-[10px] mt-1 font-medium ${isActive ? 'font-semibold text-blue-600' : ''}}>
{item.label}
</span>
</button>
);
})}
</div>
</nav>
</div>
);
  }
