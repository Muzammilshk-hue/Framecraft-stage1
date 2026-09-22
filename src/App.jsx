import React from 'react';
import SubscriptionPlans from './components/SubscriptionPlans.jsx';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-800">
      {/* App Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-black text-blue-600 tracking-tight">
              Framecraft
            </span>
          </div>
          <nav className="flex space-x-6">
            <a href="#plans" className="text-sm font-medium text-gray-600 hover:text-blue-600">
              Plans
            </a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="space-y-12 pb-16">
        {/* Subscription Plans Section */}
        <section id="plans">
          <SubscriptionPlans />
        </section>
      </main>
    </div>
  );
}

export default App;
