import React, { useState } from 'react';
import PaymentModal from './PaymentModal.jsx';

export default function SubscriptionPlans() {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const plans = [
    { name: 'Pro', price: 299 },
    { name: 'Enterprise', price: 999 }
  ];

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">Choose Your Plan</h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        {plans.map((plan) => (
          <div key={plan.name} className="border p-6 rounded-xl shadow-sm text-center bg-white">
            <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
            <p className="text-3xl text-blue-600 font-bold mb-6">₹{plan.price}</p>
            
            <button 
              onClick={() => setSelectedPlan(plan)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 w-full font-semibold transition"
            >
              Subscribe with UPI
            </button>
          </div>
        ))}
      </div>

      {selectedPlan && (
        <PaymentModal 
          plan={selectedPlan} 
          onClose={() => setSelectedPlan(null)} 
          onSuccess={() => {
            alert('Payment submitted! Awaiting verification.');
          }}
        />
      )}
    </div>
  );
}
