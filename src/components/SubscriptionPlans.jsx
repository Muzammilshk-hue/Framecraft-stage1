import React, { useState } from 'react';
import PaymentModal from '../PaymentModal'; // Keeping your existing import

export default function SubscriptionPlans() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col items-center p-6 bg-gray-50 min-h-screen pt-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Choose Your Plan</h1>

      {/* Early Adopter Message */}
      <div className="max-w-md bg-blue-50 border border-blue-200 rounded-xl p-5 mb-8 text-blue-900 text-center shadow-sm">
        <p className="font-bold text-lg mb-2">🚀 Early Supporter Benefit</p>
        <p className="text-sm leading-relaxed">
          Development work of this app will start after we hit <strong>2,500 subscribers</strong>. 
          Early supporters will receive a special badge displaying their exact subscriber number, and 
          the first 2,500 users will <strong>never</strong> see a price increase!
        </p>
      </div>

      {/* Single PRO Card */}
      <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-sm text-center border border-gray-100">
        <h2 className="text-xl text-gray-800 font-medium mb-4">Pro</h2>
        <div className="text-5xl font-bold text-blue-600 mb-8">₹25</div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors shadow-sm"
        >
          Subscribe with UPI
        </button>
      </div>

      {/* Keeps your payment modal working */}
      {isModalOpen && (
        <PaymentModal 
          plan="Pro" 
          price={25} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </div>
  );
}
